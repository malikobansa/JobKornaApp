import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../constants/appwrite"; // Adjust import based on your Appwrite configuration
import { ID } from "appwrite"; // For generating unique file IDs

const Home = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const pickImage = async () => {
    // Ask for permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to grant media library access.");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const uploadToStorage = async () => {
    if (!imageUri) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    const fileUri = imageUri.split("/").pop(); // Get the file name
    const fileBlob = await fetch(imageUri).then((res) => res.blob()); // Convert to blob

    try {
      // Upload file to Appwrite storage
      const response = await storage.createFile(
        "6757413c000e95b3ba5d", // Replace with your Appwrite storage bucket ID
        ID.unique(),
        fileBlob,
        [`file/${fileUri}`]
      );

      // Generate a preview URL
      const previewUrl = storage.getFilePreview("6757413c000e95b3ba5d", response.$id);
      setUploadedImageUrl(previewUrl);
      Alert.alert("Success", "Image uploaded successfully!");
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload a Picture</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
      <TouchableOpacity style={styles.uploadButton} onPress={uploadToStorage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {uploadedImageUrl ? (
        <Image
          source={{ uri: uploadedImageUrl }}
          style={styles.uploadedImage}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#28A745",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  uploadedImage: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

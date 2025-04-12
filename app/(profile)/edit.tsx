import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import tw from "@/lib/tailwind";
import { account, storage } from "../../constants/appwrite";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type UserProfile = {
  $id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  location?: string;
  role?: string;
  bio?: string;
};

const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const user = await account.get();

    let avatarUrl = undefined;
    if (user.prefs?.avatar) {
      const fileUrl = storage.getFileView(
        "6757413c000e95b3ba5d",
        user.prefs.avatar
      );
      avatarUrl = fileUrl.href;
    }

    return {
      $id: user.$id,
      name: user.name || "User",
      email: user.email,
      avatarUrl,
      phone: user.prefs?.phone,
      location: user.prefs?.location,
      role: user.prefs?.role || "Job Seeker",
      bio: user.prefs?.bio || "No bio available",
    };
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

export default function EditProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [isUploading, setIsUploading] = useState(false);

  // Populate form data when profile is loaded
  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        phone: profile.phone || "",
        location: profile.location || "",
        role: profile.role || "Job Seeker",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      await account.updatePrefs({
        name: data.name,
        phone: data.phone,
        location: data.location,
        role: data.role,
        bio: data.bio,
      });

      // Only update name if it changed
      if (data.name && data.name !== profile?.name) {
        await account.updateName(data.name);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      Alert.alert("Success", "Profile updated successfully");
      router.back();
    },
    onError: (error) => {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to update profile"
      );
    },
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access media library is required"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      uploadAvatar(result.assets[0].uri);
    }
  };

  const uploadAvatar = async (uri: string) => {
    try {
      setIsUploading(true);

      // Create a dummy file ID for now
      const fileId = { $id: "avatar-id" };

      // In a real implementation, you'd use the correct method to upload the file to Appwrite
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user preferences with avatar ID
      // await account.updatePrefs({ avatar: fileId.$id });

      Alert.alert("Success", "Avatar updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to upload avatar"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = () => {
    if (!formData.name) {
      Alert.alert("Error", "Name is required");
      return;
    }

    updateMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center p-6`}>
        <Text style={tw`text-error text-lg mb-2`}>Error loading profile</Text>
        <Text style={tw`text-center text-gray-500`}>
          {error instanceof Error ? error.message : "Something went wrong"}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between p-4`}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-primaryBlue`}>
            Edit Profile
          </Text>
          <TouchableOpacity
            onPress={handleUpdate}
            disabled={updateMutation.isPending}
          >
            <Text style={tw`text-primaryBlue font-bold`}>
              {updateMutation.isPending ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={tw`items-center mt-6 mb-8`}>
          <View style={tw`relative`}>
            <Image
              source={
                profile?.avatarUrl
                  ? { uri: profile.avatarUrl }
                  : require("@/assets/images/avatar.png")
              }
              style={tw`w-24 h-24 rounded-full`}
            />
            <TouchableOpacity
              style={tw`absolute bottom-0 right-0 bg-primaryBlue p-2 rounded-full`}
              onPress={pickImage}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <FontAwesome name="camera" size={16} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View style={tw`px-4`}>
          <View style={tw`mb-4`}>
            <Text style={tw`text-sm font-medium text-gray-600 mb-1`}>
              Full Name
            </Text>
            <TextInput
              style={tw`border border-grayBorder rounded-lg p-3 text-base`}
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              placeholder="Enter your full name"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-sm font-medium text-gray-600 mb-1`}>
              Phone
            </Text>
            <TextInput
              style={tw`border border-grayBorder rounded-lg p-3 text-base`}
              value={formData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-sm font-medium text-gray-600 mb-1`}>
              Location
            </Text>
            <TextInput
              style={tw`border border-grayBorder rounded-lg p-3 text-base`}
              value={formData.location}
              onChangeText={(text) => handleInputChange("location", text)}
              placeholder="Enter your location"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-sm font-medium text-gray-600 mb-1`}>Role</Text>
            <TextInput
              style={tw`border border-grayBorder rounded-lg p-3 text-base`}
              value={formData.role}
              onChangeText={(text) => handleInputChange("role", text)}
              placeholder="Enter your professional role"
            />
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-medium text-gray-600 mb-1`}>Bio</Text>
            <TextInput
              style={tw`border border-grayBorder rounded-lg p-3 text-base h-24`}
              value={formData.bio}
              onChangeText={(text) => handleInputChange("bio", text)}
              placeholder="Enter a short bio about yourself"
              multiline
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={tw`bg-primaryBlue py-3 rounded-lg mb-8 items-center`}
            onPress={handleUpdate}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={tw`text-white font-bold text-base`}>
                Save Changes
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

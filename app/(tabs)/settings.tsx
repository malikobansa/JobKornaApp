import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { account } from "../../constants/appwrite";

export default function SettingsTab() {
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      // Navigation will be handled by the auth state listener
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

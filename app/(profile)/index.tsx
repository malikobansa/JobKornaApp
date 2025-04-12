import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import tw from "@/lib/tailwind";
import { account, storage } from "../../constants/appwrite";
import { useQuery } from "@tanstack/react-query";

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

    let avatarUrl = null;
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

export default function ProfileScreen() {
  const router = useRouter();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.replace("/(auth)/login/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
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
          <Text style={tw`text-xl font-bold text-primaryBlue`}>My Profile</Text>
          <TouchableOpacity onPress={() => router.push("/(profile)/edit")}>
            <FontAwesome name="edit" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={tw`items-center mt-6`}>
          <Image
            source={
              profile?.avatarUrl
                ? { uri: profile.avatarUrl }
                : require("@/assets/images/avatar.png")
            }
            style={tw`w-24 h-24 rounded-full mb-4`}
          />
          <Text style={tw`text-xl font-bold`}>{profile?.name}</Text>
          <Text style={tw`text-sm text-grayText mb-2`}>{profile?.role}</Text>
          <Text style={tw`text-sm text-grayText mb-4`}>{profile?.email}</Text>
        </View>

        {/* Bio */}
        <View style={tw`p-4 bg-grayBg mx-4 rounded-lg mb-6`}>
          <Text style={tw`text-base text-darkerBlue mb-2 font-bold`}>
            About Me
          </Text>
          <Text style={tw`text-sm text-grayText`}>
            {profile?.bio || "No bio available"}
          </Text>
        </View>

        {/* Profile Details */}
        <View style={tw`mx-4 mb-6`}>
          <Text style={tw`text-base text-darkerBlue mb-2 font-bold`}>
            Personal Information
          </Text>

          <View style={tw`bg-white rounded-lg shadow-sm p-4 mb-2`}>
            <View style={tw`flex-row items-center mb-4`}>
              <FontAwesome
                name="envelope"
                size={20}
                color="#666"
                style={tw`w-8`}
              />
              <View>
                <Text style={tw`text-xs text-grayText`}>Email</Text>
                <Text style={tw`text-sm`}>{profile?.email}</Text>
              </View>
            </View>

            <View style={tw`flex-row items-center mb-4`}>
              <FontAwesome
                name="phone"
                size={20}
                color="#666"
                style={tw`w-8`}
              />
              <View>
                <Text style={tw`text-xs text-grayText`}>Phone</Text>
                <Text style={tw`text-sm`}>
                  {profile?.phone || "Not provided"}
                </Text>
              </View>
            </View>

            <View style={tw`flex-row items-center`}>
              <FontAwesome
                name="map-marker"
                size={20}
                color="#666"
                style={tw`w-8`}
              />
              <View>
                <Text style={tw`text-xs text-grayText`}>Location</Text>
                <Text style={tw`text-sm`}>
                  {profile?.location || "Not provided"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Options */}
        <View style={tw`mx-4 mb-6`}>
          <Text style={tw`text-base text-darkerBlue mb-2 font-bold`}>
            Account Settings
          </Text>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white p-4 rounded-lg shadow-sm mb-2`}
            onPress={() => router.push("/(profile)/saved-jobs")}
          >
            <FontAwesome
              name="bookmark"
              size={20}
              color="#666"
              style={tw`w-8`}
            />
            <Text style={tw`text-sm`}>Saved Jobs</Text>
            <FontAwesome
              name="chevron-right"
              size={16}
              color="#666"
              style={tw`ml-auto`}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white p-4 rounded-lg shadow-sm mb-2`}
            onPress={() => router.push("/(profile)/applications")}
          >
            <FontAwesome
              name="file-text"
              size={20}
              color="#666"
              style={tw`w-8`}
            />
            <Text style={tw`text-sm`}>My Applications</Text>
            <FontAwesome
              name="chevron-right"
              size={16}
              color="#666"
              style={tw`ml-auto`}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white p-4 rounded-lg shadow-sm mb-2`}
            onPress={() => router.push("/(profile)/settings")}
          >
            <FontAwesome name="cog" size={20} color="#666" style={tw`w-8`} />
            <Text style={tw`text-sm`}>Settings</Text>
            <FontAwesome
              name="chevron-right"
              size={16}
              color="#666"
              style={tw`ml-auto`}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-error p-4 rounded-lg mt-6`}
            onPress={handleLogout}
          >
            <FontAwesome
              name="sign-out"
              size={20}
              color="white"
              style={tw`w-8`}
            />
            <Text style={tw`text-sm text-white`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

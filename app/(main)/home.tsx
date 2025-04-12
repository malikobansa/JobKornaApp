import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { account, storage } from "../../constants/appwrite";
import JobBox, { Job } from "@/components/JobBox";
import tw from "@/lib/tailwind";
import TabLayout from "../(tabs)/_layout";
import * as ImagePicker from "expo-image-picker";

type FileType = {
  uri: string;
  name: string;
  type: string;
  size: number;
};

const API_KEY = "your_rapid_api_key"; // Replace with your actual API key

const Home: React.FC = () => {
  const [fullName, setFullName] = useState<string>("user");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await account.get();
        setFullName(user.name || "user");

        if (user.prefs?.avatar) {
          const fileUrl = storage.getFileView(
            "6757413c000e95b3ba5d",
            user.prefs.avatar
          );
          setAvatarUrl(fileUrl.href);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsearch.p.rapidapi.com/search?query=Product%20Designer&num_pages=1",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error("Invalid response format");
      }

      setJobs(data.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      return {
        file: result.assets[0].uri,
        name: `avatar-${Date.now()}.jpg`,
      };
    }
    return null;
  };

  const handleAvatarUpdate = async () => {
    try {
      const newAvatar = await pickImage();
      if (!newAvatar) return;

      // Use a mock file ID for demonstration - replace with actual implementation
      const fileId = { $id: "mock-file-id" };

      // In a real implementation, you'd need to use the proper file format
      // that Appwrite expects, which might be different than what we're using.
      // For now, this is just a placeholder.

      await account.updatePrefs({ avatar: fileId.$id });

      const fileUrl = storage.getFileView("6757413c000e95b3ba5d", fileId.$id);
      setAvatarUrl(fileUrl.href);
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };

  const renderJobItem = ({ item }: { item: Job }) => <JobBox job={item} />;

  return (
    <ScrollView style={tw`pt-[45px] px-[23px] flex flex-col gap-6 w-full`}>
      {/* Header */}
      <View style={tw`w-full`}>
        <View style={tw`flex flex-row items-start justify-between w-full`}>
          <Text style={tw`text-black text-[22px] font-bold`}>
            Hello, {"\n"}
            <Text style={tw`font-bold text-[22px]`}>{fullName}</Text>.
          </Text>
          <TouchableOpacity onPress={handleAvatarUpdate}>
            <Image
              source={
                avatarUrl
                  ? { uri: avatarUrl }
                  : require("@/assets/images/avatar.png")
              }
              style={tw`w-[50px] h-[50px] rounded-full`}
            />
          </TouchableOpacity>
        </View>
        {/* Promotional Section */}
        <View
          style={tw`bg-blue-700 flex-row items-center justify-between px-[17px] py-[31px] rounded-[6px] h-[183px] w-full mt-10`}
        >
          <View style={tw`flex-col items-start gap-[18px]`}>
            <Text style={tw`text-white text-[18px] leading-[23.44px]`}>
              50% off {"\n"}take any courses
            </Text>
            <Pressable
              style={tw`bg-orange-400 rounded-[6px] px-[17px] py-[5px]`}
            >
              <Text style={tw`text-white text-base`}>Join now</Text>
            </Pressable>
          </View>
          <Image
            source={require("@/assets/images/woman.png")}
            style={tw`h-80 mr-[10px] size-48 -mt-10 z-10`}
          />
        </View>
      </View>
      {/* Job Section */}
      <View style={tw`flex-col gap-[24px] items-start w-full`}>
        <Text style={tw`text-black font-bold text-[20px] leading-[20px] mt-10`}>
          Find Your Job
        </Text>
        <View style={tw`flex-row items-center gap-5 w-full`}>
          <TouchableOpacity
            style={tw`bg-cyan-400 py-[38px] px-[36px] rounded-[6px] flex-col items-center gap-[6px]`}
          >
            <Image source={require("@/assets/images/headhunting.png")} />
            <Text
              style={tw`text-primaryBlue text-[16px] leading-[20px] font-bold mt-[8px]`}
            >
              44.5k
            </Text>
            <Text
              style={tw`text-primaryBlue text-[14px] leading-[18px] font-normal`}
            >
              Remote Jobs
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-col justify-between gap-5`}>
            <TouchableOpacity
              style={tw`bg-purple-300 py-[16px] px-[36px] rounded-[6px] flex-col items-center`}
            >
              <Text
                style={tw`text-primaryBlue text-[16px] leading-[20px] font-bold mt-[8px]`}
              >
                66.8k
              </Text>
              <Text
                style={tw`text-primaryBlue text-[14px] leading-[18px] font-normal`}
              >
                Full Time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-orange-200 py-[16px] px-[36px] rounded-[6px] flex-col items-center`}
            >
              <Text
                style={tw`text-primaryBlue text-[16px] leading-[20px] font-bold mt-[8px]`}
              >
                38.9k
              </Text>
              <Text
                style={tw`text-primaryBlue text-[14px] leading-[18px] font-normal`}
              >
                Part Time
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Recent Job List */}
      <View style={tw`flex flex-col items-start gap-4 w-full`}>
        <Text style={tw`text-darkerBlue font-bold text-[16px] leading-[20px]`}>
          Remote Job List
        </Text>
        {loading ? (
          <View style={tw`py-4`}>
            <Text style={tw`text-gray-500`}>Loading jobs...</Text>
          </View>
        ) : error ? (
          <View style={tw`py-4`}>
            <Text style={tw`text-red-500`}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={jobs}
            renderItem={renderJobItem}
            keyExtractor={(item) => item.job_id}
            scrollEnabled={false}
            ListEmptyComponent={
              <Text style={tw`text-gray-500 py-4`}>No jobs available</Text>
            }
          />
        )}
      </View>
      <TabLayout />
    </ScrollView>
  );
};

export default Home;

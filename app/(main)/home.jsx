import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { account, storage } from "../../constants/appwrite";
import JobBox from "@/components/JobBox";
import tw from "twrnc";

const Home = () => {
  const [fullName, setFullName] = useState();
  const [avatarUrl, setAvatarUrl] = useState(null);  

  // Fetch user details from Appwrite
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await account.get();
        setFullName(user.name); // Set user's full name
        // If user has a custom avatar, set it
        if (user.prefs?.avatar) {
          const fileUrl = storage.getFileView("6757413c000e95b3ba5d", user.prefs.avatar);
          setAvatarUrl(fileUrl.href);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleAvatarUpdate = async () => {
    try {
      // Use a file picker to select the new avatar (implement separately)
      const newAvatar = await pickImage(); // Placeholder for an image picker function

      // Upload new avatar to Appwrite storage
      const uploadedFile = await storage.createFile(
        "6757413c000e95b3ba5d",
        newAvatar.file, // File object
        newAvatar.name // File name
      );

      // Update user's preferences with the new avatar ID
      await account.updatePrefs({ avatar: uploadedFile.$id });
      const fileUrl = storage.getFileView("6757413c000e95b3ba5d", uploadedFile.$id);
      setAvatarUrl(fileUrl.href);
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };

  return (
    <ScrollView style={tw`pt-[45px] px-[23px] flex flex-col gap-6 w-full`}>
      {/* Header */}
      <View style={tw`w-full`}>
        <View style={tw`flex flex-row items-start justify-between w-full`}>
          <Text>Hello, {"\n"}{fullName}.</Text>
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
        <View
          style={tw`bg-primaryBlue flex-row items-center justify-between px-[17px] py-[31px] rounded-[6px] h-[183px] w-full`}
        >
          <View style={tw`flex-col items-start gap-[18px]`}>
            <Text style={tw`text-white text-[18px] leading-[23.44px]`}>
              50% off {"\n"}take any courses
            </Text>
            <Pressable style={tw`bg-secOrange rounded-[6px] px-[17px] py-[5px]`}>
              <Text>Join now</Text>
            </Pressable>
          </View>
          <Image
            source={require("@/assets/images/woman.png")}
            style={tw`object-contain mr-[10px] mt-40 z-10`}
          />
        </View>
      </View>
      {/* Find Your Job */}
      <View style={tw`flex-col gap-[24px] items-start w-full`}>
        <Text style={tw`text-black font-bold text-[16px] leading-[20px]`}>
          Find Your Job
        </Text>
        <View style={tw`flex-row items-center gap-5 w-full`}>
          <TouchableOpacity
            style={tw`bg-cyan py-[38px] px-[36px] rounded-[6px] flex-col items-center gap-[6px]`}
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
              style={tw`bg-lilac py-[16px] px-[36px] rounded-[6px] flex-col items-center`}
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
              style={tw`bg-paleOrange py-[16px] px-[36px] rounded-[6px] flex-col items-center`}
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
        <JobBox />
      </View>
    </ScrollView>
  );
};

export default Home;

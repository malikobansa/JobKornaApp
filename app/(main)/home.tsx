import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { account, storage } from "../../constants/appwrite";
import JobBox from "@/components/JobBox";
import tw from "twrnc";
import TabLayout from "../(tabs)/_layout";

const Home: React.FC = () => {
  const [fullName, setFullName] = useState<string>('user'); // Default username
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Fetch user details from Appwrite
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await account.get();
        // Access name directly from the user object returned by account.get()
        setFullName(user.name || 'user'); // Handle potential undefined value

        // Set avatar URL if it exists in user preferences
        if (user.prefs?.avatar) {
          const fileUrl = storage.getFileView("6757413c000e95b3ba5d", user.prefs.avatar);
          setAvatarUrl(fileUrl.href);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        // Optionally handle the error state here
        // setFullName('user'); // Fallback to default if fetch fails
      }
    };

    fetchUserDetails();
  }, []);

  const handleAvatarUpdate = async () => {
    try {
      const newAvatar = await pickImage(); // Placeholder for a file picker function

      const uploadedFile = await storage.createFile(
        "6757413c000e95b3ba5d",
        newAvatar.file,
        newAvatar.name
      );

      // Update user preferences with new avatar ID
      await account.updatePrefs({ avatar: uploadedFile.$id });
      
      // Update avatar URL in the UI
      const fileUrl = storage.getFileView("6757413c000e95b3ba5d", uploadedFile.$id);
      setAvatarUrl(fileUrl.href);
    } catch (error) {
      console.error("Failed to update avatar:", error);
      // Optionally handle the error state here, perhaps with a user notification
    }
  };

  return (
    <ScrollView style={tw`pt-[45px] px-[23px] flex flex-col gap-6 w-full`}>
      {/* Header */}
      <View style={tw`w-full`}>
        <View style={tw`flex flex-row items-start justify-between w-full`}>
          <Text style={tw`text-black`}>
            Hello, {"\n"}<Text style={tw`font-bold`}>{fullName}</Text>.
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
            <Pressable style={tw`bg-orange-400 rounded-[6px] px-[17px] py-[5px]`}>
              <Text style={tw`text-white text-base`}>Join now</Text>
            </Pressable>
          </View>
          <Image
            source={require("@/assets/images/woman.png")}
            style={tw`h-80 mr-[10px] size-50 -mt-10 z-10`}
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
            <Text style={tw`text-primaryBlue text-[16px] leading-[20px] font-bold mt-[8px]`}>
              44.5k
            </Text>
            <Text style={tw`text-primaryBlue text-[14px] leading-[18px] font-normal`}>
              Remote Jobs
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-col justify-between gap-5`}>
            <TouchableOpacity
              style={tw`bg-purple-300 py-[16px] px-[36px] rounded-[6px] flex-col items-center`}
            >
              <Text style={tw`text-primaryBlue text-[16px] leading-[20px] font-bold mt-[8px]`}>
                66.8k
              </Text>
              <Text style={tw`text-primaryBlue text-[14px] leading-[18px] font-normal`}>
                Full Time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-orange-200 py-[16px] px-[36px] rounded-[6px] flex-col items-center`}
            >
              <Text style={tw`text-primaryBlue text-[16px] leading-[20px] font-bold mt-[8px]`}>
                38.9k
              </Text>
              <Text style={tw`text-primaryBlue text-[14px] leading-[18px] font-normal`}>
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
      <TabLayout/>
    </ScrollView>
  );
};

export default Home;

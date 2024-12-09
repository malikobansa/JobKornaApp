import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Home = () => {
  return (
    <ScrollView className="pt-[45px] px-[23px] flex flex-col gap-6 w-full">
      {/* Header */}
      <View className="w-full">
        <View className="flex flex-row items-start justify-between w-full">
          <Text>Hello, {"\n"}Orlando Diggs.</Text>
          <Image source={require("@/assets/images/avatar.png")} />
        </View>
        <View className="bg-primaryBlue flex-row items-center justify-between px-[17px] py-[31px] rounded-[6px] h-[183px] w-full">
          <View className="flex-col items-start gap-[18px]">
            <Text className="text-white text-[18px] leading-[23.44px]">
              50% off {"\n"}take any courses
            </Text>
            <Pressable className="bg-secOrange rounded-[6px] px-[17px] py-[5px]">
              <Text>Join now</Text>
            </Pressable>
          </View>
          <Image
            source={require("@/assets/images/woman.png")}
            className="object-contain mr-[10px] z-10"
          />
        </View>
      </View>
      {/* Find Your Job */}
      <View className="flex-col gap-[24px] items-start w-full">
        <Text className="text-black font-bold text-[16px] leading-[20px]">
          Find Your Job
        </Text>
        <View className="flex-row items-center gap-5 w-full">
          <TouchableOpacity className="bg-cyan py-[38px] px-[36px] rounded-[6px] flex-col items-center gap-[6px]">
            <Image source={require("@/assets/images/headhunting.png")} />
            <Text className="text-primaryBlue text-[16px] leading-[20px] font-bold mt-[8px]">
              44.5k
            </Text>
            <Text className="text-primaryBlue text-[14px] leading-[18px] font-normal">
              Remote Jobs
            </Text>
          </TouchableOpacity>
          <View className="flex-col justify-between gap-5">
            <TouchableOpacity className="bg-lilac py-[16px] px-[36px] rounded-[6px] flex-col items-center">
              <Text className="text-primaryBlue text-[16px] leading-[20px] font-bold mt-[8px]">
                66.8k
              </Text>
              <Text className="text-primaryBlue text-[14px] leading-[18px] font-normal">
                Full Time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-paleOrange py-[16px] px-[36px] rounded-[6px] flex-col items-center">
              <Text className="text-primaryBlue text-[16px] leading-[20px] font-bold mt-[8px]">
                38.9k
              </Text>
              <Text className="text-primaryBlue text-[14px] leading-[18px] font-normal">
                Part Time
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Recent Job List */}
      <View className="flex flex-col items-start gap-4 w-full">
        <Text className="text-darkerBlue font-bold text-[16px] leading-[20px]">
          Remote Job List
        </Text>
        <View></View>
      </View>
    </ScrollView>
  );
};

export default Home;

import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const JobBox = () => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/(job)/job-desc/index")}
      style={styles.shadow}
      className="bg-white rounded-[20px] p-5 flex-col items-start gap-5 w-full"
    >
      <View className="flex-row justify-between w-full">
        <View className="flex-row gap-[6px]">
          {/* Company Logo */}
          <View className="items-center justify-center p-[10px] bg-cyan">
            <Image
              source={require("@/assets/images/google-icon.png")}
              className="w-5 h-5"
            />
          </View>
          {/* Job title and location */}
          <View className="flex-col items-start gap-[4px]">
            <Text className="text-[14px] font-bold text-primary leading-[18px]">
              Product Designer
            </Text>
            <Text className="flex flex-row items-center gap-[5px] text-[12px] leading-[15px] text-lightestBlue">
              <Text>Google Inc.</Text>
              <View className="w-[2px] h-[2px] bg-lightestBlue rounded-full" />
              <Text>California, USA</Text>
            </Text>
          </View>
        </View>
        <Pressable className="p-4 rounded-full">
          <Image source={require("@/assets/images/bookmark.png")} />
        </Pressable>
      </View>
      <View className="flex-col gap-[10px] w-full">
        <Text className="text-primaryBlue text-[14px] leading-[19px] font-semibold">
          $15K
          <Text className="text-lightGrey text-[12px] leading-[16px]">/Mo</Text>
        </Text>
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-center gap-2">
            <View className="bg-lightestGrey opacity-20 rounded-[8px] px-4 py-[6px]">
              <Text className="text-primaryBlue font-normal text-[10px] leading-[13px]">
                Senior Designer
              </Text>
            </View>
            <View className="bg-lightestGrey opacity-20 rounded-[8px] px-4 py-[6px]">
              <Text className="text-primaryBlue font-normal text-[10px] leading-[13px]">
                Full Time
              </Text>
            </View>
          </View>
          <View className="bg-paleOrange opacity-20 rounded-[8px] px-4 py-[6px]">
            <Text className="text-primaryBlue font-normal text-[10px] leading-[13px]">
              Apply
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default JobBox;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#99ABC6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 62 / 4,
    elevation: 10,
  },
});

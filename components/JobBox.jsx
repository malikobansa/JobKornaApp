import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

const JobBox = () => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/(job)/job-desc/index")}
      className="bg-white rounded-[20px] p-5 flex-col items-start gap-5 w-full"
    >
      <View className="flex-row justify-between w-full">
        <View className="flex-row gap-[6px]"></View>
      </View>
    </Pressable>
  );
};

export default JobBox;

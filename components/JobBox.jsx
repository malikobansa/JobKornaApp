import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import tw from "../tw.js";

const JobBox = () => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/(job)/job-desc/job-desc")}
      style={[
        styles.shadow,
        tw`bg-white rounded-[20px] p-5 flex-col items-start gap-5 w-full`,
      ]}
    >
      <View style={tw`flex-row justify-between w-full`}>
        <View style={tw`flex-row gap-[6px]`}>
          {/* Company Logo */}
          <View
            style={[
              tw`items-center justify-center rounded-full p-[10px] w-10 h-10`,
              { backgroundColor: "#AFECFE" },
            ]}
          >
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={tw`w-5 h-5`}
            />
          </View>
          {/* Job title and location */}
          <View style={tw`flex-col items-start gap-[4px]`}>
            <Text
              style={[
                tw`text-[14px] font-bold leading-[18px]`,
                { color: "#0D0140" },
              ]}
            >
              Product Designer
            </Text>
            <View
              style={[
                tw`flex-row items-center gap-[5px] text-[12px] leading-[15px]`,
                { color: "#524B6B" },
              ]}
            >
              <Text>Google Inc</Text>
              <View
                style={[
                  tw`w-[2px] h-[2px] rounded-full`,
                  { backgroundColor: "#524B6B" },
                ]}
              />
              <Text>California, USA</Text>
            </View>
          </View>
        </View>
        <Pressable style={tw`p-4 rounded-full`}>
          <Image
            source={require("@/assets/images/bookmark.png")}
            style={tw`w-[14px] h-[20px]`}
          />
        </Pressable>
      </View>
      <View style={tw`flex-col gap-[10px] w-full`}>
        <Text
          style={[
            tw`text-[14px] leading-[19px] font-semibold`,
            { color: "#0D0140" },
          ]}
        >
          $15K
          <Text style={[tw`text-[12px] leading-[16px]`, { color: "#ADAAB9" }]}>
            /Mo
          </Text>
        </Text>
        <View style={tw`flex-row items-center justify-between w-full`}>
          <View style={tw`flex-row items-center gap-2`}>
            <View
              style={[
                tw`rounded-[8px] px-4 py-[6px]`,
                { backgroundColor: "#F2F2F5" },
              ]}
            >
              <Text
                style={[
                  tw`font-normal text-[#524B6B] text-[10px] leading-[13px]`,
                ]}
              >
                Senior Designer
              </Text>
            </View>
            <View
              style={[
                tw` rounded-[8px] px-4 py-[6px]`,
                { backgroundColor: "#F2F2F5" },
              ]}
            >
              <Text
                style={[
                  tw`font-normal text-[10px] leading-[13px]`,
                  { color: "#524B6B" },
                ]}
              >
                Full Time
              </Text>
            </View>
          </View>
          <View
            style={[
              tw`rounded-[8px] px-4 py-[6px]`,
              { backgroundColor: "#FDE0D5" },
            ]}
          >
            <Text
              style={[
                tw`font-normal text-[10px] leading-[13px]`,
                { color: "#0D0140" },
              ]}
            >
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

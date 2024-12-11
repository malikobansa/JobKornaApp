import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import JobBox from "@/components/JobBox";
import tw from "../../tw.js";

const Home = () => {
  return (
    <ScrollView style={tw`pt-[55px] px-[23px] flex flex-col gap-6 w-full`}>
      {/* Header */}
      <View style={tw`w-full`}>
        <View style={tw`flex-row items-start justify-between w-full`}>
          <Text
            style={tw`text-[22px] text-[#0D0140] font-bold leading-[26.65px] `}
          >
            Hello, {"\n"}Orlando Diggs
          </Text>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={tw`w-[37px] h-[37px]`}
          />
        </View>
        {/* Banner */}
        <View
          style={[
            tw`flex-row items-center justify-between px-[17px] py-[31px] rounded-[6px] mt-10 z-10 w-full`,
            { backgroundColor: "#0D0140" },
          ]}
        >
          <View style={tw`flex-col items-start gap-[18px]`}>
            <Text
              style={(tw`text-[18px] leading-[23.44px]`, { color: "white" })}
            >
              50% off {"\n"}take any courses
            </Text>
            <Pressable
              style={[
                tw`rounded-[6px] px-[17px] py-[5px]`,
                { backgroundColor: "#FF9228" },
              ]}
            >
              <Text style={tw`font-medium text-[15px] text-white`}>
                Join now
              </Text>
            </Pressable>
          </View>
          <Image
            source={require("@/assets/images/woman.png")}
            style={tw`absolute bottom-0 right-0 w-[130px] h-[170px]  mr-[10px] z-20`}
          />
        </View>
      </View>

      {/* Find Your Job */}
      <View style={tw`flex-col gap-[16px] items-start mt-6 w-full`}>
        <Text style={tw`text-black font-bold text-[16px] leading-[20px]`}>
          Find Your Job
        </Text>
        <View style={tw`flex-row items-stretch justify-between w-full`}>
          <TouchableOpacity
            style={[
              tw`py-[38px] px-[36px] rounded-[6px] flex-col items-center gap-[6px]`,
              { backgroundColor: "#AFECFE" },
            ]}
          >
            <Image
              source={require("@/assets/images/headhunting.png")}
              style={tw`w-[34px] h-[34px]`}
            />
            <Text
              style={[
                tw`text-[16px] leading-[20px] font-bold mt-[8px]`,
                { color: "#0D0140" },
              ]}
            >
              44.5k
            </Text>
            <Text
              style={[
                tw`text-[14px] leading-[18px] font-normal`,
                { color: "#0D0140" },
              ]}
            >
              Remote Jobs
            </Text>
          </TouchableOpacity>
          <View style={tw`flex flex-col gap-5`}>
            <TouchableOpacity
              style={[
                tw`py-[16px] px-[36px] rounded-[6px] flex-col items-center w-[156px]`,
                { backgroundColor: "#BEAFFE" },
              ]}
            >
              <Text
                style={[
                  tw`text-[16px] leading-[20px] font-bold mt-[8px]`,
                  { color: "#0D0140" },
                ]}
              >
                66.8k
              </Text>
              <Text
                style={[
                  tw`text-[14px] leading-[18px] font-normal`,
                  { color: "#0D0140" },
                ]}
              >
                Full Time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tw`py-[16px] px-[36px] rounded-[6px] flex-col items-center`,
                { backgroundColor: "#FFD6AD" },
              ]}
            >
              <Text
                style={[
                  tw`text-[16px] leading-[20px] font-bold mt-[8px]`,
                  { color: "#0D0140" },
                ]}
              >
                38.9k
              </Text>
              <Text
                style={[
                  tw`text-[14px] leading-[18px] font-normal`,
                  { color: "#0D0140" },
                ]}
              >
                Part Time
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Recent Job List */}
      <View style={tw`flex-col items-start gap-4 mt-5 w-full`}>
        <Text
          style={[
            tw`font-bold text-[16px] leading-[20px]`,
            { color: "#150B3D" },
          ]}
        >
          Recent Job List
        </Text>
        <JobBox />
      </View>
    </ScrollView>
  );
};

export default Home;

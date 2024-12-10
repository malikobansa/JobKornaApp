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
import tw from "twrnc";

const Home = () => {
  return (
    <ScrollView style={tw`pt-[45px] px-[23px] flex flex-col gap-6 w-full`}>
      {/* Header */}
      <View style={tw`w-full`}>
        <View style={tw`flex-row items-start justify-between w-full`}>
          <Text>Hello, {"\n"}Orlando Diggs.</Text>
          <Image source={require("@/assets/images/avatar.png")} />
        </View>
        <View
          style={tw`bg-primaryBlue flex-row items-center justify-between px-[17px] py-[31px] rounded-[6px] h-[183px] z-10 w-full`}
        >
          <View style={tw`flex-col items-start gap-[18px]`}>
            <Text style={tw`text-white text-[18px] leading-[23.44px]`}>
              50% off {"\n"}take any courses
            </Text>
            <Pressable
              style={tw`bg-secOrange rounded-[6px] px-[17px] py-[5px]`}
            >
              <Text>Join now</Text>
            </Pressable>
          </View>
          <Image
            source={require("@/assets/images/woman.png")}
            style={tw`object-cover w-[160px] h-[100px] mr-[10px] z-20`}
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
      <View style={tw`flex-col items-start gap-4 w-full`}>
        <Text style={tw`text-darkerBlue font-bold text-[16px] leading-[20px]`}>
          Remote Job List
        </Text>
        <JobBox />
      </View>
    </ScrollView>
  );
};

export default Home;

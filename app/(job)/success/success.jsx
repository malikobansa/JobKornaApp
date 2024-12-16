import React from "react";
import { ScrollView, Image, Pressable } from "react-native";
import Button from "../../../components/Button";

const Success = () => {
  return (
    <ScrollView>
      <View
        style={tw`relative bg-[#F3F2F2] pt-[35px] pb-[21px] px-[31px] w-full`}
      >
        <View
          style={tw`absolute left-[50%] -translate-x-[50%] top-[90px] rounded-full bg-[#AFECFE] p-4`}
        >
          <Image
            source={require("@/assets/images/google-icon.png")}
            style={tw`w-16 h-16`}
          />
        </View>
        <Text
          style={tw`text-[16px] text-[#0D0140] font-bold leading-[20.83px]`}
        >
          UI/UX Designer
        </Text>
        <View style={tw`mt-4 flex-row justify-between items-center w-full`}>
          <Text
            style={tw`font-normal text-[#0D0140] text-[16px] leading-[20.83px]`}
          >
            Google
          </Text>
          <View style={tw`bg-[#0D0140] rounded-full w-[7px] h-[7px]`} />
          <Text
            style={tw`font-normal text-[#0D0140] text-[16px] leading-[20.83px]`}
          >
            California
          </Text>
          <View style={tw`bg-[#0D0140] rounded-full w-[7px] h-[7px]`} />
          <Text
            style={tw`font-normal text-[#0D0140] text-[16px] leading-[20.83px]`}
          >
            1 day ago
          </Text>
        </View>
      </View>
      {/* Success message */}
      <View style={tw`gap-[32px] mt-10`}>
        <Image
          source={require("@/assets/images/success-upload.png")}
          style={tw`w-[152px] h-[152px]`}
        />
        <View style={tw`gap-4 justify-center items-center`}>
          <Text style={tw`text-[#3A3452] text-[16px] font-bold`}>
            Successful
          </Text>
          <Text style={tw`text-[#524B6B] text-[12px]`}>
            Congratulations, your application has been sent
          </Text>
        </View>
      </View>
      {/* Buttons */}
      <View style={tw`mt-10 gap-5 items-center justify-center`}>
        <Button style="sec" text="Find a similar job" addStyles="w-[65%]" />
        <Button style="primary" text="Back to home" addStyles="w-[65%]" />
      </View>
    </ScrollView>
  );
};

export default Success;

import React from "react";
import { Text, View, ScrollView, Image, Pressable } from "react-native";
import tw from "../../../tw";
import { JobRequirements, JobFacilities } from "@/components/JobData";

const JobDesc = () => {
  return (
    <ScrollView style={tw`pt-[134px] bg-white w-full`}>
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
      {/* Buttons */}
      <View style={tw`flex-row items-center justify-between px-5 w-full`}>
        <Pressable style={tw`bg-[#0D0140] px-[42px] py-[11px] rounded-[6px]`}>
          <Text style={tw`font-bold text-white text-[14px] leading-[18.23px] `}>
            Description
          </Text>
        </Pressable>
        <Pressable style={tw`bg-[#D6CDFE] px-[42px] py-[11px] rounded-[6px]`}>
          <Text
            style={tw`font-bold text-[#0D0140] text-[14px] leading-[18.23px]`}
          >
            Company
          </Text>
        </Pressable>
      </View>
      {/* Job Description */}
      <View style={tw`mt-5 px-5`}>
        <Text
          style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
        >
          Job Description
        </Text>
        <Text
          style={tw`text-[#524B6B] text-[12px] font-normal leading-[15.62px] mt-4 w-[329px]`}
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem ...
        </Text>
        <Pressable style={tw`bg-[#7551FF] mt-[10px] px-[14px] py-[7px]`}>
          <Text style={tw`text-[12px] text-[#0D0140] leading-[16.34px]`}>
            Read More
          </Text>
        </Pressable>
        <View style={tw`mt-5`}>
          <Text
            style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
          >
            Requirements
          </Text>
          {JobRequirements.map((item) => (
            <View key={item.id} style={tw`flex-row items-center gap-3`}>
              <View style={tw`bg-[#524B6B] rounded-full w-1 h-1`} />
              <Text
                style={tw`text-[12px] text-[#524B6B] font-normal leading-[16.34px] w-full`}
              >
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {/* Job Information */}
      <View style={tw`mt-[25px] px-5`}>
        <Text
          style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
        >
          Location
        </Text>
        <Text
          style={tw`text-[12px] text-[#524B6B] font-normal leading-[15.62px]`}
        >
          Overlook Avenue, Belleville, NJ, USA
        </Text>
        <Image
          source={require("@/assets/images/map.png")}
          style={tw`w-full h-auto`}
        />
        <View style={tw`mt-[25px]`}>
          <Text
            style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
          >
            Information
          </Text>
          {/* More Information */}
          {/* Position */}
          <View style={tw`mt-[16px]`}>
            <Text
              style={tw`text-[#150B3D] text-[12px] font-bold leading-[15.62px]`}
            >
              Position
            </Text>
            <Text
              style={tw`text-[#524B6B] text-[12px] font-normal leading-[15.62px] mt-[5px]`}
            >
              Senior Designer
            </Text>
            <View
              style={tw`w-full h-[0.5px] bg-[#DEE1E7] rounded-full mt-[15px]`}
            />
          </View>
          {/* Qualification */}
          <View style={tw`mt-[16px]`}>
            <Text
              style={tw`text-[#150B3D] text-[12px] font-bold leading-[15.62px]`}
            >
              Qualification
            </Text>
            <Text
              style={tw`text-[#524B6B] text-[12px] font-normal leading-[15.62px] mt-[5px]`}
            >
              Bachelor's Degree
            </Text>
            <View
              style={tw`w-full h-[0.5px] bg-[#DEE1E7] rounded-full mt-[15px]`}
            />
          </View>
          {/* Experience */}
          <View style={tw`mt-[16px]`}>
            <Text
              style={tw`text-[#150B3D] text-[12px] font-bold leading-[15.62px]`}
            >
              Experience
            </Text>
            <Text
              style={tw`text-[#524B6B] text-[12px] font-normal leading-[15.62px] mt-[5px]`}
            >
              3 Years
            </Text>
            <View
              style={tw`w-full h-[0.5px] bg-[#DEE1E7] rounded-full mt-[15px]`}
            />
          </View>
          {/* Job-Type */}
          <View style={tw`mt-[16px]`}>
            <Text
              style={tw`text-[#150B3D] text-[12px] font-bold leading-[15.62px]`}
            >
              Job Type
            </Text>
            <Text
              style={tw`text-[#524B6B] text-[12px] font-normal leading-[15.62px] mt-[5px]`}
            >
              Full-Time
            </Text>
            <View
              style={tw`w-full h-[0.5px] bg-[#DEE1E7] rounded-full mt-[15px]`}
            />
          </View>
          {/* Specialization */}
          <View style={tw`mt-[16px]`}>
            <Text
              style={tw`text-[#150B3D] text-[12px] font-bold leading-[15.62px]`}
            >
              Specialization
            </Text>
            <Text
              style={tw`text-[#524B6B] text-[12px] font-normal leading-[15.62px] mt-[5px]`}
            >
              Design
            </Text>
            <View
              style={tw`w-full h-[0.5px] bg-[#DEE1E7] rounded-full mt-[15px]`}
            />
          </View>
        </View>
      </View>
      {/* Facilities and Others */}
      <View style={tw`mt-[30px] px-5`}>
        <Text
          style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
        >
          Facilities and Others
        </Text>
        <View style={tw`flex-col items-start gap-[15px]`}>
          {JobFacilities.map((item) => (
            <View key={item.id} style={tw`flex-row items-center gap-[5px]`}>
              <View style={tw`w-1 h-1 bg-[#524B6B] rounded-full`} />
              <Text
                style={tw`text-[#524B6B] text-[12px] leading-[15.62px] font-normal`}
              >
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {/* Apply Now */}
      <Pressable
        style={tw`px-[92px] py-4 rounded-[6px] bg-[#130160] mt-[30px]`}
      >
        <Text
          style={tw`text-white text-[14px] font-bold leading-[18.23px] tracking-[6%] uppercase`}
        >
          Apply Now
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default JobDesc;

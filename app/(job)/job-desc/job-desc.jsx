import React, { useState } from "react";
import { Text, View, ScrollView, Image, Pressable } from "react-native";
import tw from "../../../tw";
import { JobRequirements, JobFacilities } from "@/components/JobData";

const jobInformationData = [
  {
    label: "Position",
    value: "Senior Designer",
    showDivider: true,
  },
  {
    label: "Qualification",
    value: "Bachelor's Degree",
    showDivider: true,
  },
  {
    label: "Experience",
    value: "3 Years",
    showDivider: true,
  },
  {
    label: "Job Type",
    value: "Full-Time",
    showDivider: true,
  },
  {
    label: "Specialization",
    value: "Design",
    showDivider: false,
  },
];

const companyDetails = [
  {
    label: "Website",
    value: "https://www.google.com",
    valueStyle: "text-[#7551FF]",
  },
  {
    label: "Industry",
    value: "Internet Product",
    valueStyle: "text-[#524B6B]",
  },
  {
    label: "Employee Size",
    value: "132,121 Employees",
    valueStyle: "text-[#524B6B]",
  },
  {
    label: "Head Office",
    value: "Mountain View, California, Amerika Serikat",
    valueStyle: "text-[#524B6B]",
  },
  {
    label: "Type",
    value: "Multinational Company",
    valueStyle: "text-[#524B6B]",
  },
  {
    label: "Since",
    value: "1998",
    valueStyle: "text-[#524B6B]",
  },
  {
    label: "Specialization",
    value: "Search technology, Web computing, Software and Online advertising",
    valueStyle: "text-[#524B6B] w-[279px]",
  },
];

const JobDesc = () => {
  const [jobDesc, setJobDesc] = useState(true);

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
        <Pressable
          style={tw` px-[42px] py-[11px] rounded-[6px] ${
            jobDesc ? "bg-[#0D0140]" : "bg-[#D6CDFE]"
          }`}
          onPress={() => setJobDesc(true)}
        >
          <Text
            style={tw`font-bold text-white text-[14px] leading-[18.23px] ${
              jobDesc ? "text-white" : "text-[#0D0140]"
            }`}
          >
            Description
          </Text>
        </Pressable>
        <Pressable
          style={tw` px-[42px] py-[11px] rounded-[6px] ${
            jobDesc ? "bg-[#0D0140]" : "bg-[#D6CDFE]"
          }`}
          onPress={() => setJobDesc(false)}
        >
          <Text
            style={tw`font-bold text-[14px] leading-[18.23px] ${
              jobDesc ? "text-white" : "text-[#0D0140]"
            }`}
          >
            Company
          </Text>
        </Pressable>
      </View>
      {/* Job Description */}
      {JobDesc && (
        <>
          {/* Job Description */}
          <View style={tw`mt-5 px-5`}>
            <Text
              style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
            >
              Job Description
            </Text>
            <Text
              style={tw`text-[#524B6B] text-[12px] font-normal leading-[15.62px] mt-4 w-full`}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem ...
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
              resizeMode="cover"
            />
            <View style={tw`mt-[25px]`}>
              <Text
                style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
              >
                Information
              </Text>
              {jobInformationData.map((item, index) => (
                <View key={item.label} style={tw`mt-[16px]`}>
                  <Text
                    style={tw`text-[#150B3D] text-[12px] font-bold leading-[15.62px]`}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={tw`text-[#524B6B] text-[12px] font-normal leading-[15.62px] mt-[5px]`}
                  >
                    {item.value}
                  </Text>
                  {item.showDivider && (
                    <View
                      style={tw`w-full h-[0.5px] bg-[#DEE1E7] rounded-full mt-[15px]`}
                    />
                  )}
                </View>
              ))}
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
        </>
      )}

      {/* Company Info */}
      {!JobDesc && (
        <>
          <View style={tw`mt-5 px-5`}>
            <Text
              style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
            >
              Job Description
            </Text>
            <Text
              style={tw`text-[#524B6B] text-[12px] font-normal leading-[15.62px] mt-4 w-full`}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.{"\n"}
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas.{"\n"}
              Nor again is there anyone who loves or pursues or desires to
              obtain pain of itself, because it is pain.
            </Text>
          </View>
          <View style={tw`mt-5 gap-5 px-5`}>
            {companyDetails.map((detail, index) => (
              <View key={index} style={tw`gap-[6px]`}>
                <Text
                  style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
                >
                  {detail.label}
                </Text>
                <Text
                  style={tw`${detail.valueStyle} font-bold text-[12px] leading-[16.23px]`}
                >
                  {detail.value}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
      {/* Apply Now */}
      <View style={tw`bg-white flex-row gap-8 fixed bottom-0 py-[27px] w-full`}>
        {/* Bookmark Btn */}
        <Pressable>
          <Image
            source={require("@/assets/images/blue-bookmark.png")}
            style={tw`w-4 h-5`}
          />
        </Pressable>
        {/* Apply Now Btn */}
        <Pressable
          style={tw`px-[92px] py-4 rounded-[6px] bg-[#130160] mt-[30px]`}
        >
          <Text
            style={tw`text-white text-[14px] font-bold leading-[18.23px] tracking-[6%] uppercase`}
          >
            Apply Now
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default JobDesc;

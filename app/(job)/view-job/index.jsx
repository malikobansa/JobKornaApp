import React from 'react';
import { View, Text, Image, ScrollView, Pressable, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

const Index = () => {
  const { id, jobData } = useLocalSearchParams();
  const job = JSON.parse(jobData);

  const handleApply = () => {
    if (job.job_apply_link) {
      Linking.openURL(job.job_apply_link);
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-row items-center mb-4`}>
        <Image
          source={
            job.employer_logo
              ? { uri: job.employer_logo }
              : require("@/assets/images/google-icon.png")
          }
          style={tw`w-16 h-16 rounded`}
        />
        <View style={tw`ml-4`}>
          <Text style={tw`text-xl font-bold`}>{job.job_title}</Text>
          <Text style={tw`text-gray-600`}>
            {job.employer_name} • {job.job_city}, {job.job_country}
          </Text>
        </View>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Salary</Text>
        <Text style={tw`text-gray-700`}>{job.job_salary || 'Not specified'}</Text>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Employment Type</Text>
        <Text style={tw`text-gray-700`}>{job.job_employment_type}</Text>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Description</Text>
        <Text style={tw`text-gray-700`}>{job.job_description}</Text>
      </View>

      {job.job_highlights && (
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Highlights</Text>
          {job.job_highlights.map((highlight, index) => (
            <Text key={index} style={tw`text-gray-700 mb-1`}>• {highlight}</Text>
          ))}
        </View>
      )}

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Posted</Text>
        <Text style={tw`text-gray-700`}>{job.job_posted_at}</Text>
      </View>

      <Pressable
        onPress={handleApply}
        style={tw`bg-blue-500 p-4 rounded-lg mb-8`}
      >
        <Text style={tw`text-white text-center font-bold text-lg`}>Apply Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Index;
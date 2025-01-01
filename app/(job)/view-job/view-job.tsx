import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

type JobData = {
  employer_logo?: string;
  job_title?: string;
  employer_name?: string;
  job_city?: string;
  job_country?: string;
  job_description?: string;
  job_apply_link?: string;
};

const handleApplyPress = (applyLink: string | undefined) => {
  if (applyLink) {
    Linking.openURL(applyLink).catch((err) =>
      console.error("Failed to open link:", err)
    );
  } else {
    alert("No application link available for this job.");
  }
};

const ViewJob: React.FC = () => {
  const router = useRouter();
  const { id, jobData } = useLocalSearchParams<{ id?: string; jobData?: string }>();

  // Parse jobData to get job details
  const job: JobData | null = jobData ? JSON.parse(jobData) : null;

  if (!job) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Job details are not available.</Text>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={
          job.employer_logo
            ? { uri: job.employer_logo }
            : require("@/assets/images/google-icon.png")
        }
        style={styles.logo}
      />
      <Text style={styles.title}>{job.job_title || "N/A"}</Text>
      <Text style={styles.employer}>{job.employer_name || "N/A"}</Text>
      <Text style={styles.location}>
        {job.job_city}, {job.job_country}
      </Text>
      <Text style={styles.description}>{job.job_description || "No description provided."}</Text>
      <Pressable
        style={styles.applyButton}
        onPress={() => handleApplyPress(job.job_apply_link)}
      >
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ViewJob;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#333",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  employer: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  applyButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
  },
});

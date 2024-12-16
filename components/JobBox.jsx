import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";

const JobBox = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://jsearch.p.rapidapi.com/search?query=Product%20Designer&num_pages=1",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "ab11d6ea47mshaa5a1960c286d92p141310jsn20556f981e65",
              "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setJobs(data.data || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobPress = (job) => {
    router.push({
      pathname: "/(job)/view-job/[id]",
      params: {
        id: job.job_id || "undefined",
        jobData: JSON.stringify({
          job_id: job.job_id,
          job_title: job.job_title,
          employer_name: job.employer_name,
          employer_logo: job.employer_logo,
          job_city: job.job_city,
          job_country: job.job_country,
          job_employment_type: job.job_employment_type,
          job_salary: job.job_salary,
          job_description: job.job_description,
          job_highlights: job.job_highlights,
          job_requirements: job.job_requirements,
          job_posted_at: job.job_posted_at,
          job_apply_link: job.job_apply_link,
        }),
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      {jobs.length === 0 ? (
        <Text style={styles.noJobsText}>No jobs available.</Text>
      ) : (
        jobs.map((job, index) => (
          <Pressable
            key={`${job.job_id || index}`}
            onPress={() => handleJobPress(job)}
            style={styles.container}
          >
            <View style={styles.headerContainer}>
              <View style={styles.companyInfoWrapper}>
                <Image
                  source={
                    job.employer_logo
                      ? { uri: job.employer_logo }
                      : require("@/assets/images/google-icon.png")
                  }
                  style={styles.logoImage}
                />
                <View style={styles.jobInfoContainer}>
                  <Text style={styles.jobTitle}>{job.job_title || "N/A"}</Text>
                  <Text style={styles.companyName}>
                    {job.employer_name || "N/A"} • {job.job_city || "N/A"}
                  </Text>
                </View>
              </View>
              <Pressable style={styles.bookmarkButton}>
                <Image
                  source={require("@/assets/images/bookmark.png")}
                  style={styles.bookmarkImage}
                />
              </Pressable>
            </View>
            <Text style={styles.salaryText}>
              {job.job_salary || "$N/A"}
              <Text style={styles.salaryUnit}>/Mo</Text>
            </Text>
            <View style={styles.jobTagsContainer}>
              <View style={styles.tagsWrapper}>
                <Text style={styles.tagText}>
                  {job.job_employment_type || "N/A"}
                </Text>
              </View>
              <Pressable style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </Pressable>
            </View>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
};

export default JobBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
    width: "100%",
    shadowColor: "#99ABC6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 15.5,
    elevation: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  companyInfoWrapper: {
    flexDirection: "row",
    gap: 6,
  },
  logoContainer: {
    backgroundColor: "#AFECFE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    padding: 10,
    width: 40,
    height: 40,
  },
  logoImage: {
    width: 20,
    height: 20,
  },
  jobInfoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 18,
    color: "#0D0140",
  },
  jobLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  companyName: {
    fontSize: 12,
    lineHeight: 15,
    color: "#524B6B",
  },
  locationDot: {
    width: 2,
    height: 2,
    borderRadius: 9999,
    backgroundColor: "#524B6B",
  },
  bookmarkButton: {
    padding: 16,
    borderRadius: 9999,
  },
  bookmarkImage: {
    width: 14,
    height: 20,
  },
  jobDetailsContainer: {
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  salaryText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    color: "#0D0140",
  },
  salaryUnit: {
    fontSize: 12,
    lineHeight: 16,
    color: "#ADAAB9",
  },
  jobTagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  tagsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tag: {
    backgroundColor: "#F2F2F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "normal",
    color: "#524B6B",
  },
  applyButton: {
    backgroundColor: "#FDE0D5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  applyButtonText: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "normal",
    color: "#0D0140",
  },
});

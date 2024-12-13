import React, { useState, useEffect } from "react";
import { View, Image, Text, Pressable, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import tw from 'twrnc'

const JobBox = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://jsearch.p.rapidapi.com/search?query=Product%20Designer&num_pages=1", {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "ab11d6ea47mshaa5a1960c286d92p141310jsn20556f981e65",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        });

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
        id: job.job_id || 'undefined',
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
          job_apply_link: job.job_apply_link
        })
      }
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
            style={[styles.shadow, styles.jobBox]}
          >
            <View style={styles.row}>
              <View style={styles.jobInfo}>
                <Image
                  source={
                    job.employer_logo
                      ? { uri: job.employer_logo }
                      : require("@/assets/images/google-icon.png")
                  }
                  style={styles.logo}
                />
                <View>
                  <Text style={styles.jobTitle}>{job.job_title || "N/A"}</Text>
                  <Text style={styles.jobMeta}>
                    {job.employer_name || "N/A"} • {job.job_city || "N/A"}
                  </Text>
                </View>
              </View>
              <Pressable style={styles.bookmark}>
                <Image source={require("@/assets/images/bookmark.png")} />
              </Pressable>
            </View>
            <Text style={styles.salary}>
              {job.job_salary || "$N/A"}
              <Text style={styles.salaryPerMonth}>/Mo</Text>
            </Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text>{job.job_employment_type || "N/A"}</Text>
              </View>
              <Pressable style={styles.applyTag}>
                <Text>Apply</Text>
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
  shadow: {
    shadowColor: "#99ABC6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 15,
    elevation: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noJobsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  jobBox: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
  },
  row: {
    width: 320,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jobInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  jobMeta: {
    fontSize: 12,
    color: "#666",
  },
  bookmark: {
    padding: 10,
  },
  salary: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  salaryPerMonth: {
    fontSize: 12,
    color: "#888",
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  tag: {
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 5,
  },
  applyTag: {
    backgroundColor: "#ffefd5",
    padding: 5,
    borderRadius: 5,
  },
});
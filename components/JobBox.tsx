import React from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import tw from "@/lib/tailwind";
import { useIsBookmarked, useToggleBookmark } from "@/hooks/useBookmarks";
import { useJobs } from "@/hooks/useJobs";

export type Job = {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  job_city: string;
  job_country: string;
  job_employment_type: string;
  job_salary?: string;
  job_description?: string;
  job_highlights?: string;
  job_requirements?: string;
  job_posted_at?: string;
  job_apply_link?: string;
};

type JobBoxProps = {
  job?: Job;
  standalone?: boolean;
};

const JobBox: React.FC<JobBoxProps> = ({ job, standalone = false }) => {
  const router = useRouter();

  // Use TanStack Query hooks for data fetching
  const {
    data: jobs = [],
    isLoading,
    error,
  } = useJobs(undefined, { enabled: standalone });

  // Only use jobs data when in standalone mode
  const showJobsList = standalone && !isLoading && !error;

  const handleJobPress = (jobData: Job) => {
    router.push({
      pathname: "/(job)/view-job/view-job",
      params: {
        id: jobData.job_id,
        jobData: JSON.stringify(jobData),
      },
    });
  };

  const handleApplyPress = (applyLink: string | undefined) => {
    if (applyLink) {
      Linking.openURL(applyLink).catch((err) => {
        console.error("Failed to open link:", err);
        alert("Failed to open the application link. Please try again later.");
      });
    } else {
      alert("No application link available for this job.");
    }
  };

  if (isLoading && standalone) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error && standalone) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error instanceof Error ? error.message : "An error occurred"}
        </Text>
      </View>
    );
  }

  // Render a single job
  if (job) {
    return (
      <JobItem
        job={job}
        onPress={() => handleJobPress(job)}
        onApplyPress={() => handleApplyPress(job.job_apply_link)}
      />
    );
  }

  // Render the list of jobs (standalone mode)
  return (
    <ScrollView>
      {jobs.length === 0 ? (
        <Text style={styles.noJobsText}>No jobs available.</Text>
      ) : (
        jobs.map((job) => (
          <JobItem
            key={job.job_id}
            job={job}
            onPress={() => handleJobPress(job)}
            onApplyPress={() => handleApplyPress(job.job_apply_link)}
          />
        ))
      )}
    </ScrollView>
  );
};

// Separate JobItem component to handle bookmark logic individually for each job
const JobItem = ({
  job,
  onPress,
  onApplyPress,
}: {
  job: Job;
  onPress: () => void;
  onApplyPress: () => void;
}) => {
  // Use bookmark hooks
  const { data: isBookmarked = false } = useIsBookmarked(job.job_id);
  const toggleBookmarkMutation = useToggleBookmark();

  const handleToggleBookmark = () => {
    toggleBookmarkMutation.mutate(job);
  };

  return (
    <Pressable
      key={job.job_id}
      onPress={onPress}
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
            onError={() => console.log("Failed to load image")}
          />
          <View>
            <Text style={styles.jobTitle}>{job.job_title}</Text>
            <Text style={styles.jobMeta}>
              {job.employer_name} • {job.job_city}
            </Text>
          </View>
        </View>
        <Pressable style={styles.bookmark} onPress={handleToggleBookmark}>
          <FontAwesome
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            size={24}
            color={isBookmarked ? "#ff9228" : "#666"}
          />
        </Pressable>
      </View>
      <Text style={styles.salary}>
        {job.job_salary || "Salary not specified"}
        {job.job_salary && <Text style={styles.salaryPerMonth}>/Mo</Text>}
      </Text>
      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <Text>{job.job_employment_type}</Text>
        </View>
        <Pressable style={styles.applyTag} onPress={onApplyPress}>
          <Text>Apply</Text>
        </Pressable>
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
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#ff0000",
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

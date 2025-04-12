import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Job } from "@/components/JobBox";

const BOOKMARKS_STORAGE_KEY = "@jobkorna:bookmarks";

// Fetch all bookmarked jobs
const getBookmarkedJobs = async (): Promise<Job[]> => {
  try {
    const storedBookmarks = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (storedBookmarks) {
      return JSON.parse(storedBookmarks);
    }
    return [];
  } catch (error) {
    console.error("Failed to load bookmarked jobs:", error);
    return [];
  }
};

// Check if a job is bookmarked
const isJobBookmarked = async (jobId: string): Promise<boolean> => {
  try {
    const jobs = await getBookmarkedJobs();
    return jobs.some((job) => job.job_id === jobId);
  } catch (error) {
    console.error("Failed to check bookmarked status:", error);
    return false;
  }
};

// Custom hook to get all bookmarked jobs
export const useBookmarkedJobs = () => {
  return useQuery<Job[], Error>({
    queryKey: ["bookmarkedJobs"],
    queryFn: getBookmarkedJobs,
  });
};

// Custom hook to check if a specific job is bookmarked
export const useIsBookmarked = (jobId: string) => {
  return useQuery<boolean, Error>({
    queryKey: ["isBookmarked", jobId],
    queryFn: () => isJobBookmarked(jobId),
    enabled: !!jobId,
  });
};

// Custom hook to add/remove bookmark
export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (job: Job) => {
      const storedBookmarks = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      let bookmarks: Job[] = storedBookmarks ? JSON.parse(storedBookmarks) : [];

      // Check if job is already bookmarked
      const isBookmarked = bookmarks.some((item) => item.job_id === job.job_id);

      if (isBookmarked) {
        // Remove from bookmarks
        bookmarks = bookmarks.filter((item) => item.job_id !== job.job_id);
        Alert.alert("Removed", "Job removed from bookmarks");
      } else {
        // Add to bookmarks
        bookmarks.push(job);
        Alert.alert("Bookmarked", "Job saved to bookmarks");
      }

      await AsyncStorage.setItem(
        BOOKMARKS_STORAGE_KEY,
        JSON.stringify(bookmarks)
      );
      return { job, isBookmarked: !isBookmarked };
    },
    onSuccess: (result) => {
      // Invalidate and refetch bookmarks queries
      queryClient.invalidateQueries({ queryKey: ["bookmarkedJobs"] });
      queryClient.invalidateQueries({
        queryKey: ["isBookmarked", result.job.job_id],
      });
    },
  });
};

// Custom hook to delete all bookmarks
export const useDeleteAllBookmarks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await AsyncStorage.removeItem(BOOKMARKS_STORAGE_KEY);
    },
    onSuccess: () => {
      // Invalidate and refetch bookmarks query
      queryClient.invalidateQueries({ queryKey: ["bookmarkedJobs"] });
      // Also invalidate all 'isBookmarked' queries since they all change to false
      queryClient.invalidateQueries({ queryKey: ["isBookmarked"] });
    },
  });
};

// Custom hook to remove a specific bookmark
export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const storedBookmarks = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (!storedBookmarks) return;

      const bookmarks: Job[] = JSON.parse(storedBookmarks);
      const updatedBookmarks = bookmarks.filter((job) => job.job_id !== jobId);

      await AsyncStorage.setItem(
        BOOKMARKS_STORAGE_KEY,
        JSON.stringify(updatedBookmarks)
      );
      return jobId;
    },
    onSuccess: (jobId) => {
      // Invalidate and refetch bookmarks queries
      queryClient.invalidateQueries({ queryKey: ["bookmarkedJobs"] });
      queryClient.invalidateQueries({ queryKey: ["isBookmarked", jobId] });
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { Job } from "@/components/JobBox";

const API_KEY = process.env.RAPID_API_KEY || "your_api_key_here";

// Function to fetch jobs from the API
const fetchJobs = async (query = "Product Designer"): Promise<Job[]> => {
  try {
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
        query
      )}&num_pages=1`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid response format");
    }

    return data.data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    throw error;
  }
};

// Custom hook to fetch jobs
export const useJobs = (query?: string, options = { enabled: true }) => {
  return useQuery<Job[], Error>({
    queryKey: ["jobs", query],
    queryFn: () => fetchJobs(query),
    enabled: options.enabled,
  });
};

// Custom hook to fetch a specific job by ID
export const useJob = (jobId: string) => {
  return useQuery<Job, Error>({
    queryKey: ["job", jobId],
    queryFn: async () => {
      const jobs = await fetchJobs();
      const job = jobs.find((j) => j.job_id === jobId);
      if (!job) {
        throw new Error("Job not found");
      }
      return job;
    },
    enabled: !!jobId,
  });
};

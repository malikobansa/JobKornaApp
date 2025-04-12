import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import tw from "@/lib/tailwind";
import JobBox, { Job } from "@/components/JobBox";
import {
  useBookmarkedJobs,
  useDeleteAllBookmarks,
  useRemoveBookmark,
} from "@/hooks/useBookmarks";

export default function BookmarksTab() {
  const { data: bookmarkedJobs = [], isLoading, error } = useBookmarkedJobs();
  const deleteAllMutation = useDeleteAllBookmarks();
  const removeBookmarkMutation = useRemoveBookmark();
  const router = useRouter();

  const deleteAllBookmarks = () => {
    Alert.alert(
      "Delete All Bookmarks",
      "Are you sure you want to delete all your bookmarked jobs?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteAllMutation.mutate(),
          style: "destructive",
        },
      ]
    );
  };

  const removeBookmark = (jobId: string) => {
    removeBookmarkMutation.mutate(jobId);
  };

  const renderJobItem = ({ item }: { item: Job }) => (
    <View style={tw`mb-4`}>
      <JobBox job={item} />
      <TouchableOpacity
        style={tw`bg-error self-end px-3 py-1 rounded-md mt-1`}
        onPress={() => removeBookmark(item.job_id)}
      >
        <Text style={tw`text-white text-xs`}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View
        style={tw`flex-row items-center justify-between p-4 border-b border-grayBorder`}
      >
        <View />
        <Text style={tw`text-xl text-primaryBlue font-bold`}>Saved Jobs</Text>
        <TouchableOpacity
          onPress={deleteAllBookmarks}
          disabled={bookmarkedJobs.length === 0 || deleteAllMutation.isPending}
        >
          <Text
            style={tw`${
              bookmarkedJobs.length === 0 ? "text-gray-400" : "text-warning"
            } text-xs`}
          >
            Delete all
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : error ? (
        <View style={tw`flex-1 justify-center items-center p-6`}>
          <Text style={tw`text-error text-lg mb-2`}>Something went wrong</Text>
          <Text style={tw`text-center text-gray-500`}>
            {error instanceof Error
              ? error.message
              : "Failed to load bookmarks"}
          </Text>
        </View>
      ) : (
        <View style={tw`flex flex-col justify-center items-center`}>
          <View style={tw`flex flex-col justify-center items-center gap-5`}>
            <Text style={tw`text-base font-bold font-OpenSans`}>
              No saved jobs
            </Text>
            <Text style={tw`text-xs font-normal font-OpenSans`}>
              You don't have any jobs saved, please find it in search to save
              jobs
            </Text>
          </View>
          <Image
            source={require("@/assets/images/no-savings.svg")}
            contentFit="contain"
            style={tw`w-[220px] h-[208px] mt-[54px] mb-[100px]`}
          />
          <TouchableOpacity
            onPress={() => router.push("/(main)/home")}
            style={tw`bg-primaryBlue px-16 py-4 rounded-md`}
          >
            <Text style={tw`text-white text-sm font-bold font-OpenSans`}>
              FIND A JOB
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

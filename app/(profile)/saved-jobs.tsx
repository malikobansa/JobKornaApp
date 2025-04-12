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
import { FontAwesome } from "@expo/vector-icons";
import tw from "@/lib/tailwind";
import JobBox from "@/components/JobBox";
import {
  useBookmarkedJobs,
  useDeleteAllBookmarks,
  useRemoveBookmark,
} from "@/hooks/useBookmarks";

export default function SavedJobsScreen() {
  const router = useRouter();
  const { data: bookmarkedJobs = [], isLoading, error } = useBookmarkedJobs();
  const deleteAllMutation = useDeleteAllBookmarks();
  const removeBookmarkMutation = useRemoveBookmark();

  const handleDeleteAll = () => {
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

  const handleRemoveBookmark = (jobId: string) => {
    removeBookmarkMutation.mutate(jobId);
  };

  const renderJobItem = ({ item }) => (
    <View style={tw`mb-4`}>
      <JobBox job={item} />
      <TouchableOpacity
        style={tw`bg-error self-end px-3 py-1 rounded-md mt-1`}
        onPress={() => handleRemoveBookmark(item.job_id)}
      >
        <Text style={tw`text-white text-xs`}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View
        style={tw`flex-row items-center justify-between p-4 border-b border-grayBorder`}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-primaryBlue`}>Saved Jobs</Text>
        <TouchableOpacity
          onPress={handleDeleteAll}
          disabled={bookmarkedJobs.length === 0 || deleteAllMutation.isPending}
        >
          <Text
            style={tw`${
              bookmarkedJobs.length === 0 ? "text-gray-400" : "text-error"
            } text-xs`}
          >
            {deleteAllMutation.isPending ? "Deleting..." : "Clear All"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
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
        <FlatList
          data={bookmarkedJobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={tw`p-4`}
          ListEmptyComponent={
            <View style={tw`flex-1 justify-center items-center p-8`}>
              <FontAwesome
                name="bookmark-o"
                size={64}
                color="#ddd"
                style={tw`mb-4`}
              />
              <Text style={tw`text-lg text-grayText text-center mb-2`}>
                No saved jobs yet
              </Text>
              <Text style={tw`text-sm text-grayText text-center mb-6`}>
                Jobs you bookmark will appear here
              </Text>
              <TouchableOpacity
                style={tw`bg-primaryBlue py-3 px-6 rounded-lg`}
                onPress={() => router.push("/home")}
              >
                <Text style={tw`text-white font-bold`}>Browse Jobs</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import tw from "../../../tw";
import Button from "../../../components/Button";

const Upload = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const pickPDFFile = async () => {
    try {
      // Specifically filter for PDF files
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Explicitly select PDF MIME type
        copyToCacheDirectory: true,
      });

      // Check if a file was selected
      if (result.type === "success") {
        // Validate PDF file
        if (result.name.toLowerCase().endsWith(".pdf")) {
          const fileInfo = {
            name: result.name,
            uri: result.uri,
            size: result.size,
            type: result.mimeType,
          };

          // Optional: Check file size (e.g., limit to 10MB)
          if (result.size > 10 * 1024 * 1024) {
            Alert.alert("Error", "PDF file is too large. Max 10MB allowed.");
            return;
          }

          // Optional: Read PDF metadata or first few bytes
          const fileDetails = await FileSystem.getInfoAsync(result.uri);

          setPdfFile(fileInfo);

          // Optional: You might want to process the PDF further
          console.log("PDF File Details:", fileDetails);
        } else {
          Alert.alert("Invalid File", "Please select a PDF file");
        }
      }
    } catch (err) {
      console.error("PDF pick error:", err);
      Alert.alert("Error", "Could not pick PDF file");
    }
  };

  return (
    <ScrollView style={tw`flex-1`}>
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
      {/* Upload CV */}
      <View style={tw`mt-[10px] px-5 w-full`}>
        <Text
          style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
        >
          Upload CV
        </Text>
        <Text style={tw`text-[#524B6B] text-[12px] font-normal`}>
          Add your CV/Resume to apply for a job
        </Text>
        <View style={tw(" p-5 w-full")}>
          <Pressable
            onPress={pickPDFFile}
            style={tw(`
          border
          border-[#524B6B]
          border-dashed
          rounded-[15px] 
          w-full
          ${pdfFile ? "bg-[#F0EEF8] p-[15px]" : "bg-white p-6"}
        `)}
          >
            {!pdfFile && (
              <View style={tw` items-center justify-center gap-[15px]`}>
                <Image
                  source={require("@/assets/images/upload-cv.png")}
                  style={tw`w-6 h-6`}
                />
                <Text style={tw("text-white text-center font-bold")}>
                  Upload CV/Resume
                </Text>
              </View>
            )}
            {pdfFile && (
              <View style={tw`gap-5`}>
                {/* File details */}
                <View style={tw`gap-[15px]`}>
                  <Image
                    source={require("@/assets/images/pdf-icon.png")}
                    style={tw`w-[44px] h-[44px]`}
                  />
                  <View style={tw`gap-[5px]`}>
                    <Text style={tw`text-[#150B3D] text-[12px] font-normal`}>
                      {pdfFile.name}
                    </Text>
                    <Text style={tw`text-[#AAA6B9] text-[12px] font-normal`}>
                      {(pdfFile.size / 1024).toFixed(2)} Kb
                    </Text>
                  </View>
                </View>
                {/* Remove file */}
                <View style={tw`gap-[10px]`}>
                  <Image
                    source={require("@/assets/delete.png")}
                    style={tw`w-6 h-6`}
                  />
                  <Text style={tw`text-[#FC4646] text-[12px] leading-[16px]`}>
                    Remove file
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
        </View>
      </View>
      {/* More Information */}
      <View style={tw`mt-[30px] gap-4`}>
        <Text
          style={tw`text-[#150B3D] font-bold text-[14px] leading-[18.23px]`}
        >
          Additional Information
        </Text>
        <TextInput
          placeholder="Explain why you are the right person for this job"
          style={tw`bg-white p-5 placeholder:text-[12px] placeholder:text-[#AAA6B9] text-[12px] text-[#150B3D] rounded-[20px] w-full h-[201px]`}
        />
      </View>
      {/* Apply Now Btn */}
      <Button style="primary" text="Apply Now" addStyles="mt-[30px] w-full" />
    </ScrollView>
  );
};

export default Upload;

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const Success = () => {
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            justifyContent: "justify-between",
          }}
        >
          {/* Header Section */}
          <View style={styles.text}>
            <Text style={styles.title}>Success</Text>
            <Text style={styles.subTitle}>
              Your password has been updated, please change your password
              regularly to avoid this happening
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("@/assets/images/success.png")}
              style={{ width: 118, height: 93, marginTop: 52 }}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.resetBtn}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  textTransform: "uppercase",
                }}
                onPress={() => router.push("/(auth)/login/login")}
              >
                Continue
              </Text>
            </Pressable>
            <Pressable style={styles.backtologinBtn}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  textTransform: "uppercase",
                }}
                onPress={() => router.push("/(auth)/login/login")}
              >
                Back to Login
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Success;

const styles = StyleSheet.create({
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    textAlign: "center",
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
    maxWidth: 314,
    textAlign: "center",
    marginTop: 11,
  },
  label: {
    fontSize: 20,
    fontWeight: 600,
    color: "#0D0140",
    marginBottom: 10,
    marginTop: 72,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 17,
    marginBottom: 15,
    color: "#0D014099",
    shadowColor: "#99ABC6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 31,
    elevation: 8,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 19,
    alignItems: "center",
    width: "100%",
    marginTop: 94,
  },
  resetBtn: {
    width: 266,
    paddingVertical: 16,
    backgroundColor: "#130160",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  backtologinBtn: {
    width: 266,
    paddingVertical: 16,
    backgroundColor: "#D6CDFE",
    borderRadius: 6,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

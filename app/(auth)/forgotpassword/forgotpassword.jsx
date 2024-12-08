import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
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
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subTitle}>
              To reset your password, you need your email or mobile number that
              can be authenticated
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
              source={require("@/assets/images/forgot-password.png")}
              style={{ width: 118, height: 93, marginTop: 52 }}
            />
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
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
                onPress={() => router.push("/(auth)/check-email/checkEmail")}
              >
                Reset Password
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

export default ForgotPassword;

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
    gap: 29,
    alignItems: "center",
    width: "100%",
    marginTop: 29,
    width: "100%",
  },
  resetBtn: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#130160",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  backtologinBtn: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#D6CDFE",
    borderRadius: 6,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

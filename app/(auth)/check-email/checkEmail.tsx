import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const CheckEmail: React.FC = () => {
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          {/* Header Section */}
          <View style={styles.text}>
            <Text style={styles.title}>Check Your Email</Text>
            <Text style={styles.subTitle}>
              We have sent the reset password to the email address
              brandonelouis@gmail.com
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
              source={require("@/assets/images/check-email.png")}
              style={{ width: 118, height: 93, marginTop: 52 }}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.resetBtn}
              onPress={() => router.push("/(auth)/success/success")}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  textTransform: "uppercase",
                }}
              >
                Open your email
              </Text>
            </Pressable>
            <Pressable
              style={styles.backtologinBtn}
              onPress={() => router.push("/(auth)/login/login")}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  textTransform: "uppercase",
                }}
              >
                Back to Login
              </Text>
            </Pressable>
          </View>
          <Text
            style={{
              fontFamily: "DM Sans",
              fontSize: 12,
              fontWeight: "400",
              width: "100%",
              textAlign: "center",
              marginTop: 30,
            }}
          >
            You haven't received an email yet?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                color: "#FF9228",
              }}
              onPress={() => router.push("/(auth)/signup/signup")}
            >
              Resend email?
            </Text>
          </Text>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default CheckEmail;

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
    fontWeight: "600",
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

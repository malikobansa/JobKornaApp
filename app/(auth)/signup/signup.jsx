import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

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
          }}
        >
          {/* Header Section */}
          <View style={styles.text}>
            <Text style={styles.come}>Create An Account</Text>
            <Text style={styles.log}>Please provide your details</Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            {/* Fullname Input */}
            <View>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Brandone Louis"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            {/* Email Input */}
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            {/* Password Input */}
            <View>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Your Password"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Entypo
                    name={isPasswordVisible ? "eye-with-line" : "eye"}
                    size={24}
                    color="#60778C"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.signupBtn}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  textTransform: "uppercase",
                }}
              >
                Sign Up
              </Text>
            </Pressable>
            <Pressable style={styles.googleBtn}>
              <Image
                source={require("@/assets/images/google-icon.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  textTransform: "uppercase",
                }}
              >
                Sign up with Google
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
              marginTop: 16,
            }}
          >
            You already have an account?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                color: "#FF9228",
              }}
              onPress={() => router.push("/(auth)/login/login")}
            >
              Log in?
            </Text>
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    textAlign: "center",
    width: "100%",
  },
  come: {
    fontSize: 30,
    fontWeight: "bold",
  },
  log: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 11,
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 600,
    color: "#0D0140",
    marginBottom: 10,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 17,
    shadowColor: "#99ABC6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 31,
    elevation: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    color: "#0D014099",
    fontSize: 16,
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 19,
    alignItems: "center",
    width: "100%",
    marginTop: 36,
  },
  signupBtn: {
    width: 266,
    paddingVertical: 16,
    backgroundColor: "#130160",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  googleBtn: {
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

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  Alert,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { account } from "../../../constants/appwrite";
import * as Google from "expo-auth-session/providers/google";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

  // Configure Google Sign-In
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "11314065032-jcudl9tg7t5lfgqqtf6en17i4qt9fakp.apps.googleusercontent.com", // Replace with your Firebase Web Client ID
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleSignIn(id_token);
    }
  }, [response]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      // Create a new user
      await account.create("unique()", email, password);

      // Optionally update preferences with name
      await account.updatePrefs({ name });

      Alert.alert("Success", "Account created successfully!");
      router.push("/(auth)/login/login");
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong.");
    }
  };

  const handleGoogleSignIn = async (idToken) => {
    try {
      // Use idToken to create OAuth2 session
      await account.createOAuth2Session("google", idToken);
      Alert.alert("Success", "Google Login successful!");
      router.push("/(main)/home");
    } catch (error) {
      Alert.alert("Error", error.message || "Google Sign-In failed.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
          }}
        >
          <View>
            <View style={styles.text}>
              <Text style={styles.come}>Create An Account 👋</Text>
              <Text style={styles.log}>Create your account below</Text>
            </View>

            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your Full Name"
                  onChangeText={(text) => setName(text)}
                  value={name}
                  autoCapitalize="none"
                />
              </View>
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your Email"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Your Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
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
            <View style={styles.forgottenPassword}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setChecked(!isChecked)}
              >
                <View style={styles.checkbox}>
                  {isChecked && (
                    <Entypo name="check" size={20} color="#130160" />
                  )}
                </View>
                <Text style={styles.rememberText}>Remember Me</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/forgotpassword/forgotPassword")}
              >
                <Text style={{ color: "#130160", fontSize: 12 }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.signupBtn} onPress={handleSignup}>
                <Text style={styles.signupText}>SIGN UP</Text>
              </Pressable>
              <Pressable
                style={styles.googleBtn}
                onPress={() => promptAsync()}
                disabled={!request}
              >
                <Image
                  source={require("@/assets/images/google-icon.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={styles.googleText}>SIGN UP WITH GOOGLE</Text>
              </Pressable>
            </View>
            <Text style={styles.alreadyHaveAccount}>
              Already have an account?{" "}
              <Text
                style={styles.loginLink}
                onPress={() => router.push("/(auth)/login/login")}
              >
                Log in
              </Text>
            </Text>
          </View>
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
  signupText: {
    color: "#fff",
    fontSize: 17,
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
  googleText: {
    color: "#fff",
  },
});

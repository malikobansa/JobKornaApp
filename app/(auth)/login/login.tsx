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
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
  Alert,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { account } from "../../../constants/appwrite";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

// Configure WebBrowser for authentication
WebBrowser.maybeCompleteAuthSession();

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "11314065032-jcudl9tg7t5lfgqqtf6en17i4qt9fakp.apps.googleusercontent.com",
      redirectUri: AuthSession.makeRedirectUri({
        native: "https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/6755f48e002e21543eea",
      }),
      scopes: ["openid", "profile", "email"],
      responseType: "id_token",
    },
    {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    }
  );

  useEffect(() => {
    if (response?.type === "success" && response.params?.id_token) {
      handleGoogleSignIn(response.params.id_token);
    }
  }, [response]);

  const handleGoogleSignIn = async (idToken: string) => {
    try {
      setLoading(true);
      await account.createOAuth2Session("google", idToken);
      Alert.alert("Success", "Google Login successful!");
      router.push("/(main)/home");
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      Alert.alert("Error", error.message || "Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      // Check if there's an active session
      const currentSession = await account.get();
      if (currentSession) {
        Alert.alert("Info", "You are already logged in.");
        router.push("/(main)/home");
        return;
      }
    } catch (error) {
      // If there's no active session, proceed with login
      console.log("No active session found, proceeding with login...");
    }

    try {
      const session = await account.createEmailPasswordSession(email, password);
      console.log("Login successful:", session);
      router.push("/(main)/home");
    } catch (error: any) {
      console.error("Error during login:", error.message);
      Alert.alert("Error", error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            {/* Header Section */}
            <View style={styles.text}>
              <Text style={styles.come}>Welcome 👋</Text>
              <Text style={styles.log}>Please Enter Your Login Details</Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Email Input */}
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

            {/* Additional Options */}
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
                <Text style={styles.rememberMeText}>Remember Me</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/forgotpassword/forgotPassword")}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
                <Text style={styles.loginBtnText}>
                  {loading ? "Loading..." : "Login"}
                </Text>
              </Pressable>
              <Pressable
                style={styles.googleBtn}
                onPress={() => promptAsync()}
                disabled={loading}
              >
                <Image
                  source={require("@/assets/images/google-icon.png")}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleBtnText}>Sign in with Google</Text>
              </Pressable>
            </View>

            {/* Sign-Up Redirect */}
            <Text style={styles.signupPrompt}>
              You don't have an account yet?{" "}
              <Pressable onPress={() => router.push("/(auth)/signup/signup")}>
                <Text style={styles.signupLink}>Sign up?</Text>
              </Pressable>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  text: {
    alignItems: "center",
    marginTop: 80,
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
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 17,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 17,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  forgottenPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: "#E6E1FF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 12,
    color: "#AAA6B9",
    marginLeft: 8,
  },
  forgotPasswordText: {
    color: "#130160",
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 36,
    alignItems: "center",
  },
  loginBtn: {
    width: 266,
    paddingVertical: 16,
    backgroundColor: "#130160",
    borderRadius: 6,
    alignItems: "center",
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 14,
    textTransform: "uppercase",
  },
  googleBtn: {
    width: 266,
    paddingVertical: 16,
    backgroundColor: "#D6CDFE",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 19,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleBtnText: {
    color: "#fff",
    fontSize: 14,
    textTransform: "uppercase",
  },
  signupPrompt: {
    marginTop: 16,
    textAlign: "center",
  },
  signupLink: {
    color: "#FF9228",
    textDecorationLine: "underline",
  },
});

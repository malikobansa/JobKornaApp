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
  Alert,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { account } from '../../../constants/appwrite';
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session"
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";


// Configure WebBrowser for authentication
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: "11314065032-jcudl9tg7t5lfgqqtf6en17i4qt9fakp.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({
      native: "com.jobkorna://oauthredirect",
    }),
    scopes: ["openid", "profile", "email"],
    responseType: "token",
  });

  console.log(AuthSession);



  React.useEffect(() => {
    if (response?.type === "success") {
      handleGoogleSignIn(response.params.access_token);
    }
  }, [response]);

  const handleGoogleSignIn = async (accessToken) => {
    try {
      const session = await account.createOAuth2Session("google", accessToken);
      Alert.alert("Success", "Google Login successful!", session);
      router.push("/(main)/home");
    } catch (error) {
      Alert.alert("Error", error.message || "Google Sign-In failed.");
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
      const session = await account.get(email, password);
      console.log('Login successful:', session);
      router.push('/(main)/home')
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Error', error.message || 'Login failed');
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
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#AAA6B9",
                  }}
                >
                  Remember Me
                </Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => router.push('/forgotpassword/forgotPassword')}>
                <Text style={{ color: "#130160", fontSize: 12 }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.loginBtn} onPress={handleLogin}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    textTransform: "uppercase",
                  }}
                >
                  {loading ? "Loading..." : "Login"}
                </Text>
              </Pressable>
              <Pressable
                style={styles.googleBtn}
                onPress={handleGoogleSignIn}
                disabled={!request}
              >
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
                  Sign in with Google
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
              You don't have an account yet?{" "}
              <Pressable onPress={() => router.push("/(auth)/signup/signup")}>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    color: "#FF9228",
                  }}
                >
                  Sign up?
                </Text>
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
  // Add styles here as in the original code
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    textAlign: "center",
    width: "100%",
  },
  come: {
    fontSize: 30,
    fontWeight: "bold",
  },
  log: {
    fontSize: 20,
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
  forgottenPassword: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: "#E6E1FF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#99ABC6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 31,
    elevation: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 19,
    alignItems: "center",
    width: "100%",
    marginTop: 36,
  },
  loginBtn: {
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

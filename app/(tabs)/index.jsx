import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Text style={styles.text}>JobKorna</Text>
      <Image style={styles.img} source={require("@/assets/images/job.png")} />
      <View>
        <Text style={styles.line}>
          Find Your <Text style={styles.underline}>Dream Job</Text> Here!
        </Text>
        <Text style={styles.sub}>
          Explore all the most exciting job roles based on your interest and
          study major.
        </Text>
        <Pressable
          style={styles.icon}
          onPress={() => router.push("/(auth)/login/login")}
        >
          <AntDesign
            name="caretright"
            size={50}
            color="black"
            style={styles.con}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  text: {
    marginTop: 50,
    marginLeft: 200,
    fontSize: 30,
    fontWeight: "bold",
    color: "darkblue",
  },
  img: {
    alignItems: "center",
    marginLeft: 50,
    width: 300,
    height: 400,
  },
  underline: {
    color: "blue",
    textDecorationLine: "underline",
  },
  line: {
    fontSize: 40,
    width: 200,
    marginLeft: 20,
  },
  sub: {
    marginLeft: 20,
    fontSize: 15,
  },
  icon: {
    backgroundColor: "blue",
    width: 70,
    height: 70,
    marginLeft: 300,
    borderRadius: 50,
  },
  con: {
    paddingTop: 10,
    paddingLeft: 10,
    color: "#fff",
  },
});

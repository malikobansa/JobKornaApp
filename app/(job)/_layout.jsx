import React from "react";
import { View, SafeAreaView, Image } from "react-native";
import { useRouter } from "expo-router";
import tw from "../../tw";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`bg-[#F9F9F9] pt-[30px] pb-[36px] flex-1`}>
        <View style={tw`px-5 justify-between items-center w-full`}>
          <Pressable onPress={() => router.back}>
            <Image
              source={require("@/assets/images/back-btn.png")}
              style={tw`w-6 h-6`}
            />
          </Pressable>
          <Pressable>
            <Image
              source={require("@/assets/images/options.png")}
              style={tw`w-6 h-6`}
            />
          </Pressable>
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Layout;

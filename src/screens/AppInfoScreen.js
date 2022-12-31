import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AppInfoScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={{
          height: 40,
          width: 40,
          borderWidth: 1,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
          position: "absolute",
          top: 60,
          left: 10,
        }}
      >
        <Image
          source={require("../assets/icons8-back-90.png")}
          style={{ height: 25, width: 25, tintColor: "#fff" }}
        />
      </TouchableOpacity>
      <Image
        source={require("../assets/logo.png")}
        style={{ tintColor: "#000", height: 60, width: 120, zIndex: 999 }}
      />
      <Text
        style={{
          marginVertical: 20,
          fontSize: 18,
          fontWeight: "600",
          zIndex: 999,
        }}
      >
        v 1.0.a
      </Text>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 40,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Developer </Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            Sudhanshu Panthri
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Stack Used</Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            React Native Expo and Firebase
          </Text>
        </View>
      </View>
      <Image
        source={require("../assets/space.png")}
        style={{
          zIndex: -90,
          height: 350,
          width: 300,
          position: "absolute",
          //   top: "40%",
          top: 0,
          left: 0,
        }}
      />
    </SafeAreaView>
  );
};

export default AppInfoScreen;

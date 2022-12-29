import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chat from "../components/Chat";

const ChatScreen = ({ navigation }) => {
  const route = useRoute();
  // const {} = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons8-back-90.png")}
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
        <Image
          // source={route.params.image}
          source={require("../assets/chizuru.jpg")}
          style={{
            height: 35,
            width: 35,
            borderWidth: 1,
            borderRadius: 50,
            marginHorizontal: 15,
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          {route.params.user.contactName || route.params.user.displayName}
        </Text>
      </View>
      <View style={styles.content}>
        <Chat />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    height: "8%",
  },
  content: {
    height: "92%",
  },
});

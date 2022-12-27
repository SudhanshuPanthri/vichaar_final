import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const ChatScreen = () => {
  const route = useRoute();
  const {} = route.params;
  return (
    <View>
      <Text>chat screen</Text>
    </View>
  );
};

export default ChatScreen;

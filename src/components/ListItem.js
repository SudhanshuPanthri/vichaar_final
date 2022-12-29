import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ListItem = ({ type, description, user, time, room, image }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatScreen", { user, room, image })}
      style={styles.parent}
    >
      <View
        style={{
          height: "100%",
          width: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={
            user.photoURL
              ? { uri: user.photoURL }
              : require("../assets/user.png")
          }
          style={{ height: "60%", width: "70%", borderRadius: 50 }}
          resizeMode="cover"
        />
      </View>
      <View style={{ height: "100%", width: "85%", marginLeft: 5 }}>
        <View style={{ height: "60%", justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {user.contactName || user.displayName}
          </Text>
        </View>
        <View style={{ height: "30%", justifyContent: "center" }}>
          {description && <Text>{description}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  parent: {
    padding: 5,
    height: 80,
    flexDirection: "row",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

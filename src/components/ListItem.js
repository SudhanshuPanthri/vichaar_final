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
      {type == "chat" ? (
        <>
          <View
            style={{
              height: "100%",
              width: "15%",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Image
              source={image ? { uri: image } : require("../assets/user.png")}
              style={{
                height: "50%",
                width: "70%",
                borderRadius: 50,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={{ height: "100%", width: "60%", marginLeft: 5 }}>
            <View style={{ height: "60%", justifyContent: "center" }}>
              <Text style={{ fontSize: 18, color: "#fff" }}>
                {user.contactName || user.displayName}
              </Text>
            </View>
            <View style={{ height: "30%", justifyContent: "center" }}>
              {description && (
                <Text style={{ fontSize: 16, color: "#fff" }}>
                  {description}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              height: "100%",
              width: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13, color: "#fff" }}>
              {new Date(time.seconds * 1000).toLocaleDateString()}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              height: "100%",
              width: "15%",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Image
              source={
                user.photoURL
                  ? { uri: user.photoURL }
                  : require("../assets/user.png")
              }
              style={{
                height: "60%",
                width: "80%",
                borderRadius: 50,
              }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              // borderWidth: 1,
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {user.contactName || user.displayName}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  parent: {
    // padding: 5,
    height: 80,
    flexDirection: "row",
    // backgroundColor: "#E7E6E1",
    backgroundColor: "#1B2430",
    borderRadius: 12,
    marginVertical: 5,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

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
          {/* <View
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
          </View> */}
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              backgroundColor: "#000",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                textTransform: "capitalize",
              }}
            >
              {user.contactName.charAt(0)}
            </Text>
          </View>
          <View style={{ height: "100%", width: "60%", marginLeft: 5 }}>
            <View style={{ height: "60%", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {user.contactName || user.displayName}
              </Text>
            </View>
            <View style={{ height: "30%", justifyContent: "center" }}>
              {description && (
                <Text style={{ fontSize: 16 }}>{description}</Text>
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
            <Text style={{ fontSize: 13 }}>
              {new Date(time.seconds * 1000).toLocaleDateString()}
            </Text>
          </View>
        </>
      ) : (
        <>
          {/* <View
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
          </View> */}
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              backgroundColor: "#000",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                textTransform: "capitalize",
              }}
            >
              {user.contactName.charAt(0)}
            </Text>
          </View>
          <View
            style={{
              // borderWidth: 1,
              width: "80%",
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
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
    height: 90,
    flexDirection: "row",
    backgroundColor: "#E7E6E1",
    // backgroundColor: "#F7F7F7",
    // borderWidth: 2,
    // borderColor: "#1B2430",
    borderRadius: 12,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

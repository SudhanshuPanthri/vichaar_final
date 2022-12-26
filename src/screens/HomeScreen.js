import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";
// import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import GlobalContext from "../context/Context";

const HomeScreen = ({ navigation }) => {
  const { currentUser } = auth;
  const { rooms, setRooms } = useContext(GlobalContext);
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs
        .filter((doc) => doc.data().lastMessage)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .paticipants.find((p) => p.email !== currentUser.email),
        }));
      setRooms(parsedChats);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.headerContainer}>
        <View style={{ height: 90, width: 90 }}>
          <Image
            source={require("../assets/chizuru.jpg")}
            style={{ height: "100%", width: "100%", borderRadius: 50 }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            Hello, {currentUser.displayName}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          right: 30,
          borderWidth: 1,
          borderRadius: 50,
          padding: 5,
          backgroundColor: "#000",
        }}
        onPress={() => navigation.navigate("ContactScreen")}
      >
        <Image
          source={require("../assets/contact.png")}
          style={{ tintColor: "#fff" }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  headerContainer: {
    borderWidth: 1,
    flex: 0.16,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { useEffect, useContext } from "react";
import { ImageBackground, LogBox } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { auth, db } from "../firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import GlobalContext from "../context/Context";
import ListItem from "../components/ListItem";
import useContacts from "../hooks/useHooks";

const HomeScreen = ({ navigation }) => {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();
  LogBox.ignoreAllLogs();
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );
  // console.log(currentUser);
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut().then(() => {
        navigation.replace("SignInScreen");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.parent}>
      {/* <ImageBackground
       source={require("../assets/chatBg.jpg")}
      style={{ flex: 1 }}
    > */}
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <View style={styles.headerContainer}>
        <View style={{ height: 90, width: 90 }}>
          <Image
            source={
              currentUser.photoURL
                ? { uri: currentUser.photoURL }
                : require("../assets/chizuru.jpg")
            }
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
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 15,
            top: 10,
            height: 45,
            width: 45,
            backgroundColor: "#000",
            borderRadius: 50,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleSignOut}
        >
          <Image
            source={require("../assets/signout.png")}
            style={{ height: "85%", width: "85%", tintColor: "#fff" }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        {rooms.map((room) => (
          <ListItem
            type="chat"
            description={room.lastMessage.text}
            key={room.id}
            room={room}
            time={room.lastMessage.createdAt}
            user={getUserB(room.userB, contacts)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          right: 15,
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
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    // flex: 0.16,
    marginTop: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

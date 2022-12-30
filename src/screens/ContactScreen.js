import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "../components/ListItem";
import GlobalContext from "../context/Context";
import useContacts from "../hooks/useHooks";
import { db } from "../firebase/config";
import { useRoute } from "@react-navigation/native";

const ContactScreen = ({ navigation }) => {
  const contacts = useContacts();
  const route = useRoute();
  const image = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ width: "40%" }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../assets/icons8-back-90.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Contacts</Text>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={contacts}
          keyExtractor={(_, i) => i}
          renderItem={({ item }) => (
            <ContactPreview contact={item} image={image} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

function ContactPreview({ contact, image }) {
  const { unfilteredRooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("email", "==", contact.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data;
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <ListItem
      type="contacts"
      user={user}
      image={image}
      room={unfilteredRooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    />
  );
}

export default ContactScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 10,
    // justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    marginVertical: 5,
    padding: 10,
  },
});

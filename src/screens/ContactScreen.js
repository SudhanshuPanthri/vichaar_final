import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useContacts from "../hooks/useHooks";

const ContactScreen = ({ navigation }) => {
  const contacts = useContacts();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons8-back-90.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
        <Text>Contacts</Text>
        <Text>abcd</Text>
      </View>
      <Text>{JSON.stringify(contacts)}</Text>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

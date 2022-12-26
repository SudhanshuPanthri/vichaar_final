import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { signIn } from "../firebase/config";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password).then(() => {
      if (!auth.name) {
        navigation.replace("ProfileScreen");
      } else {
        navigation.replace("HomeScreen");
      }
      console.log("user logged in");
    });
  };

  return (
    <KeyboardAvoidingView style={styles.parent}>
      {/* <StatusBar translucent backgroundColor={"transparent"} /> */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={{ height: 40, width: 80, tintColor: "black" }}
        />
      </View>
      {/*{spinner && <ActivityIndicator size="large" />}*/}
      <View>
        <Image
          source={require("../assets/martina-people-communicate-in-a-group-chat.png")}
          style={{ height: 280, width: 280 }}
        />
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.input}>
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="black"
            style={{
              color: "black",
              // fontWeight: '500',
              fontSize: 16,
            }}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="black"
            style={{
              color: "#000",
              // fontWeight: '500',
              fontSize: 16,
            }}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 15,
          marginTop: 20,
          width: "85%",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
        onPress={() => handleLogin()}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 15,
          marginTop: 20,
          width: "85%",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    zIndex: 100,
    top: 70,
    // padding: 20,
    left: 30,
    width: "100%",
  },
  inputWrapper: {
    width: "85%",
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

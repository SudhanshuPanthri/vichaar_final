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
import { signUp } from "../firebase/config";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Password doesn't match");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(() => {
          console.log("user created");
          navigation.replace("ProfileScreen");
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.parent}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={{ height: 40, width: 80, tintColor: "black" }}
        />
      </View>
      <View>
        <Image
          source={require("../assets/martina-man-in-a-browser-window.png")}
          style={{ height: 180, width: 180, marginTop: 40 }}
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
              color: "black",
              // fontWeight: '500',
              fontSize: 16,
            }}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="black"
            style={{
              color: "black",
              // fontWeight: '500',
              fontSize: 16,
            }}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
            value={confirmPassword}
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
        onPress={() => handleSignup()}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
          Sign Up
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
        onPress={() => navigation.navigate("SignInScreen")}
      >
        <Text style={{ color: "whitesmoke", fontSize: 16, fontWeight: "500" }}>
          Login
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#fff",
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

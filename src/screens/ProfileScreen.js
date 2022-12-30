import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { auth, db, storage } from "../firebase/config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

  const pickImage = async () => {
    let result = ImagePicker.launchCameraAsync();
    return result;
  };

  const askForPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
  };

  //function to pick user image from camera

  const handleProfileImage = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(selectedImage);
    }
  };

  const handlePress = async () => {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const userData = {
      displayName,
      email: user.email,
      // photoURL,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.replace("HomeScreen");
  };

  //function to upload Image to the database

  const uploadImage = async (uri, path, fName) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const filename = fName || nanoid();
    const imageRef = ref(storage, `${path}/${filename}.jpeg`);
    const snapshot = await uploadBytes(imageRef, blob, {
      contentType: "image/jpeg",
    });

    blob.close();
    const url = await getDownloadURL(snapshot.ref);
    return { url, filename };
  };

  // if (!permissionStatus) {
  //   return <Text>Loading..</Text>;
  // }

  // if (permissionStatus !== "granted") {
  //   return <Text>Please Enabled This Permission to select an image</Text>;
  // }

  useEffect(() => {
    async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            marginVertical: 10,
            // letterSpacing: 0.6,
          }}
        >
          Profile Info
        </Text>
        <Text style={{ marginBottom: 20 }}>
          Please provide your name and an optional profile picture
        </Text>
      </View>
      <TouchableOpacity
        style={{
          marginVertical: 20,
          // borderColor: "#128C7E",
          height: 100,
          width: 100,
        }}
        onPress={handleProfileImage}
      >
        {!selectedImage ? (
          <Image
            source={require("../assets/catpfp.png")}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 50,
              borderWidth: 5,
            }}
          />
        ) : (
          <Image
            source={{ uri: selectedImage }}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 50,
              borderWidth: 5,
            }}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          marginVertical: 20,
          width: "60%",
        }}
      >
        <TextInput
          placeholder="Enter Your Name"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            padding: 10,
            borderBottomColor: "#128C7E",
            borderBottomWidth: 1,
            width: "100%",
          }}
        />
      </View>
      <View style={{ width: "35%" }}>
        <Button
          title="Next"
          onPress={handlePress}
          disabled={!displayName}
          style={{ padding: 10 }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

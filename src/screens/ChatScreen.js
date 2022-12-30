//@refresh reset
import { useRoute } from "@react-navigation/native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth, db, storage } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  Actions,
  GiftedChat,
  InputToolbar,
  Bubble,
} from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const randomId = nanoid();
const ChatScreen = ({ navigation }) => {
  const [roomHash, setRoomHash] = useState();
  const [messages, setMessages] = useState([]);
  const { currentUser } = auth;
  const route = useRoute();
  const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };
  const roomId = room ? room.id : randomId;
  const roomRef = doc(db, "rooms", roomId);
  const roomMessageRef = collection(db, "rooms", roomId, "messages");

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || "",
          email: userB.email,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const emailHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(emailHash);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessageRef, (querySnapshot) => {
      const messagesRef = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesRef);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function onSend(messages = []) {
    const writes = messages.map((m) => addDoc(roomMessageRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
  }

  const pickImage = async () => {
    let result = ImagePicker.launchCameraAsync();
    return result;
  };

  //function to pick user image from camera

  const handlePhotPicker = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      await sendImage(result.assets[0].uri);
      console.log(selectedImage);
    }
  };

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

  async function sendImage(uri, roomPath) {
    const { url, filename } = await uploadImage(
      uri,
      `images/room/${roomPath || roomHash}`
    );
    const message = {
      _id: filename,
      text: "",
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };
    const lastMessage = { ...message, text: "Image" };
    await Promise.all([
      addDoc(roomMessageRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image
            source={require("../assets/icons8-back-90.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
        <Image
          // source={route.params.image}
          source={
            route.params.image
              ? { uri: route.params.image }
              : require("../assets/chizuru.jpg")
          }
          style={{
            height: 40,
            width: 40,
            borderWidth: 1,
            borderRadius: 50,
            marginHorizontal: 15,
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          {route.params.user.contactName || route.params.user.displayName}
        </Text>
      </View>
      <GiftedChat
        onSend={(text) => onSend(text)}
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        renderActions={(props) => (
          <Actions
            {...props}
            containerStyle={{
              position: "absolute",
              right: 50,
              bottom: 5,
              zIndex: 999,
            }}
            icon={() => (
              <TouchableOpacity onPress={handlePhotPicker}>
                <Image source={require("../assets/camera.png")} />
              </TouchableOpacity>
            )}
          />
        )}
        timeTextStyle={{ right: { color: "#fff" } }}
        renderSend={(props) => {
          const { text, messageIdGenerator, user, onSend } = props;
          return (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 40,
                marginBottom: 9,
              }}
              onPress={() => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                      user,
                      _id: messageIdGenerator(),
                    },
                    true
                  );
                }
              }}
            >
              <Image source={require("../assets/send.png")} />
            </TouchableOpacity>
          );
        }}
        // renderInputToolbar={(props) => {
        //   <InputToolbar
        //     {...props}
        //     containerStyle={
        //       {
        //         // marginHorizontal: 10,
        //         // marginBottom: 2,
        //         // borderRadius: 12,
        //         // paddingTop: 5,
        //       }
        //     }
        //   />;
        // }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: { color: "white" },
                left: { color: "black" },
              }}
              wrapperStyle={{
                left: { backgroundColor: "#F8F1F1", padding: 5 },
                right: { padding: 5 },
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    // height: "8%",
  },
  content: {
    // height: "92%",
    // zIndex: 10,
  },
});

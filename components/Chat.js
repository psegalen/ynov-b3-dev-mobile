import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard
} from "react-native";
import * as firebase from "firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

const Chat = props => {
  const room = props.navigation.getParam("room", {});

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [token, setToken] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardListener1, setKeyboadListener1] = useState(null);
  const [keyboardListener2, setKeyboadListener2] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(fbToken => {
        if (token !== fbToken) {
          console.log("New user token : ", fbToken);
          setToken(fbToken);
        }
      });
  }

  const getMessages = roomId => {
    const db = firebase.firestore();
    db.collection("rooms")
      .doc(roomId)
      .onSnapshot(doc => {
        const messages = [];
        doc.data().messages.forEach(message => {
          messages.push(message);
        });
        setMessages(messages);
        if (
          doc
            .data()
            .subscribedUsers.indexOf(firebase.auth().currentUser.uid) !== -1
        ) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      });
  };

  const sendMessage = () => {
    if (message.length === 0) Alert.alert("Empty message !");
    else {
      setIsSending(true);
      // use API!
      fetch("https://europe-west1-ynovb3web.cloudfunctions.net/postMessage", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          FirebaseToken: token
        },
        body: JSON.stringify({
          text: message,
          roomId: room.id
        })
      })
        .then(response => {
          response.json().then(obj => console.log(obj));
          setMessage("");
          setIsSending(false);
        })
        .catch(error => {
          Alert.alert(error.message);
          console.error(error);
          setIsSending(false);
        });
    }
  };

  const changeSubscription = () => {
    setIsSubscribing(true);
    // Change chat room subscription on the server
    fetch(
      "https://europe-west1-ynovb3web.cloudfunctions.net/changeRoomSubscription",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          FirebaseToken: token
        },
        body: JSON.stringify({
          action: isSubscribed ? "unsubscribe" : "subscribe",
          roomId: room.id
        })
      }
    )
      .then(response => {
        response.json().then(obj => console.log(obj));
        setIsSubscribing(false);
      })
      .catch(error => {
        console.error(error);
        setIsSubscribing(false);
      });
  };

  if (room.id !== currentRoomId) {
    getMessages(room.id);
    setCurrentRoomId(room.id);
  }

  if (keyboardListener1 === null) {
    setKeyboadListener1(
      Keyboard.addListener("keyboardDidShow", evt => {
        setKeyboardHeight(Math.round(evt.endCoordinates.height));
      })
    );
  }

  if (keyboardListener2 === null) {
    setKeyboadListener2(
      Keyboard.addListener("keyboardDidHide", evt => {
        setKeyboardHeight(0);
      })
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 20, marginBottom: 16 }}>{item.text}</Text>
        )}
        keyExtractor={item => item.time.toString()}
        contentContainerStyle={{ padding: 16 }}
        style={{ flex: 1 }}
      />
      <View
        style={{
          padding: 16,
          paddingBottom: 16 + keyboardHeight,
          flexDirection: "row"
        }}
      >
        {isSubscribing ? (
          <ActivityIndicator color="#000" />
        ) : (
          <TouchableOpacity onPress={changeSubscription}>
            <MaterialCommunityIcons
              name={isSubscribed ? "bell-ring" : "bell-off"}
              size={30}
              color="#000"
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={{ flex: 1, borderWidth: 1, marginHorizontal: 16 }}
          value={message}
          onChangeText={text => setMessage(text)}
        />
        {isSending ? (
          <ActivityIndicator color="#000" />
        ) : (
          <TouchableOpacity onPress={sendMessage}>
            <MaterialCommunityIcons name="send" size={30} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Chat;

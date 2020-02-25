import React from "react";
import { View, Text } from "react-native";

const Chat = props => {
  const room = props.navigation.getParam("room", {});
  return (
    <View>
      <Text style={{ fontSize: 24, textAlign: "center" }}>
        Room {room.name}
      </Text>
    </View>
  );
};

export default Chat;

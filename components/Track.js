import React from "react";
import { View, Text } from "react-native";

const Track = props => {
  const track = props.navigation.getParam("track", {});
  return (
    <View>
      <Text>Track:</Text>
      <Text>{track.title}</Text>
    </View>
  );
};

export default Track;

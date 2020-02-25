import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ListItem = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
  >
    <Text style={{ fontSize: 24, flex: 1 }}>{props.item.name}</Text>
    <Text style={{ fontSize: 16 }}>({props.item.nbMessages} messages)</Text>
  </TouchableOpacity>
);

export default ListItem;

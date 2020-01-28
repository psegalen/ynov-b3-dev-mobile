import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ListItem = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Text style={{ fontSize: 32 }}>{props.item.title}</Text>
  </TouchableOpacity>
);

export default ListItem;

import React from "react";
import { View, Text } from "react-native";

const ListItem = props => (
  <View>
    <Text style={{ fontSize: 32 }}>{props.item.title}</Text>
  </View>
);

export default ListItem;

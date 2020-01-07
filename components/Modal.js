import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Modal extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <MaterialCommunityIcons
              name="close"
              size={45}
              color="white"
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Modal</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    top: 40,
    right: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    padding: 8
  },
  text: {
    color: "white",
    fontSize: 34
  }
});

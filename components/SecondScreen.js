import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class SecondScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Second screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

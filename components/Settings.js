import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings</Text>
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

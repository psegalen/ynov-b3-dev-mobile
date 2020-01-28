import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import * as firebase from "firebase";

export default class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings</Text>
        <TouchableOpacity
          onPress={() => {
            firebase.auth().signOut();
            AsyncStorage.removeItem("userId");
            this.props.navigation.navigate("Login");
          }}
        >
          <Text style={styles.text}>Sign out</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    marginBottom: 32
  }
});

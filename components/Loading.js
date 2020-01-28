import React from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";

export default class Loading extends React.Component {
  componentDidMount() {
    // Check if user is signed in
    AsyncStorage.getItem("userId").then(value => {
      console.log(value);
      if (value) {
        this.props.navigation.navigate("TabNav");
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color="#000" size="large" />
      </View>
    );
  }
}

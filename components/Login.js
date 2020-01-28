import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Alert
} from "react-native";
import * as firebase from "firebase";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignup: false,
      email: "",
      password: ""
    };
  }

  tryLogin() {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      Alert.alert("Fill both the inputs please");
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(args => {
        console.log(args);
      })
      .catch(error => Alert.alert("Error", error.message));
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 32 }}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>Sign in</Text>
        <TextInput
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          placeholder="Email"
          style={{ paddingVertical: 16, marginVertical: 16, fontSize: 20 }}
        />
        <TextInput
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          placeholder="Password"
          secureTextEntry
          style={{ paddingVertical: 16, marginVertical: 16, fontSize: 20 }}
        />
        <Button onPress={this.tryLogin.bind(this)} title="Sign in!" />
      </View>
    );
  }
}

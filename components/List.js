import React from "react";
import { FlatList, TextInput, View, Button, Alert, Text } from "react-native";
import * as firebase from "firebase";
import ListItem from "./ListItem";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.getChatRooms();
  }

  getChatRooms() {
    this.setState({ isLoading: true });
    // Get chat rooms
    fetch("https://europe-west1-ynovb3web.cloudfunctions.net/getRooms")
      .then(response => response.json())
      .then(result => this.setState({ rooms: result.rooms, isLoading: false }));
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.rooms}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  room: item,
                  title: item.name
                })
              }
            />
          )}
          keyExtractor={item => item.id.toString()}
          onRefresh={this.getChatRooms.bind(this)}
          refreshing={this.state.isLoading}
        />
      </View>
    );
  }
}

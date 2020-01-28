import React from "react";
import { FlatList, TextInput, View, Button, Alert } from "react-native";
import ListItem from "./ListItem";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: "",
      isLoading: false
    };
  }

  searchDeezer() {
    if (this.state.search.length === 0) {
      Alert.alert("Erreur", "Le nom est vide !");
    } else {
      this.setState({ isLoading: true });
      fetch(`https://api.deezer.com/search?q=${this.state.search}`)
        .then(response => response.json())
        .then(result => {
          console.log("Got results : ", result);
          this.setState({ data: result.data, isLoading: false });
        })
        .catch(error => console.error(error));
    }
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Search Deezer"
            value={this.state.search}
            onChangeText={text => this.setState({ search: text })}
          />
          <Button onPress={this.searchDeezer.bind(this)} title="Go !" />
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={item => item.id.toString()}
          onRefresh={this.searchDeezer.bind(this)}
          refreshing={this.state.isLoading}
        />
      </View>
    );
  }
}

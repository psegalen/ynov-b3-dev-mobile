import React from "react";
import { FlatList, TextInput, View, Button, Alert, Text } from "react-native";
import * as firebase from "firebase";
import ListItem from "./ListItem";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: "",
      isLoading: false,
      showLatest: false,
      latest: ["eminem", "skrillex"]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const userId = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.setState({
              latest: doc
                .data()
                .latest.reverse()
                .slice(0, 5)
            });
          }
        });
    }, 1000);
  }

  goButtonPressed() {
    if (this.state.search.length === 0) {
      Alert.alert("Erreur", "Le nom est vide !");
    } else {
      this.searchDeezer(this.state.search);
    }
  }

  searchDeezer(search) {
    if (this.input) this.input.blur();
    this.setState({ isLoading: true });
    fetch(`https://api.deezer.com/search?q=${search}`)
      .then(response => response.json())
      .then(result => {
        this.setState({ data: result.data, isLoading: false });
      })
      .catch(error => console.error(error));

    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then(doc => {
        let data = { latest: [] };
        if (doc.exists) data = doc.data();
        const newData = {
          ...data,
          latest: [...data.latest, search]
        };
        firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .set(newData);
        this.setState({
          latest: newData.latest.reverse().slice(0, 5)
        });
      });
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: "row", padding: 16 }}>
          <TextInput
            style={{ flex: 1, borderColor: "#000", borderWidth: 1, padding: 4 }}
            placeholder="Search Deezer"
            value={this.state.search}
            onChangeText={text => this.setState({ search: text })}
            onFocus={() => this.setState({ showLatest: true })}
            onBlur={() => this.setState({ showLatest: false })}
            ref={reference => {
              this.input = reference;
            }}
          />
          <Button onPress={this.goButtonPressed.bind(this)} title="Go !" />
        </View>
        {this.state.showLatest && this.state.latest.length > 0 ? (
          <View>
            {this.state.latest.map(s => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ search: s });
                  this.searchDeezer(s);
                }}
              >
                <Text style={{ fontSize: 16, padding: 8 }}>> {s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          undefined
        )}
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPress={() =>
                this.props.navigation.navigate("Track", { track: item })
              }
            />
          )}
          keyExtractor={item => item.id.toString()}
          onRefresh={this.searchDeezer.bind(this)}
          refreshing={this.state.isLoading}
        />
      </View>
    );
  }
}

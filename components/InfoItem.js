import React from "react";
import { View, Text } from "react-native";

export default class InfoItem extends React.Component {
  render() {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            padding: 8
          },
          this.props.lastOne
            ? {}
            : {
                borderBottomColor: "white",
                borderBottomWidth: 1
              }
        ]}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            paddingRight: 8
          }}
        >
          {this.props.title}
        </Text>
        <Text
          style={{
            color: "white"
          }}
        >
          {this.props.info}
        </Text>
      </View>
    );
  }
}

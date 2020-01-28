import * as React from "react";
import Weather from "./components/Weather";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SecondScreen from "./components/SecondScreen";
import Settings from "./components/Settings";
import Modal from "./components/Modal";
import List from "./components/List";
import Track from "./components/Track";

const StackNav = createStackNavigator({
  List: {
    screen: List
  },
  Track: {
    screen: Track
  }
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings
  }
});

const TabNav = createBottomTabNavigator({
  Home: {
    screen: StackNav,
    navigationOptions: {
      title: "Weather",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="home" size={30} color={tintColor} />
      )
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="settings" size={30} color={tintColor} />
      )
    }
  }
});

const AppStack = createStackNavigator(
  {
    Root: {
      screen: TabNav
    },
    Modal: {
      screen: Modal
    }
  },
  {
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(AppStack);

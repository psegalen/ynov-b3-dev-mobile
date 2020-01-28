import * as React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Settings from "./components/Settings";
import Modal from "./components/Modal";
import List from "./components/List";
import Track from "./components/Track";
import Login from "./components/Login";
import Loading from "./components/Loading";
import * as firebase from "firebase";
import "@firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCOIPwEh7rEvK0gcPF_jFY5NJ-KXR2S_-g",
  authDomain: "ynovb3web.firebaseapp.com",
  databaseURL: "https://ynovb3web.firebaseio.com",
  projectId: "ynovb3web",
  storageBucket: "ynovb3web.appspot.com",
  messagingSenderId: "204878557723",
  appId: "1:204878557723:web:97e6406780dd91124bbebe",
  measurementId: "G-BD4TXR2SW7"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

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
      title: "Search",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="magnify" size={30} color={tintColor} />
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

const SwitchNav = createSwitchNavigator({
  Loading,
  Login,
  TabNav
});

const AppStack = createStackNavigator(
  {
    Root: {
      screen: SwitchNav
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

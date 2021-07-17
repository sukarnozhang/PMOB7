import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoggedInTabStack from "./components/LoggedInTabStack";
import { createStackNavigator } from "@react-navigation/stack";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInSignUp from "./screens/SignInSignUpScreen";

//import Logged In from "./components/LoggedInTabStack";
//import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import store from "./redux/configureStore";
import {StatusBar} from "expo-status-bar";


const Stack = createStackNavigator();
function App() {

  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);

  return(
    <NavigationContainer>
      <StatusBar style={isDark? "light" : "dark"}/>
      <Stack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName={token != null? "Logged In" : "SignInSignUp"}
        animationEnabled={false}>
          <Stack.Screen component={SignInSignUp} name="SignInSignUp"/>
          <Stack.Screen component={LoggedInTabStack} name="Logged In"/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//export default function App() {
/*
function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  //const auth = useSelector((state) => state.auth);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
    
      setSignedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
          mode="modal"
          headerMode="none"
          initialRouteName={signedIn ? "LoggedIn" : "SignInSignUp"}
          //initialRouteName={signedIn != null ? "Logged In" : "SignInSignUp"}
          animationEnabled={false}>
          <Stack.Screen component={LoggedInTabStack} name="LoggedIn" />
        <Stack.Screen component={SignInSignUpScreen} name="SignInSignUp" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
*/

import React, { useState, useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, Text, View, Switch, Animated, TouchableWithoutFeedback } from "react-native";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, API_WHOAMI } from "../constants/API";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../redux/ducks/blogAuth";
import {  changeModeAction } from '../redux/ducks/accountPref';

export default function AccountScreen({ navigation }) {

  const [username, setUsername] = useState(null);

  //const styles = { ...commonStyles, ...lightStyles };
  const token = useSelector((state) => state.auth.token)

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const profilePicture = useSelector((state) => state.accountPrefs.profilePicture);
  const dispatch = useDispatch();

  const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles };
  
  const picSize = new Animated.Value(0);
  const sizeInterpolation = {
    inputRange: [0, 0.5, 1],
    outputRange: [200, 300, 200]
  }  

  function changePicSize() {
    Animated.loop(
      Animated.timing(picSize, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false
      }),
    ).start()
  }

  async function getUsername() {
    console.log("---- Getting user name ----");
    //const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signOut();
          navigation.navigate("SignInSignUp")
        }
      } else {
        console.log(error);
      }
      // We should probably go back to the login screen???
    }
  }

  function signOut() {
    //AsyncStorage.removeItem("token");
    dispatch(logOutAction())
    navigation.navigate("SignInSignUp");
  }

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();
    return removeListener;
  }, []);

  function switchMode() {
    //dispatch(isDark ? lightModeAction() : darkModeAction())
    dispatch(changeModeAction())
    console.log(isDark)
  }
  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();
    return removeListener;
  }, []);

  return (
    /*
    <View style={[styles.container, { alignItems: "center" }]}>
      <Text style={{marginTop: 20}}>
        Account Screen
      </Text>
      <Text>
        {username}
      </Text>
    </View>

    <Image source={{ uri: profilePicture }} />
    */
    //<View style={[styles.container, { alignItems: "center" }]}>
    //<Text style={[styles.title, styles.text, { marginTop: 30 }]}> Hello {username} !</Text>
    
    //<Image source={{ uri: profilePicture }} />
    
    <View style={[styles.container, { alignItems: "center" }]}>
      <Text style={[styles.title, styles.text, { margin: 30 }]}> Hello {username} !</Text>
      <View style={{height: profilePicture == null ? 0 : 320, justifyContent: "center"}}>
        {profilePicture == null ? <View /> :
          <TouchableWithoutFeedback onPress={changePicSize}>
            <Animated.Image
              style={{
                width: picSize.interpolate(sizeInterpolation),
                height: picSize.interpolate(sizeInterpolation),
                borderRadius: 200
              }}
              source={{ uri: profilePicture?.uri }} />
          </TouchableWithoutFeedback>
        }
      </View>
    

    <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}> No profile picture. Click to take one. </Text>
        </TouchableOpacity>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 20}}>
      <Text style={[styles.content, styles.text]}> Dark Mode? </Text>
      <Switch
        value={isDark}
        onChange={switchMode}/>
    </View>
    <TouchableOpacity style={[styles.button]} onPress={signOut}>
      <Text style={styles.buttonText}>
        Sign Out
      </Text>
      </TouchableOpacity>
  </View>

  );
}

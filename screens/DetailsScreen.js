import React, { useState, useEffect } from "react";

import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
  Switch,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
//import { commonStyles, lightStyles } from "../styles/commonStyles";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";

import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import { useDispatch, useSelector } from "react-redux";

export default function ShowScreen({ navigation, route }) {
  const [post, setPost] = useState({ title: "", content: "", date1:"" });
  //const styles = {...lightStyles, ...commonStyles};  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const isDark = useSelector((state) => state.accountPrefs.isDark);

  const token = useSelector((state) => state.auth.token);

  const profilePicture = useSelector(
    (state) => state.accountPrefs.profilePicture
  );
  const dispatch = useDispatch();

  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const picSize = new Animated.Value(0);
  const sizeInterpolation = {
    inputRange: [0, 0.5, 1],
    outputRange: [200, 300, 200],
  };

  function changePicSize() {
    Animated.loop(
      Animated.timing(picSize, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      })
    ).start();
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={editPost} style={{ marginRight: 10 }}>
          <FontAwesome
            name="pencil-square-o"
            size={30}
            color={styles.headerTint}
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    //const token = await AsyncStorage.getItem("token");
    const id = route.params.id;
    console.log(id);
    try {
      const response = await axios.get(API + API_POSTS + "/" + id, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      setPost(response.data);
    } catch (error) {
      console.log(error.response.data);
      if ((error.response.data.error = "Invalid token")) {
        navigation.navigate("SignInSignUp");
      }
    }
  }

  function editPost() {
    navigation.navigate("Edit", { post: post });
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text, { margin: 40 }]}>
        {post.title}
      </Text>
      <Text style={[styles.content, styles.text, { margin: 20 }]}>
        Priority :
        {post.content}
      </Text>
      <Text style={[styles.content, styles.text, { margin: 20 }]}>
        Due By :
        {post.dateTask}
      </Text>
      <View
        style={{
          height: profilePicture == null ? 0 : 320,
          justifyContent: "center",
        }}
      >
        {profilePicture == null ? (
          <View />
        ) : (
          <TouchableWithoutFeedback onPress={changePicSize}>
            <Animated.Image
              style={{
                width: picSize.interpolate(sizeInterpolation),
                height: picSize.interpolate(sizeInterpolation),
                borderRadius: 200,
              }}
              source={{ uri: profilePicture?.uri }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}>
   
        </Text>
      </TouchableOpacity>
    </View>
  );
}

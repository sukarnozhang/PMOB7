import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { API, API_CREATE } from "../constants/API";
//import AsyncStorage from "@react-native-async-storage/async-storage";

import { commonStyles,lightStyles, darkStyles } from '../styles/commonStyles';
import { useDispatch, useSelector } from "react-redux";

export default function CreateScreen({ navigation }) {

  //const styles = { ...lightStyles, ...commonStyles }
  const isDark = useSelector((state) => state.accountPrefs.isDark);

  const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles };
  const token = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


    async function savePost() {
      const post = {
        "title": title,
        "content": content, 
      }
      //const token = await AsyncStorage.getItem("token");
      try {
        console.log(token);
        const response = await axios.post(API + API_CREATE, post, {
          headers: { Authorization: `JWT ${token}` }
        });
        console.log(response.data)
        navigation.navigate("Index", { post: post })
      } catch (error) {
        console.log(error)
      }
    }


  


  return (
    <View style={styles.container}>
      <Text>
        Create Post Screen
      </Text>
      <View style={{ margin: 20 }}>
        <Text style={[additionalStyles.label, styles.text]}>Enter Title:</Text>
        <TextInput
          style={additionalStyles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>Enter Content:</Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={text => setContent(text)}
        />
      <TouchableOpacity style={[styles.button, {marginTop: 20}]} onPress={savePost}>
        <Text style={styles.buttonText}>
          Save
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5
  }
});
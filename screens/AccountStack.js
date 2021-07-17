import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "./AccountScreen";
import CameraScreen from './CameraScreen';
//import { lightStyles } from '../styles/commonStyles';
import { commonStyles,lightStyles, darkStyles } from '../styles/commonStyles';
import { useDispatch, useSelector } from "react-redux";

const Stack = createStackNavigator();


export default function AccountStack() {

  //const styles = lightStyles;
  //const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles };

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  console.log(isDark)
  const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles };

  return (
  <Stack.Navigator>
    <Stack.Screen component={AccountScreen} name="Account" options={{
        title: "Your Account",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
      }} />
      <Stack.Screen component={CameraScreen} name="Camera" options={{
        title: "Take a photo",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: styles.headerTint
      }}/>
  </Stack.Navigator>
  )
}

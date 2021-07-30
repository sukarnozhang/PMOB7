import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './IndexScreen';
import CreateScreen from './CreateScreen';
import EditScreen from './EditScreen';
import ShowScreen from './DetailsScreen';
import { commonStyles,lightStyles, darkStyles } from '../styles/commonStyles';
import { lightModeAction, darkModeAction, changeModeAction } from '../redux/ducks/accountPref';
import { useDispatch, useSelector } from "react-redux";

const InnerStack = createStackNavigator();


export default function BlogStack() {
  
  //const styles = lightStyles
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  
  const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles };
  const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: styles.headerTint
  }

  
  //const profilePicture = useSelector((state) => state.accountPrefs.profilePicture);
  //const dispatch = useDispatch();

  //function switchMode() {
    //dispatch(isDark ? lightModeAction() : darkModeAction())
    //dispatch(changeModeAction())
  //}

  return (
    <InnerStack.Navigator>
      <InnerStack.Screen name="Index" component={IndexScreen} options={{ title: "Blog", ...headerOptions }} />
      <InnerStack.Screen name="Add" component={CreateScreen} options={{ title: "Add Post", ...headerOptions }} />
      <InnerStack.Screen name="Details" component={ShowScreen} options={headerOptions} />
      <InnerStack.Screen name="Edit" component={EditScreen} options={{ title: "Edit Task", ...headerOptions }} />
    </InnerStack.Navigator>
  )
}
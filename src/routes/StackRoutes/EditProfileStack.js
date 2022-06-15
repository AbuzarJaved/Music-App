import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';


import Edit_Profile from '../../screens/EditProfile/EditProfile'
import React from 'react';

const Stack = createStackNavigator();

const Edit_Profile_Stack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false}}
    >
      <Stack.Screen name="Edit" component={Edit_Profile} />
    </Stack.Navigator>
  );
};

export default Edit_Profile_Stack;

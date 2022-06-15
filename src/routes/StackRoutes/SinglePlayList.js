import {createStackNavigator} from '@react-navigation/stack';
import SinglePlayList from '../../screens/Library/SinglePlayList';
import React from 'react';

const Stack = createStackNavigator();

const SinglePlayListStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen
        name="MainSinglePlayList"
        component={SinglePlayList}
      />
    </Stack.Navigator>
  );
};

export default SinglePlayListStack;

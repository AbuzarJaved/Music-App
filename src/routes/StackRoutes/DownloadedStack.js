import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';


import DownloadedScreen from '../../screens/Downloaded/Downloaded'

const Stack = createStackNavigator();

const DownloadedStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      >
      <Stack.Screen name="Downloaded" component={DownloadedScreen} />
    </Stack.Navigator>
  );
};

export default DownloadedStack;

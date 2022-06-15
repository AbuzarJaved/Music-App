import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import MiniPlayer from '../../screens/Big_Player/Big_Player'
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const MiniPlayerStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Mini_Players" component={MiniPlayer} />
    </Stack.Navigator>
  );
};

export default MiniPlayerStack;

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import FavoriteScreen from '../../screens/FavoriteScreen/Favorite';
import HistoryScreen from '../../screens/ListeningHistory/History'

const Stack = createStackNavigator();

const HistoryStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false}}
      mode={'modal'}>
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export default HistoryStack;

import {createStackNavigator} from '@react-navigation/stack';
import DiscoveredSongs from '../../screens/DiscoveredSongs/DiscoveredSongs';
import React from 'react';

const Stack = createStackNavigator();

const DiscoveredSongsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="MainDiscoveredSongs" component={DiscoveredSongs} />
    </Stack.Navigator>
  );
};

export default DiscoveredSongsStack;

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import PlaylistFormScreen from '../../screens/Playlist/subScreens/PlaylistForm/PlaylistForm';


const Stack = createStackNavigator();

const PlaylistFormStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      >
      <Stack.Screen name="PlaylistForm" component={PlaylistFormScreen} />
    </Stack.Navigator>
  );
};

export default PlaylistFormStack;

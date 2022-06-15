import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import CreatePlaylistScreen from '../../screens/Playlist/subScreens/CreatePlaylist/CreatePlaylist'


const Stack = createStackNavigator();

const CreatePlaylistStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false}}
      >
      <Stack.Screen name="CreatePlaylist" component={CreatePlaylistScreen} />
    </Stack.Navigator>
  );
};

export default CreatePlaylistStack;

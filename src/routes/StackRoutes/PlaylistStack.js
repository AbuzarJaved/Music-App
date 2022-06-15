import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import PlaylistScreen from '../../screens/Playlist/Playlist';
import CreatePlaylist from '../StackRoutes/CreatePlaylistStack';
import CreatePlaylistForm from '../StackRoutes/CreatePlaylistForm';
import MorePlaylist from '../StackRoutes/MorePlaylistStack';

const Stack = createStackNavigator();

const PlaylistStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainPlaylist" component={PlaylistScreen} />
    </Stack.Navigator>
  );
};

export default PlaylistStack;

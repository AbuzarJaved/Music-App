import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import MorePlaylistScreen from '../../screens/Playlist/subScreens/MoreScreens/MorePlaylist';
import AlbumScreen from '../../screens/AlbumScreen/AlbumScreen';

const Stack = createStackNavigator();

const MorePlaylistStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      >
      <Stack.Screen name="MorePlaylist" component={MorePlaylistScreen} />
    </Stack.Navigator>
  );
};

export default MorePlaylistStack;

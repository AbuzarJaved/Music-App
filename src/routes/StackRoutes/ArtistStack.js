import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import FavoriteScreen from '../../screens/FavoriteScreen/Favorite';
import ArtistScreen from '../../screens/Artists/Artists';

const Stack = createStackNavigator();

const ArtistStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainArtist" component={ArtistScreen} />
    </Stack.Navigator>
  );
};

export default ArtistStack;

import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import React from 'react';
import SearchScreen from '../../screens/Search/SearchScreen/SearchScreen';
import SearchScreenHeader from '../../screens/Search/SearchScreen/SearchScreenHeader';
import Big_Player_Stack from '../../routes/StackRoutes/MiniPlayerStack';
import NowPlayingScreen from '../../screens/NowPlaying/NowPlayingScreen'
import {useNavigationState} from '@react-navigation/native';


const Stack = createStackNavigator();

const NowPlayingStack = () => {
    // navigation.setOptions({tarBarVisible: false})
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Now_Playing" component={NowPlayingScreen} />
    </Stack.Navigator>
  );
};

export default NowPlayingStack;



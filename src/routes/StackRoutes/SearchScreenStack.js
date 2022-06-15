import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
// import SearchScreen from '../../screens/Search/MainSearchScreen';
import SearchScreen from '../../screens/Search/SearchScreen/SearchScreen';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserSearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;

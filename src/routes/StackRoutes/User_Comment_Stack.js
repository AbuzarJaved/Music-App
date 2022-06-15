import {createStackNavigator} from '@react-navigation/stack';
import Trending from '../../screens/Trending/Trending';
import React from 'react';
import User_Comment_Screen from '../../screens/Comment/User_Comment';

const Stack = createStackNavigator();

const TrendingStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Comment" component={User_Comment_Screen} />
    </Stack.Navigator>
  );
};

export default TrendingStack;

import {createStackNavigator} from '@react-navigation/stack';
import Detail from '../../screens/Details/Details';
import React from 'react';

const Stack = createStackNavigator();

const DetailStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default DetailStack;

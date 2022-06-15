import {createStackNavigator} from '@react-navigation/stack';
import Expansion from '../../screens/Expansion/Expansion';
import React from 'react';

const Stack = createStackNavigator();

const ExpansionStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainExpansion" component={Expansion} />
    </Stack.Navigator>
  );
};

export default ExpansionStack;

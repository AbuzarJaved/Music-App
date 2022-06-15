import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';

import PremiumScreen from '../../screens/Premium/Premium'

const Stack = createStackNavigator();

const PremiumStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Premium" component={PremiumScreen} />
    </Stack.Navigator>
  );
};

export default PremiumStack;

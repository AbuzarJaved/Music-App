import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Support_Napollo from '../../screens/Support_Napollo/Support_Napollo';

const Stack = createStackNavigator();

const Support_Napollo_Stack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      >
      <Stack.Screen name="Main Support Napollo" component={Support_Napollo} />
    </Stack.Navigator>
  );
};

export default Support_Napollo_Stack;

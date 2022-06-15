import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';
import MessageScreen from '../../screens/Message/MessageScreen';

const Stack = createStackNavigator();

const MessageStack = () => {
  return (
    <Stack.Navigator
      
      screenOptions={{
        headerShown:false
        
      }}>
      <Stack.Screen name="Messages" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export default MessageStack;

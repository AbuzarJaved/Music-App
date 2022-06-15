import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Notification from '../../screens/Notifications/Notification';
import React from 'react';

const Stack = createStackNavigator();

const OnBoardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoarding" component={Notification} />
    </Stack.Navigator>
  );
};

export default OnBoardingStack;

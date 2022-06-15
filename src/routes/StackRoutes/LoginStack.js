import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import EnterYourEmail from '../../screens/Login/ForgetPasswordScreens/EnterYourMailScreen';
import EnterOTP from '../../screens/Login/ForgetPasswordScreens/EnterOTP';
import ResetPassword from '../../screens/Login/ForgetPasswordScreens/ResetPassword';
import LoginScreen from '../../screens/Login/LoginScreen';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="UserLogin" component={LoginScreen} />
      <Stack.Screen name="Enteryourmail" component={EnterYourEmail} />
      <Stack.Screen name="EnterOTP" component={EnterOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default LoginStack;

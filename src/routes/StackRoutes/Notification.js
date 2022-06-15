import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Notification from '../../screens/Notifications/Notification';
import React from 'react';
import Header from '../../Components/CustomHeader/HeaderDrawerBtn';

import CustomHeader from '../../screens/Notifications/component/CustomHeader';


const Stack = createStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default NotificationStack;

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';


import Trim_Upload from '../../../../screens/Upload/SubScreen/Trim_Upload'
import React from 'react';

const Stack = createStackNavigator();

const Trim_Upload_Stack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false}}
      // mode={'modal'}
      // screenOptions={{
      //   gestureEnabled: true,
      //   gestureDirection: 'vertical',
      //   ...TransitionPresets.FadeFromBottomAndroid,
      // }}
    >
      <Stack.Screen name="MainTrim_Upload" component={Trim_Upload} />
    </Stack.Navigator>
  );
};

export default Trim_Upload_Stack;

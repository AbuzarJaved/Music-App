import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';


import Upload_Success_Screen from '../../../../screens/Upload/SubScreen/Upload_Success'
import React from 'react';

const Stack = createStackNavigator();

const Upload_Success_Stack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      // mode={'modal'}
      // screenOptions={{
      //   gestureEnabled: true,
      //   gestureDirection: 'vertical',
      //   ...TransitionPresets.FadeFromBottomAndroid,
      // }}
    >
      <Stack.Screen name="MainUpload_Success" component={Upload_Success_Screen} />
    </Stack.Navigator>
  );
};

export default Upload_Success_Stack;

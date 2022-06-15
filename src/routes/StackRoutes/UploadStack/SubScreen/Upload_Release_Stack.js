import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Upload_Success_Screen from '../../../../screens/Upload/SubScreen/Upload_Success';
import Upload_Release_Screen from '../../../../screens/Upload/SubScreen/Upload_Release_Screen'
import React from 'react';

const Stack = createStackNavigator();

const Upload_Release_Stack = () => {
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
      <Stack.Screen name="Upload_Release" component={Upload_Release_Screen} />
    </Stack.Navigator>
  );
};

export default Upload_Release_Stack;

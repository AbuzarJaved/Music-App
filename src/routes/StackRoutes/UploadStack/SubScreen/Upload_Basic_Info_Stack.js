import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Upload_Basic_Info_Screen from '../../../../screens/Upload/SubScreen/Upload_Basic_Info_Screen';
import React from 'react';

const Stack = createStackNavigator();

const Upload_Basic_Info_Stack = () => {
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
      <Stack.Screen
        name="MainUpload_Basic_Info"
        component={Upload_Basic_Info_Screen}
      />
    </Stack.Navigator>
  );
};

export default Upload_Basic_Info_Stack;

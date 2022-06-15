import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Upload from '../../../../screens/Upload/SubScreen/Upload1';
import React from 'react';

const Stack = createStackNavigator();

const Upload_1_Stack = () => {
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
      <Stack.Screen name="MainUpload" component={Upload} />
    </Stack.Navigator>
  );
};

export default Upload_1_Stack;


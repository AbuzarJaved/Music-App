import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Upload_Progress from '../../../../screens/Upload/SubScreen/UploadProgressScreen'
import React from 'react';

const Stack = createStackNavigator();

const UploadProgressStack = () => {
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
      <Stack.Screen name="MainUpload_Progress" component={Upload_Progress} />
    </Stack.Navigator>
  );
};

export default UploadProgressStack;

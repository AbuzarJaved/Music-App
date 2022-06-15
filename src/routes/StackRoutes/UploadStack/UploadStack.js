import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';

// STACK SCREENS
import Upload from '../../../screens/Upload/UploadScreen';
import Upload_1_Stack from './SubScreen/Upload_1_Stack'
import Upload_Progress_Stack from './SubScreen/UploadProgressStack'
import Upload_Success_Stack from './SubScreen/Upload_Success_Stack'
import Trim_Upload from './SubScreen/Trim_Upload_Stack'
import Upload_Basic_Info_Stack from './SubScreen/Upload_Basic_Info_Stack'
import Upload_Metadata_Stack from './SubScreen/Upload_Metadata_Stack'
import Upload_Release_Stack from './SubScreen/Upload_Release_Stack'
import Share_Song_Stack from './SubScreen/Share_Screen_Stack'

const Stack = createStackNavigator();

const UploadStack = () => {
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
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="Upload_Next" component={Upload_1_Stack} />
      <Stack.Screen name="Upload_Progress" component={Upload_Progress_Stack} />
      <Stack.Screen name="Upload_Success" component={Upload_Success_Stack} />
      <Stack.Screen name="Trim_Upload" component={Trim_Upload} />
      <Stack.Screen name="Upload_Info" component={Upload_Basic_Info_Stack} />
      <Stack.Screen name="Upload_Metadata" component={Upload_Metadata_Stack} />
      <Stack.Screen name="Upload_Release" component={Upload_Release_Stack} />
      <Stack.Screen name="Upload_Share" component={Share_Song_Stack} />
    </Stack.Navigator>
  );
};

export default UploadStack;

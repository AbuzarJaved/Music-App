import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Trim_Upload from '../../../../screens/Upload/SubScreen/Trim_Upload';
import Upload_Metadata_Screen from '../../../../screens/Upload/SubScreen/Upload_MetaData_Screen'
import React from 'react';

const Stack = createStackNavigator();

const Upload_Metadata_Stack = () => {
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
        name="MainUpload_Metadata"
        component={Upload_Metadata_Screen}
      />
    </Stack.Navigator>
  );
};

export default Upload_Metadata_Stack;

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Share_Song_Screen from '../../../../screens/Upload/SubScreen/Share_Song_Screen';
import React from 'react';

const Stack = createStackNavigator();

const Share_Screen_Stack = () => {
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
      <Stack.Screen name="MainShare_Song" component={Share_Song_Screen} />
    </Stack.Navigator>
  );
};

export default Share_Screen_Stack;

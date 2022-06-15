import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import ReferralScreen from '../../screens/Referral/Referral';

const Stack = createStackNavigator();

const ReferralStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Referral" component={ReferralScreen} />
    </Stack.Navigator>
  );
};

export default ReferralStack;

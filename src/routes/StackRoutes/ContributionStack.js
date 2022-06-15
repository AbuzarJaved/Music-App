import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';
import ContributionScreen from '../../screens/Contributions/ContributionScreen';
import TopTabs from '../TopTabRoutes/TopTabs';

const Stack = createStackNavigator();

const ContributionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Contributions" component={ContributionScreen} />
    </Stack.Navigator>
  );
};

export default ContributionStack;

import {createStackNavigator} from '@react-navigation/stack';
import Discovery from '../../screens/Discovery/Discovery';
import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createStackNavigator();

const DiscoveryStack = ({route,navigation}) => {
  //  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Discovery';
  //   React.useLayoutEffect(() => {
  //     if (routeName === 'Discovery') {
  //       navigation.setOptions({tabBarVisible: false});
  //     } else {
  //       navigation.setOptions({tabBarVisible: true});
  //     }
  //   }, [navigation, routeName]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Discovery"
        component={Discovery}
        options={({navigation}) => {
          return {
            headerShown: false,
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default DiscoveryStack;

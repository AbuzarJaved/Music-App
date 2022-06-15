import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Search from '../../screens/Search/Search';
import React, {useEffect} from 'react';
import SearchScreen from '../../screens/Search/SearchScreen/SearchScreen';
import SearchScreenStack from '../../routes/StackRoutes/SearchScreenStack';
import ExpansionStack from '../../routes/StackRoutes/ExpansionStack';
import Now_Playing from '../../routes/StackRoutes/NowPlayingStack';
import NewReleasesScreen from '../../screens/Search/NewReleasesScreen/index';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ExpansionScreen from '../../screens/Expansion/Expansion';

const Stack = createStackNavigator();

const SearchStack = ({navigation, route}) => {
  //  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Search';
  //   React.useLayoutEffect(() => {
  //     if (routeName === 'Now_Playing' || routeName === 'Expansion') {
  //       navigation.setOptions({tabBarVisible: false});
  //     } else {
  //       navigation.setOptions({tabBarVisible: true});
  //     }
  //   }, [navigation, routeName]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      // screenOptions={{
      //   gestureEnabled: true,
      //   gestureDirection: 'horizontal',
      //   ...TransitionPresets.FadeFromBottomAndroid,
      // }}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchScreen" component={SearchScreenStack} />
      <Stack.Screen name="New_Releases" component={NewReleasesScreen} />
      <Stack.Screen name="Expansion" component={ExpansionScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;

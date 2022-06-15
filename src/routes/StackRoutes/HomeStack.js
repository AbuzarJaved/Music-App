import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Home/Home';
import React from 'react';
import Header from '../../Components/CustomHeader/HeaderWithImage';
import MainTabs from '../BottomTabRoutes/MainBottomTab'

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      
      screenOptions={{gestureEnabled: true, gestureDirection: 'vertical',headerShown:false}}>
      <Stack.Screen
        name="Home"
        component={Home}
        // options={
        //   {headerTransparent: true, }
        // }
        // options={({navigation}) => {
        //   return {
        //     headerTitle: (props) => (
        //       <Header
        //         {...props}
        //         navigation={navigation}
        //         title="Profile"
        //         statusBar="light-content"

        //       />
        //     ),
        //     headerTransparent: true,

        //     // headerStatusBarHeight: 500,
        //   };
        // }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

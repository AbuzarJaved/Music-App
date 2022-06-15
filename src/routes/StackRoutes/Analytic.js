import {createStackNavigator} from '@react-navigation/stack';
import Analytic from '../../screens/Analytics/Analytics';
import React from 'react';
import Header from '../../Components/CustomHeader/HeaderWithBackBtn';

const Stack = createStackNavigator();

const AnalyticStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen
        name="Analytic"
        component={Analytic}
        // options={({navigation}) => {
        //   return {
        //     headerTitle: (props) => (
        //       <Header
        //         {...props}
        //         navigation={navigation}
        //         title="Analytic"
        //         statusBar="light-content"
        //       />
        //     ),
        //     headerTransparent: true,
        //     headerStatusBarHeight: 10,
        //   };
        // }}
      />
    </Stack.Navigator>
  );
};

export default AnalyticStack;

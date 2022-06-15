import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

// Screens
import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile';
import Discovery from '../../screens/Discovery/Discovery';
import Expansion from '../../screens/Expansion/Expansion';
import Details from '../../screens/Details/Details';
import SettingStack from '../../routes/StackRoutes/SettingStack'
// import Profile from '../../screens/Profile/Profile'
import ProfileStack from '../../routes/StackRoutes/Profile'
import Setting from '../../screens/Settings/Settings'

const RootStack = createStackNavigator();

function RootStacks() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="Details" component={Details} />
      <RootStack.Screen name="Profile" component={Profile} />
      <RootStack.Screen name="Expansion" component={Expansion} />
      <RootStack.Screen name="Setting" component={Setting }/>
      {/* <RootStack.Screen name="Discovery" component={Discovery} /> */}
    </RootStack.Navigator>
  );
}

export default RootStacks;

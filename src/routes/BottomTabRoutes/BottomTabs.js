import {createMaterialBottomTabNavigator, } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../StackRoutes/HomeStack';
import DiscoveryStack from '../StackRoutes/Discovery';
import ExpansionStack from '../StackRoutes/ExpansionStack';
import LibraryStack from '../StackRoutes/LibraryStack';
import SearchStack from '../StackRoutes/SearchStack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconIcon from 'react-native-vector-icons/Ionicons';
import NotificationStack from '../StackRoutes/Notification';
import HomeIcon from '../../Components/Icons/HomeIcon';
import NotificationIcon from '../../Components/Icons/NotificationIcon'
import LibraryIcon from '../../Components/Icons/LibraryIcon'
import ExpansionIcon from '../../Components/Icons/ExpansionIcon'
import DiscoverIcon from '../../Components/Icons/DiscoverIcon'
import SearchIcon from '../../Components/Icons/SearchIcon'

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      
      initialRouteName="Expansion"
      activeColor="#f68126"
      // style={{backgroundColor: '#055'}}
      barStyle={{backgroundColor: '#000', height: 60}}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            // <IconIcon name="home" color={color} size={26} />
            <HomeIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            // <IconIcon name="search-sharp" color={color} size={26} />
            <SearchIcon color={ color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={DiscoveryStack}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({color}) => (
            // <Icon name="podcast" color={color} size={26} />
            <DiscoverIcon color={ color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Expansion"
        component={ExpansionStack}
        options={{
          tabBarLabel: 'Expansion',
          tabBarIcon: ({color}) => (
            
            // <NotificationIcon  color={color}/>
            <ExpansionIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryStack}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({color}) => (
          
            <LibraryIcon color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MiniTabPlayer from '../../Components/MiniPlayer/MiniPlayer';
// import MiniTabPlayer from '../../Components/MusicPlayer/MusicPlayer';
// import MusicPlayers from '../../Components/MusicPlayer/MusicPlayer';
import HomeStack from '../StackRoutes/HomeStack';
import DiscoveryStack from '../StackRoutes/Discovery';
import ExpansionStack from '../StackRoutes/ExpansionStack';
import LibraryStack from '../StackRoutes/LibraryStack';
import SearchStack from '../StackRoutes/SearchStack';
import Mini_Player_Stack from '../StackRoutes/MiniPlayerStack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconIcon from 'react-native-vector-icons/Ionicons';
import NotificationStack from '../StackRoutes/Notification';
import HomeIcon from '../../Components/Icons/HomeIcon';
import NotificationIcon from '../../Components/Icons/NotificationIcon';
import LibraryIcon from '../../Components/Icons/LibraryIcon';
import ExpansionIcon from '../../Components/Icons/ExpansionIcon';
import DiscoverIcon from '../../Components/Icons/DiscoverIcon';
import SearchIcon from '../../Components/Icons/SearchIcon';
import HomeScreen from '../../screens/Home/Home';

// const Tab = createMaterialBottomTabNavigator();
const MainTab = createBottomTabNavigator();
// barStyle={{backgroundColor: '#000', height: 60}}

function MyMainTabs() {
  const userLogin = useSelector(state => state.userLogin);
  const {type} = userLogin;
  return (
    <>
      {/* <MusicPlayers/> */}
      <MainTab.Navigator
        tabBar={tabProps => (
          <>
            <MiniTabPlayer {...tabProps} />
            {/* <Mini_Player_Stack/> */}
            <BottomTabBar {...tabProps} />
          </>
        )}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#f68128',
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: '#1A1A1A',
            ...Platform.select({
              ios: {
                paddingTop: 8,
                paddingBottom: 30,
                height: 80,
              },
              android: {
                paddingTop: 15,
                paddingBottom: 3,
                height: 60,
              },
            }),
          },
        }}
        initialRouteName="Home"
        // "MainDiscovery"
        // tabBarOptions={{
        //   activeTintColor: '#f68128',
        //   borderWidth: 0,
        //   style: {
        //     borderTopWidth: 0,
        //     backgroundColor: '#1A1A1A',
        //   },
        //   tabStyle: {
        //     backgroundColor: '#1A1A1A',
        //     paddingTop: 8,
        //     borderTopWidth: 0,
        //     borderTopColor: '#1A1A1A',
        //     ...Platform.select({
        //       ios: {
        //         paddingTop: 8,
        //         paddingBottom: 30,
        //         height: 80,
        //       },
        //       android: {
        //         paddingTop: 8,
        //         paddingBottom: 3,
        //         height: 50,
        //       },
        //     }),
        //     borderWidth: 0,
        //   },
        //   activeBackgroundColor: 'transparent',
        // }}
      >
        <MainTab.Screen
          name="MainHome"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              // <IconIcon name="home" color={color} size={26} />
              <HomeIcon color={color} />
            ),
          }}
        />
        <MainTab.Screen
          name="MainSearch"
          component={SearchStack}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color}) => (
              // <IconIcon name="search-sharp" color={color} size={26} />
              <SearchIcon color={color} />
            ),
          }}
        />
        <MainTab.Screen
          name="MainDiscovery"
          component={DiscoveryStack}
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({color}) => <DiscoverIcon color={color} />,
          }}
        />
        {/* {type === 'ARTIST' ? null : (
          <MainTab.Screen
            name="MainDiscovery"
            component={DiscoveryStack}
            options={{
              tabBarLabel: 'Discover',
              tabBarIcon: ({color}) => (
                <DiscoverIcon color={color} />
              ),
            }}
          />
        )} */}
        <MainTab.Screen
          name="MainNotification"
          component={NotificationStack}
          options={{
            tabBarLabel: 'Notification',
            tabBarIcon: ({color}) => (
              // <NotificationIcon  color={color}/>
              <NotificationIcon color={color} />
            ),
          }}
        />
        <MainTab.Screen
          name="MainLibrary"
          component={LibraryStack}
          options={{
            tabBarLabel: 'Library',
            tabBarIcon: ({color}) => <LibraryIcon color={color} />,
          }}
        />
      </MainTab.Navigator>
    </>
  );
}

export default MyMainTabs;

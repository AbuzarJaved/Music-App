import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Setting from '../../screens/Settings/Settings';
import React from 'react';
import Header from '../../Components/CustomHeader/HeaderWithBackBtn';
import SettingsAccountScreen from '../../screens/Settings/SubScreens/Account/index';
import SettingsDiscoverScreen from '../../screens/Settings/SubScreens/Discover/index';
import SettingsAboutNapolloScreen from '../../screens/Settings/SubScreens/About Napollo/index';
import SettingsNotificationsScreen from '../../screens/Settings/SubScreens/Notification/index';
import HelpLineScreen from '../../screens/Settings/SubScreens/About Napollo/subscreen/index';
import PremiumScreen from '../../screens/Premium/Premium';
import AddSongToAlbum from '../../screens/Settings/SubScreens/AddSongsToAlbum/AddSong';

const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="SettingAccount" component={SettingsAccountScreen} />
      <Stack.Screen name="SettingDiscover" component={SettingsDiscoverScreen} />
      <Stack.Screen
        name="SettingAboutNapollo"
        component={SettingsAboutNapolloScreen}
      />
      <Stack.Screen
        name="SettingNotification"
        component={SettingsNotificationsScreen}
      />
      <Stack.Screen name="HelpLine" component={HelpLineScreen} />
      <Stack.Screen name="Premium" component={PremiumScreen} />
      <Stack.Screen name="AddSongToAlbum" component={AddSongToAlbum} />
    </Stack.Navigator>
  );
};

export default SettingStack;

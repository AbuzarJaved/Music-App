import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Profile from '../../screens/Profile/Profile';
import UploadStack from './UploadStack/UploadStack';
import EditProfileStack from './EditProfileStack';
import React from 'react';
import Header from '../../Components/CustomHeader/HeaderWithBackBtn';
import ArtistAllSongView from '../../screens/Profile/SingleSongsViews/ArtistAllSongsView';
import ListenerAllSongView from '../../screens/Profile/SingleSongsViews/ListenerAllSongsView';
import SingleListenerAllSongView from '../../screens/Profile/SingleSongsViews/SingleListenerAllSongsView';
import SingleArtistAllSongView from '../../screens/Profile/SingleSongsViews/SingleArtistAllSongsView';
import Upload_Basic_Info_Screen from '../../screens/Upload/SubScreen/Upload_Basic_Info_Screen';
import Share_Song_Screen from '../../screens/Upload/SubScreen/Share_Song_Screen';
import UploadScreen from '../../screens/Upload/UploadScreen';
import Trim_Upload from '../../screens/Upload/SubScreen/Trim_Upload';
import AllUserActivities from '../../screens/Profile/AllActivities/AllUserActivities';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      // screenOptions={{
      //   gestureEnabled: true,
      //   gestureDirection: 'vertical',
      //   ...TransitionPresets.FadeFromBottomAndroid,
      // }}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MainProfile"
        component={Profile}
        options={({navigation}) => {
          return {
            headerTitle: props => (
              <Header
                {...props}
                navigation={navigation}
                title="Profile"
                statusBar="light-content"
              />
            ),
            headerTransparent: true,

            headerStatusBarHeight: 10,
          };
        }}
      />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="Upload_Info" component={Upload_Basic_Info_Screen} />
      <Stack.Screen name="Share_Song_Screen" component={Share_Song_Screen} />
      <Stack.Screen name="Trim_Upload_Screen" component={Trim_Upload} />
      <Stack.Screen name="Edit_Profile" component={EditProfileStack} />
      <Stack.Screen name="ArtistAllSongScreen" component={ArtistAllSongView} />
      <Stack.Screen
        name="ListenerAllSongScreen"
        component={ListenerAllSongView}
      />
      <Stack.Screen
        name="SingleListenerAllSongScreen"
        component={SingleListenerAllSongView}
      />
      <Stack.Screen
        name="SingleArtistAllSongScreen"
        component={SingleArtistAllSongView}
      />
      <Stack.Screen name="AllActivities" component={AllUserActivities} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Profile from '../../screens/Profile/SingleArtistProfile';
import UploadStack from './UploadStack/UploadStack';
import EditProfileStack from './EditProfileStack';
import React from 'react';
import Header from '../../Components/CustomHeader/HeaderWithBackBtn';

const Stack = createStackNavigator();

const SingleArtistProfileStack = () => {
  return (
    <Stack.Navigator
      // screenOptions={{
      //   gestureEnabled: true,
      //   gestureDirection: 'vertical',
      //   ...TransitionPresets.FadeFromBottomAndroid,
      // }}
      screenOptions={{ headerShown: false}}>
      <Stack.Screen
        name="Single_Artist_Profile"
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
      {/* <Stack.Screen name="Upload" component={UploadStack} />
      <Stack.Screen name="Edit_Profile" component={EditProfileStack} /> */}
    </Stack.Navigator>
  );
};

export default SingleArtistProfileStack;

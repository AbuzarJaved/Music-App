import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AuthRoute from '../routes/authRoute/index';
import MyTabs from './BottomTabRoutes/BottomTabs';
import MainTabs from './BottomTabRoutes/MainBottomTab';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {loadDataFromStorage} from '../utils/asyncStorage';

import DrawerContent from './DrawerContent';
import {get_Access_Token, clearData} from '../redux/actions/userActions';

// STACK SCREENS
import ProfileStack from '../routes/StackRoutes/Profile';
import SingleArtistProfileStack from '../routes/StackRoutes/SingleArtistProfileStack';
import AnalyticStack from '../routes/StackRoutes/Analytic';
import TrendingStack from '../routes/StackRoutes/TrendingStack';
import NotificationStack from '../routes/StackRoutes/Notification';
import SettingStack from '../routes/StackRoutes/SettingStack';
import ContributionStack from '../routes/StackRoutes/ContributionStack';
import ContributionScreen from '../screens/Contributions/ContributionScreen';
import MessageStack from '../routes/StackRoutes/MessageStack';
import ProfileTab from '../screens/Profile/TabsScreens/Tab';
import MyMainTabs from './BottomTabRoutes/MainBottomTab';
import HomeStack from '../routes/StackRoutes/HomeStack';
import NowPlayingStack from './StackRoutes/NowPlayingStack';
import ExpansionStack from '../routes/StackRoutes/ExpansionStack';
import Comment_Stack from '../routes/StackRoutes/User_Comment_Stack';
import ReferralStack from '../routes/StackRoutes/ReferralStack';
import Support_Napollo_Stack from '../routes/StackRoutes/Support_Napollo_Stack';
import PremiumStack from '../routes/StackRoutes/PremiumStack';
import PaymentStack from '../routes/StackRoutes/PaymentStack';
import CreatePlaylist from './StackRoutes/CreatePlaylistStack';
import CreatePlaylistForm from './StackRoutes/CreatePlaylistForm';
import MorePlaylist from './StackRoutes/MorePlaylistStack';
import TopTab from './TopTabRoutes/TopTabs';
import UploadStack from './StackRoutes/UploadStack/UploadStack';
import SongBottomModal from '../Components/Modal/SongBottomModal';

const RootDrawer = createDrawerNavigator();

const RootRoute = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo, token: userToken, isLoggedIn} = userLogin;
  const [token, setToken] = useState('');
  const [token2, setToken2] = useState(false);

  // useEffect(() => {
  //   try {
  //     dispatch(get_Access_Token());
  //     // dispatch(clearData());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  useEffect(() => {
    loadDataFromStorage('user_token')
      .then((res) => {
        setToken(res);
      })
      .catch((err) => console.log(err));
  }, [token, userToken]);

  return (
    <SafeAreaProvider>
      <>
        {token || userToken ? (
          <>
            <RootDrawer.Navigator
              screenOptions={{headerShown: false}}
              drawerContent={(props) => <DrawerContent {...props} />}
              hideStatusBar={false}
              statusBarAnimation="fade"
              initialRouteName="Home">
              <RootDrawer.Screen name="Home" component={MainTabs} />
              <RootDrawer.Screen name="Profile" component={ProfileStack} />
              <RootDrawer.Screen
                name="Single_Artist_Profile"
                component={SingleArtistProfileStack}
              />
              <RootDrawer.Screen name="Trending" component={TrendingStack} />
              <RootDrawer.Screen name="Analytics" component={AnalyticStack} />
              <RootDrawer.Screen
                name="Notification"
                component={NotificationStack}
              />
              <RootDrawer.Screen name="Settings" component={SettingStack} />
              <RootDrawer.Screen
                name="Contributions"
                component={ContributionStack}
              />
              <RootDrawer.Screen name="Messages" component={MessageStack} />
              <RootDrawer.Screen
                name="Now_Playing"
                component={NowPlayingStack}
              />
              {/* <RootDrawer.Screen name="Expansion" component={ExpansionStack} /> */}
              <RootDrawer.Screen name="Comment" component={Comment_Stack} />
              <RootDrawer.Screen name="Referrals" component={ReferralStack} />
              <RootDrawer.Screen
                name="Support Napollo"
                component={Support_Napollo_Stack}
              />
              {/* <RootDrawer.Screen name="Premium" component={PremiumStack} /> */}
              <RootDrawer.Screen name="Payment" component={PaymentStack} />
              {/* <RootDrawer.Screen name="Upload" component={UploadStack} /> */}
              {/* <RootDrawer.Screen
                name="SongBottomModal"
                component={SongBottomModal}
              /> */}
            </RootDrawer.Navigator>
          </>
        ) : (
          <AuthRoute />
        )}
      </>
    </SafeAreaProvider>
  );
};

export default RootRoute;
{
  /* <RootDrawer.Screen name="Root" component= { RootStack} /> */
}

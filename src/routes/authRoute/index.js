import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveDataToStorage, loadDataFromStorage} from '../../utils/asyncStorage';
// Screens
import LoginScreen from '../../screens/Login/LoginScreen';
import LoginStack from '../StackRoutes/LoginStack'
import ArtistSignInScreen from '../../screens/SignIn/ArtistSignScreen';
import SignInScreen from '../../screens/SignIn/SignInScreen';
import OTPScreen from '../../screens/OTP Screens/EmailOTPScreen';
import OnBoardingScreen from '../../screens/OnBoardingScreen/OnBoarding';
import NetworkError from '../../screens/NetworkErrorScreen.js/NetworkError';
import {get_Access_Token, clearData} from '../../redux/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';

const AuthStack = createStackNavigator();

function AuthStacks() {
  const dispatch = useDispatch();
  const [firstLaunch, setFirstLaunch] = useState(null);
  const getAccessToken = useSelector((state) => state.getAccessToken);
  const customerType = useSelector((state) => state.customerType);
  const {isArtist} = customerType;

  const {error, accessToken} = getAccessToken;

  // useEffect(() => {
  //   try {
  //     dispatch(get_Access_Token());
  //     // dispatch(clearData());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  useEffect(() => {
    loadDataFromStorage('alreadyLaunched').then((val) => {
      if (val === null) {
        saveDataToStorage('alreadyLaunched', true);
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);
  if (firstLaunch === null) {
    return null;
  } else if (firstLaunch === true) {
    return (
      <AuthStack.Navigator
        screenOptions={{ headerShown: false}}>
        <AuthStack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          // options={{animationTypeForReplace: 'push'}}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginStack}
          // options={{animationTypeForReplace: 'push'}}
        />
        <AuthStack.Screen
          name="Artist_SignIn"
          component={ArtistSignInScreen}
          // options={{animationTypeForReplace: 'push'}}
        />
        <AuthStack.Screen name="EmailVerification" component={OTPScreen} />
      </AuthStack.Navigator>
    );
  } else {
    return (
      <AuthStack.Navigator
        screenOptions={{ headerShown: false}}
        >
        <AuthStack.Screen name="Login" component={LoginStack} />
        <AuthStack.Screen
          name="Artist_SignIn"
          component={ArtistSignInScreen}
          // options={{animationTypeForReplace: 'push'}}
        />
        <AuthStack.Screen name="EmailVerification" component={OTPScreen} />
      </AuthStack.Navigator>
    );
  }
}
export default AuthStacks;

import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Icons = ({insta, iconSize, chooseUserInfo, chooseGoogleErr}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isInProgress, setIsInProgress] = useState(false);
  // console.log(userInfo, 'GOOGLE USERINFO');

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      chooseUserInfo(userInfo.user);
      // console.log(userInfo, 'GOOGLE USERINFO FROM DATA');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // console.log('GOOGLE SIGNIN CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // console.log('GOOGLE SIGNIN IN PROGRESS');
        setIsInProgress(true);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        chooseGoogleErr('GOOGLE SIGNIN NOT SUPPORTED');
        // console.log('GOOGLE SIGNIN NOT SUPPORTED');
      } else {
        // some other error happened
        chooseGoogleErr('Unable to login with google.Login manually');
        // console.log('GOOGLE SIGNIN OTHER ERRORS', error);
      }
    }
  };
  // const handleFacebookLogin = () => {
  //   LoginManager.logInWithPermissions(['public_profile', 'email']).then(
  //     function (result) {
  //       if (result.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         console.log(
  //           'Login success with permissions: ' +
  //             result.grantedPermissions.toString(),
  //         );
  //       }
  //     },
  //     function (error) {
  //       console.log('Login fail with error: ' + error);
  //     },
  //   );
  // };
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleFacebookLogin()}>
        <Icon
          name="facebook-f"
          size={!iconSize ? 22 : iconSize}
          color="#0516FF"
          style={styles.icon}
        />
      </TouchableOpacity> */}
      <TouchableOpacity activeOpacity={0.6} onPress={() => signIn()}>
        <Icon
          name="google"
          size={!iconSize ? 22 : iconSize}
          color="#900"
          style={styles.icon}
        />
      </TouchableOpacity>
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              console.log(data.accessToken.toString(), 'FACEBOOK ACCESS');
            });
            ('');
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      /> */}
      {/* <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isInProgress}
      /> */}

      {/* <TouchableOpacity activeOpacity={0.6}>
        <Icon
          name="google"
          size={!iconSize ? 22 : iconSize}
          color="#900"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}>
        <Icon
          name="twitter"
          size={!iconSize ? 22 : iconSize}
          color="#05BBFF"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}>
        <Icon
          name="facebook-f"
          size={!iconSize ? 22 : iconSize}
          color="#0516FF"
          style={styles.icon}
        />
      </TouchableOpacity>
      {insta && (
        <TouchableOpacity activeOpacity={0.6}>
          <Icon
            name="instagram"
            size={!iconSize ? 22 : iconSize}
            color="#fbad50"
            style={styles.icon}
          />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default Icons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    marginHorizontal: 30,
  },
});

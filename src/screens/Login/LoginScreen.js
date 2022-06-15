import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import LoginBtn from '../../Components/Button/LoginBtn';
import Icons from '../../Components/IconsContainer/Icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  login,
  clearData,
  store_User_Coordinates,
  store_User_Location,
} from '../../redux/actions/userActions';
import {clearRegisterError} from '../../redux/actions/artistActions';
import {useSelector, useDispatch} from 'react-redux';
import LoadingAnime from '../../Components/Loading/Loading';
import {CLEAR_USER_LOGIN_ERROR} from '../../redux/constants/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Message from '../../Components/Message/Message';
import ErrorPopUp from '../../Components/Modal/MainErrorPopUp';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import {getUserCallingCode} from '../../utils/loggedInUserType';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const LoginScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientErr, setClientErr] = useState('');
  const [googleErr, setGoogleErr] = useState('');

  const userRegister = useSelector(state => state.userRegister);
  const [userData, setUserData] = useState(false);
  const {message, status} = userRegister;
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const storeUserCoordinates = useSelector(state => state.storeUserCoordinates);
  const {lat, lng} = storeUserCoordinates;
  const {
    city: userCity,
    state,
    countryCode: userCountryCode,
    country: userCountry,
    callingCode,
  } = storeUserLocation;

  const {error, loading, status: userStatus} = userLogin;

  const chooseUserInfo = user => {
    setEmail(user.email);
  };

  useEffect(() => {
    dispatch({
      type: CLEAR_USER_LOGIN_ERROR,
    });
  }, []);

  const onSubmitValues = () => {
    if (email || password) {
      const newEmail = email.trim();
      setClientErr('');
      dispatch(clearData());
      // dispatch(clearRegisterError());
      dispatch(login(newEmail, password, state, userCountry, lat, lng));
      // setUserData(false);

      // actions.resetForm();
    } else {
      setClientErr('Please provide your login details');
    }
    if (userStatus && userStatus === true) {
      setEmail('');
      setPassword('');
    }
    // setUserData(true);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(true);

  const changePage = () => {
    navigation.push('Artist_SignIn');
  };

  const togglePassword = () => {
    setVisible(!visible);
    setShowPassword(!showPassword);
  };
  let userSuccessView = null;
  if (message) {
    userSuccessView = <Message color="success">{message}</Message>;
  }
  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('USER REAL POSITION', position);
        if (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const userPosition = {
            lat,
            lng,
          };
          dispatch(store_User_Coordinates(userPosition));
          Geocoder.geocodePosition(userPosition)
            .then(res => {
              console.log('USER REAL LOCATION', res[0]);
              const callingCode = getUserCallingCode(res[0].countryCode);
              const data = {
                city: res[0].subAdminArea,
                state: res[0].adminArea,
                country: res[0].country,
                countryCode: res[0].countryCode,
                callingCode,
              };
              dispatch(store_User_Location(data));
            })
            .catch(err => console.log(err));
        }
      },
      error => {
        console.log(error.code, error.message, 'ERROR');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    if (storeUserLocation.city === '' || storeUserLocation.country === '')
      if (RESULTS.GRANTED) {
        getUserLocation();
      }
  }, [storeUserLocation.city]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ErrorPopUp
            errorState={error}
            clearError={() => dispatch({type: CLEAR_USER_LOGIN_ERROR})}
            clearTime={1500}>
            {error}
          </ErrorPopUp>
          <ErrorPopUp
            errorState={clientErr}
            clearTime={1500}
            clearError={() => setClientErr('')}>
            {clientErr}
          </ErrorPopUp>
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <Image
            source={require('../../assests/images/Logo2.png')}
            style={{width: 120, height: 120, alignSelf: 'center'}}
          />

          {loading && <LoadingAnime width={70} height={70} />}
          <>
            <View style={{width: '100%'}}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.textInput}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#484848"
                  value={email}
                  onChangeText={val => setEmail(val)}
                  onFocus={() => setClientErr('')}
                  style={{color: '#fff', width: '100%'}}
                />
              </View>
            </View>
            {/* PASSWORD INPUT */}
            <View style={{width: '100%', marginBottom: 10}}>
              <Text style={styles.label}>Password:</Text>
              <View style={styles.textInput}>
                <TextInput
                  placeholder="password"
                  secureTextEntry={visible}
                  placeholderTextColor="#484848"
                  onFocus={() => setClientErr('')}
                  value={password}
                  onChangeText={val => setPassword(val)}
                  textContentType={!showPassword ? 'name' : 'password'}
                  style={{color: '#fff', width: '100%'}}
                />
                {!showPassword ? (
                  <Icon
                    name="eye-slash"
                    size={20}
                    style={styles.inputIcon}
                    onPress={togglePassword}
                  />
                ) : (
                  <Icon
                    name="eye"
                    size={20}
                    style={styles.inputIcon}
                    onPress={togglePassword}
                  />
                )}
              </View>
            </View>
            {/* LOGIN BTN */}
            <View style={{width: '100%', marginTop: '5%'}}>
              <LoginBtn title="Login" onPress={() => onSubmitValues()} />
            </View>
          </>
          <View style={styles.otherContent}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Enteryourmail')}>
              <Text style={styles.forgetText}>Forget Password ?</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              // marginTop: 5,
              alignSelf: 'center',
              width: '100%',
            }}>
            <Text style={styles.or}>OR</Text>
            {/* SOCIAL ICONS */}
            <View style={styles.icons}>
              <Icons
                chooseUserInfo={val => chooseUserInfo(val)}
                chooseGoogleErr={val => setGoogleErr(val)}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            flexDirection: 'row',
            // marginTop: hp('100%') - hp('10%'),
            justifyContent: 'center',
            // position: 'absolute',
            // top: hp('95%'),
            // alignSelf: 'center',
            marginBottom: '5%',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Helvetica-Regular',
              textAlign: 'center',
              fontSize: 13,
              letterSpacing: 0.5,
              marginRight: 5,
            }}>
            Don't have an account ?
          </Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => changePage()}>
            <Text
              style={{
                color: '#f68128',
                fontFamily: 'Helvetica-Bold',
                fontSize: 13,
                letterSpacing: 0.5,
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#000000',
  },
  content: {
    paddingHorizontal: 20,
    // paddingTop: 70,
    width: '100%',
    height: '100%',
    paddingBottom: 20,
    // alignItems: 'center',
    marginTop: '15%',
    // justifyContent: 'center',
    flex: 1,
  },

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  otherContent: {
    width: '100%',
    // bottom: 20,
  },
  textInput: {
    borderColor: '#161616',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    padding: 5,
    fontFamily: 'Helvetica-Regular',
    backgroundColor: '#161616',
    // textTransform: 'uppercase',
    position: 'relative',
    height: 50,
    marginBottom: 10,
  },
  label: {
    color: '#D3D3D3',
    paddingHorizontal: 5,
    marginVertical: 5,
    fontFamily: 'Helvetica-Regular',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  forgetText: {
    color: '#484848',
    textAlign: 'right',
    fontFamily: 'Helvetica-Regular',
    fontSize: 13,
    marginTop: '1%',
  },
  errorText: {
    color: '#900',
    fontSize: 10,
    margin: 3,
    textTransform: 'capitalize',
  },

  inputIcon: {
    position: 'absolute',
    top: 14,
    right: 20,
    color: '#f68126',
  },
  or: {
    color: '#fff',
    marginVertical: '5%',
    textAlign: 'center',
    fontSize: 12,
  },
  icons: {
    width: '100%',
    alignItems: 'center',
  },
});

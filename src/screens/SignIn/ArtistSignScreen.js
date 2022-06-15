import React, {useState, useEffect} from 'react';
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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LoginBtn from '../../Components/Button/LoginBtn';
import Icons from '../../Components/IconsContainer/Icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyDarkView from './component/countrySelector';
import Message from '../../Components/Message/Message';
import {useDispatch, useSelector} from 'react-redux';
import {
  artistRegister,
  clearRegisterError,
} from '../../redux/actions/artistActions';
import {
  register,
  store_User_Coordinates,
  store_User_Location,
  get_Access_Token,
} from '../../redux/actions/userActions';
import {getUserCallingCode} from '../../utils/loggedInUserType';
import {getGenres} from '../../redux/actions/getGenreActions';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  CLEAR_REGISTER_ERROR,
  CLEAR_REGISTER_DATA,
  CLEAR_ACCESS_TOKEN,
} from '../../redux/constants/index';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import LoadingAnime from '../../Components/Loading/Loading';
import NetworkError from '../NetworkErrorScreen.js/NetworkError';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import StepIndicator from './component/StepIndicator';
import ArtsitStep1 from './component/SignUpSteps/ArtsitStep1';
import ArtsitFinalStep from './component/SignUpSteps/ArtistFinalStep';
import GenreModal from '../../Components/Modal/GenreModal';
import Data from 'city-state-country';
import {Country, State} from 'country-state-city';
import ErrorPopup from '../../Components/Modal/MainErrorPopUp';
import SuccessPopUp from '../../Components/Modal/MainSuccessPopUp';
import moment from 'moment';
import CustomDatePicker from './component/DatePickerModal';
import CountrySelectorModal from '../../Components/Modal/CountrySelectorModal';
import ProgressCircle from './component/ProgressCircle';

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';

const SignInScreen = () => {
  const [position, setPosition] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [genres, setGenres] = useState([]);
  const [stageName, setStageName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [countryShortCode, setCountryShortCode] = useState('');
  const [genreModal, setGenreModal] = useState(false);
  const [clientErr, setClientErr] = useState('');
  const [website, setWebsite] = useState('');
  const [genreType, setGenreType] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [dob, setDOB] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [googleErr, setGoogleErr] = useState('');
  const [countryModal, setCountryModal] = useState(false);
  const [fromSignUp, setFromSignUp] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPageChange = () => {
    setPosition(position + 1);
  };
  const getAccessToken = useSelector(state => state.getAccessToken);
  const {
    loading: accessTokenLoading,
    error: accessTokenError,
    accessToken,
  } = getAccessToken;

  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {
    city: userCity,
    state,
    countryCode: userCountryCode,
    country: userCountry,
    callingCode,
  } = storeUserLocation;
  const previousPage = () => {
    setPosition(position - 1);
  };
  const changeCountryCode = val => {
    if (callingCode !== val) {
      const plus = '+';
      const result = plus.concat(val);
      setCountryCode(result);
    }
    setCountryCode(val);
  };
  // SELECT DATE OF BIRTH
  const chooseDOB = date => {
    setDOB(date);
  };

  // useEffect(() => {
  //   const phoneNumber = countryCode?.concat(bookingNumber);
  //   if (fromSignUp && accessToken && accessToken !== '') {
      // dispatch(
      //   register(
      //     firstName,
      //     lastName,
      //     emailAddress,
      //     phoneNumber,
      //     stageName,
      //     password,
      //     website,
      //     city,
      //     countryShortCode,
      //     dob,
      //     accessToken,
      //   ),
      // );
  //   }
  // });

  useEffect(() => {
    setCountryShortCode(userCountryCode);
    setAddress(userCountry);
    setCountryCode(callingCode);
    setCity(state);
  }, []);

  //GET user location
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
    if (storeUserLocation.city === '' || storeUserLocation.country === '') {
      if (RESULTS.GRANTED) {
        getUserLocation();
      }
    }
  }, []);

  //MODALS
  const openGenreModal = () => {
    setGenreModal(true);
  };
  const closeGenreModal = () => {
    setGenreModal(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const userRegister = useSelector(state => state.userRegister);
  const {error, status, loading, message} = userRegister;

  const submitForm = () => {
    const phoneNumber = countryCode?.concat(bookingNumber);

    setClientErr('');
    if (
      firstName &&
      lastName &&
      emailAddress &&
      phoneNumber &&
      password &&
      city &&
      dob
    ) {
      // setFromSignUp(true);
      // dispatch(get_Access_Token());
      dispatch(
        register(
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          stageName,
          password,
          website,
          city,
          countryShortCode,
          dob,
          accessToken,
        ),
      );
    } else {
      setClientErr('All fields are required');
    }
  };

  const chooseUserInfo = user => {
    setFirstName(user.givenName);
    setLastName(user.familyName);
    setEmailAddress(user.email);
    // setEmail(user.email);
  };
  useEffect(() => {
    if (status && status === true) {
      setFirstName('');
      setLastName('');
      setEmailAddress('');
      setBookingNumber('');
      setPassword('');
      setAddress('');
      setCity('');
      setCountryShortCode('');
      setDOB('');
      dispatch({type: CLEAR_ACCESS_TOKEN});
      dispatch({
        type: CLEAR_REGISTER_DATA,
      });
      setFromSignUp(false);
      navigation.navigate('EmailVerification');
      // let timer = setTimeout(() => {}, 3500);
    }
    // return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (address != '') {
      // const data = State.getStatesOfCountry(countryShortCode);
      const data = Data.getAllStatesFromCountry(address);
      // console.log(data, 'STATE');
      if (data) {
        setStatesData(data);
      }
    }
  }, [address]);

  let mainView = null;
  let accessView = null;
  let mainPosition = null;
  let stepView = null;

  if (error) {
    mainView = (
      <ErrorPopup
        errorstate={error}
        clearTime={3000}
        clearError={() => dispatch({type: CLEAR_REGISTER_ERROR})}>
        {error}
      </ErrorPopup>
    );
  } else if (loading) {
    mainView = <LoadingAnime width={70} height={70} />;
  } else if (clientErr) {
    mainView = (
      <ErrorPopup
        errorstate={clientErr}
        clearTime={3000}
        clearError={() => setClientErr('')}>
        {clientErr}
      </ErrorPopup>
    );
  } else if (message) {
    mainView = (
      <SuccessPopUp
        successState={message}
        clearTime={3000}
        clearSuccess={() => dispatch({type: CLEAR_REGISTER_ERROR})}>
        {message}
      </SuccessPopUp>
    );
  } else if (accessTokenLoading) {
    mainView = <LoadingAnime width={70} height={70} />;
  } else if (accessTokenError) {
    mainView = (
      <ErrorPopup
        errorstate={accessTokenError}
        clearTime={3000}
        clearError={() => dispatch({type: CLEAR_ACCESS_TOKEN})}>
        {accessTokenError}
      </ErrorPopup>
    );
  } else if (googleErr) {
    mainView = (
      <ErrorPopup
        errorstate={googleErr}
        clearTime={3000}
        clearError={() => setGoogleErr('')}>
        {googleErr}
      </ErrorPopup>
    );
  } else {
    mainView = null;
  }

  if (position === 0) {
    mainPosition = (
      <ArtsitStep1
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
        onChangeFirstName={val => setFirstName(val)}
        onChangeLastName={val => setLastName(val)}
        onChangeEmailAddress={val => setEmailAddress(val)}
        changePage={onPageChange}
        onChangeStageName={val => setStageName(val)}
        stageName={stageName}
        visible={showDatePicker}
        closeModal={closeDatePicker}
        openModal={openDatePicker}
        chooseDateOfBirth={val => chooseDOB(val)}
        dob={dob}
      />
    );
  } else {
    mainPosition = (
      <ArtsitFinalStep
        bookingNumber={bookingNumber}
        password={password}
        address={address}
        city={city}
        genres={genres}
        stageName={stageName}
        countryShortCode={countryShortCode}
        countryCode={countryCode}
        changeCountryShortCode={val => setCountryShortCode(val)}
        onChangeStageName={val => setStageName(val)}
        onChangeGeneres={val => setGenres(val)}
        onChangeBookingNumber={val => setBookingNumber(val)}
        onChangePassword={val => setPassword(val)}
        onChangeAddress={val => setAddress(val)}
        onChangeCity={val => setCity(val)}
        changePage={previousPage}
        submitForm={submitForm}
        changeCountryCode={val => changeCountryCode(val)}
        openGenreModal={openGenreModal}
        openCountryModal={() => setCountryModal(true)}
      />
    );
  }

  if (position === 0) {
    stepView = (
      <ProgressCircle percent={50} step="Step 1" text="Basic Information" />
    );
  } else {
    stepView = (
      <ProgressCircle
        percent={100}
        step="Final step"
        text="Other Information"
      />
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        {mainView}
        <GenreModal
          genreModal={genreModal}
          closeGenreModal={closeGenreModal}
          genres={genres}
          data={statesData}
          artistState={city}
          chooseState={val => setCity(val)}
        />
        <CountrySelectorModal
          chooseCountryShortCode={val => setCountryShortCode(val)}
          chooseCountry={val => setAddress(val)}
          chooseCallingCode={val => changeCountryCode(val)}
          countryModal={countryModal}
          closeCountryModal={() => setCountryModal(false)}
        />

        <View style={styles.content}>
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              top: hp('75%'),
              alignSelf: 'center',
              flex: 1,
            }}>
            <View style={styles.otherContent}>
              <Text style={styles.or}>OR</Text>

              <View style={styles.icons}>
                <Icons
                  chooseUserInfo={val => chooseUserInfo(val)}
                  chooseGoogleErr={val => setGoogleErr(val)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '3%',
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
                Already have an account ?
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    color: '#f68128',
                    fontFamily: 'Helvetica-Medium',
                    fontSize: 13,
                    letterSpacing: 0.5,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <View style={{width: '100%', marginBottom: 10, alignItems: 'center'}}>
            <Image
              source={require('../../assests/images/Logo2.png')}
              style={{width: 110, height: 110}}
            />
          </View>
          {/* STEP INDICATOR */}
          <View style={styles.indicator}>{stepView}</View>
          <View style={styles.formView}>{mainPosition}</View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#000000',
  },
  content: {
    paddingHorizontal: 20,
    width: wp('100%'),
    height: hp('100%'),
    paddingBottom: 30,
    alignItems: 'center',
    marginTop: '5%',
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
    alignSelf: 'center',
    // bottom: 20,
  },
  textInput: {
    borderColor: '#161616',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    paddingLeft: 5,
    fontFamily: 'Helvetica-Regular',
    backgroundColor: '#161616',
    textTransform: 'uppercase',
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
    textAlign: 'center',
    fontFamily: 'Helvetica-Regular',
    fontSize: 15,
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
  countryStyle: {
    justifyContent: 'center',
    marginRight: 10,
  },
  or: {
    color: '#fff',
    marginVertical: '3%',
    textAlign: 'center',
    fontSize: 12,
  },
  icons: {
    width: '100%',
    alignSelf: 'center',
  },
  indicator: {
    width: '100%',
    marginBottom: '10%',
    // height: '20%',
  },
  formView: {
    width: '100%',
    alignItems: 'center',
  },
});

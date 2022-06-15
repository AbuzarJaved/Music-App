import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Alert,
  Button,
} from 'react-native';
import CustomHeader from '../../Notifications/component/CustomHeader';
import CameraIcon from '../../../Components/Icons/CameraIcon';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
import {DEFAULT_IMAGE_URI} from '../../../utils/ImagePicker';
import AwesomeAlert from 'react-native-awesome-alerts';
import ImageComponent from '../../../Components/Image/ImageComponent';
import ImageBottomSheetPicker from '../../../Components/BottomSheet/ImagePicker';
import {
  update_Artist_Profile,
  update_Artist_Profile_Pics,
} from '../../../redux/actions/artistActions';
import {
  update_User_Profile_Pics,
  update_User_Profile,
} from '../../../redux/actions/userActions';
import SuccessView from '../../../Components/Animations/GeneralSuccessView';
// import UploadProgressScreen from './UploadProgressScreen';
import Message from '../../../Components/Message/Message';
import LoadingAnime from '../../../Components/Loading/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  CLEAR_UPDATE_ARTIST_PROFILE_STATE,
  CLEAR_UPDATE_ARTIST_PROFILE_PICS_STATE,
  CLEAR_UPDATE_USER_PROFILE_STATE,
  CLEAR_UPDATE_USER_PROFILE_PICS_STATE,
} from '../../../redux/constants/index';
import {useNavigation} from '@react-navigation/native';
import SaveModal from '../component/SaveModal';
import {getLoggedInUserProfile} from '../../../utils/loggedInUserType';
import MainSuccessPopUp from '../../../Components/Modal/MainSuccessPopUp';
import MainErrorPopUp from '../../../Components/Modal/MainErrorPopUp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MyDarkView from '../component/countrySelector';
import GenreModal from '../../../Components/Modal/GenreModal';
import Data from 'city-state-country';
import {Country, State} from 'country-state-city';
import {loadDataFromStorage} from '../../../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

const ArtistEditProfile = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [genreModal, setGenreModal] = useState(false);
  const [statesData, setStatesData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [profilePics, setProfilePics] = useState(null);
  const [profilePicType, setProfilePicType] = useState(null);
  const [headerImage, setHeaderImage] = useState(DEFAULT_IMAGE_URI);
  const [showAlert, setShowAlert] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});



  const closeShowAlert = () => {
    setShowAlert(false);
    navigation.goBack();
  };
  const openShowAlert = () => {
    setShowAlert(true);
  };
  const toggleAlert = () => {
    setShowAlert(false);
  };
  const listenerData = getLoggedInUserProfile('LISTENER');

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetail = await loadDataFromStorage('user_Info');
      setUserDetails(userDetail);

    };
    getUserDetails();
  }, []);

  
  const {
    userProfile: {
      firstName: userFirstName,
      lastName: userLastName,
      username: userUserName,
      followerCount,
      followingCount,
      website: userWebsite,
      state: userState,
      country: userCountry,
      profileUrl: userProfilePic,
    },
  } = listenerData;

  // const {
  //   firstName: userFirstName,
  //   lastName: userLastName,
  //   username: userUserName,
  //   followerCount,
  //   followingCount,
  //   website: userWebsite,
  //   state: userState,
  //   country: userCountry,
  //   profileUrl: userProfilePic,
  // } = userDetails;

  useEffect(() => {
    if (country != '') {
      const data = Data.getAllStatesFromCountry(country);
      // const data = State.getStatesOfCountry(country);

      if (data) {
        setStatesData(data);
      }
    }
  }, [country]);
  const changeScreen = () => {
    navigation.navigate('Profile');
  };
  
  //UPDATE STATE
  const updateUserProfile = useSelector((state) => state.updateUserProfile);
  const {
    error: updateError,
    loading: updateLoading,
    status: updateStatus,
    message: updateMessage,
  } = updateUserProfile;
  const updateUserProfilePics = useSelector(
    (state) => state.updateUserProfilePics,
  );
  const {
    error: updateErrorPics,
    loading: updateLoadingPics,
    status: updateStatusPics,
    message: updateMessagePics,
  } = updateUserProfilePics;
  useEffect(() => {
    setFirstName(userFirstName);
    setLastName(userLastName);
    setUserName(userUserName);
    setWebsite(userWebsite);
    setCountryCode(userCountry);
    setState(userState);
    if (userProfilePic !== null && userProfilePic !== '') {
      setProfilePics(userProfilePic);
    }
  }, []);
  // useEffect(() => {
  //   if (updateStatus === true) {
  //     setInterval(() => {
  //       navigation.navigate('Profile');
  //     }, 2500);
  //   }
  // }, [updateStatus]);
  // useEffect(() => {
  //   if (updateStatusPics === true) {
  //     setInterval(() => {
  //       navigation.navigate('Profile');
  //     }, 2500);
  //   }
  // }, [updateStatusPics]);

  const changeArtistDetails = () => {
    if (
      firstName === userFirstName &&
      lastName === userLastName &&
      website === userWebsite &&
      countryCode === userCountry &&
      state === userState &&
      profilePics === userProfilePic
    ) {
      navigation.goBack();
    } else if (profilePics !== userProfilePic) {
      // uploadArtistpics();
      dispatch(update_User_Profile_Pics(profilePics, profilePicType));
    } else {
      dispatch(
        update_User_Profile(firstName, lastName, website, state, countryCode),
      );
      if (profilePics !== userProfilePic) {
        dispatch(update_User_Profile_Pics(profilePics, profilePicType));
      }
    }
  };
  const checkDetails = () => {
    if (firstName !== userFirstName && updateStatus === null) {
      openShowAlert();
    } else if (lastName !== userLastName && updateStatus === null) {
      openShowAlert();
    } else if (website !== userWebsite && updateStatus === null) {
      openShowAlert();
    } else if (countryCode !== userCountry && updateStatus === null) {
      openShowAlert();
    } else if (state !== userState && updateStatus === null) {
      openShowAlert();
    } else if (profilePics !== userProfilePic && updateStatus === null) {
      openShowAlert();
    } else {
      navigation.goBack();
    }
  };

  const chooseHeaderImage = (val) => {
    setHeaderImage(val);
  };

  const chooseProfilePics = (val) => {
    setProfilePics(val);
  };
  const setPicType = (val) => {
    setProfilePicType(val);
  };

  const profileImageRef = useRef(null);
  // const headerImageRef = useRef(null);

  const openProfileImageBottomSheet = () => {
    profileImageRef.current.open();
  };
  const closeProfileImageBottomSheet = () => {
    profileImageRef.current.close();
  };
  const openHeaderImageBottomSheet = () => {
    headerImageRef.current.open();
  };
  const closeHeaderImageBottomSheet = () => {
    headerImageRef.current.close();
  };
  let loadingView = null;
  let loadingViewPic = null;
  if (updateLoading) {
    loadingView = <LoadingAnime width={70} height={70} />;
  }
  if (updateLoadingPics) {
    loadingViewPic = <LoadingAnime width={70} height={70} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <CustomHeader
              title="Edit Profile"
              title2="SAVE"
              onPress={() => changeArtistDetails()}
              func={checkDetails}
            />
            <SaveModal
              discard={() => closeShowAlert()}
              showModal={showAlert}
              closeModal={() => toggleAlert()}
            />
            {loadingView}
            <MainSuccessPopUp
              clearSuccess={() =>
                dispatch({type: CLEAR_UPDATE_USER_PROFILE_STATE})
              }
              successState={updateMessage}
              clearTime={1500}>
              {updateMessage}
            </MainSuccessPopUp>
            <MainSuccessPopUp
              clearSuccess={() =>
                dispatch({type: CLEAR_UPDATE_USER_PROFILE_PICS_STATE})
              }
              successState={updateMessagePics}
              clearTime={1500}>
              {updateMessagePics}
            </MainSuccessPopUp>
            <MainErrorPopUp
              clearTime={1500}
              errorState={updateError}
              clearError={() =>
                dispatch({type: CLEAR_UPDATE_USER_PROFILE_STATE})
              }>
              {updateError}
            </MainErrorPopUp>
            <MainErrorPopUp
              clearTime={1500}
              errorState={updateErrorPics}
              clearError={() =>
                dispatch({type: CLEAR_UPDATE_USER_PROFILE_PICS_STATE})
              }>
              {updateErrorPics}
            </MainErrorPopUp>
            {/* {successView} */}
            {loadingViewPic}
            {/* {successViewPics} */}
            <GenreModal
              genreModal={genreModal}
              closeGenreModal={() => setGenreModal(false)}
              data={statesData}
              artistState={state}
              chooseState={(val) => setState(val)}
            />
            <View style={styles.content}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingTop: 20}}>

                <View style={styles.subContent}>
                  <View style={styles.profileImage}>
                    <ImageComponent
                      image={profilePics}
                      width={200}
                      height={200}
                      round
                      bc="#000"
                      bw={2}
                    />
                    <View
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: '#000',
                        opacity: 0.4,
                        width: 200,
                        height: 200,
                        borderRadius: 200 / 2,
                      }}
                    />
                    <View style={{position: 'absolute'}}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => openProfileImageBottomSheet()}>
                        <CameraIcon color="#fff" width={30} height={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* EDIT INPUTS */}

                  {/* Single Input */}
                  <View style={styles.flexInput}>
                    <View style={[styles.singleInput, {width: '48%'}]}>
                      <Text
                        style={{
                          color: '#eee',
                          fontSize: hp('2%'),
                          fontFamily: 'Helvetica-Bold',
                        }}>
                        firstName
                      </Text>
                      <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={(val) => setFirstName(val)}
                      />
                    </View>
                    <View style={[styles.singleInput, {width: '48%'}]}>
                      <Text
                        style={{
                          color: '#eee',
                          fontSize: hp('2%'),
                          fontFamily: 'Helvetica-Bold',
                        }}>
                        lastName
                      </Text>
                      <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={(val) => setLastName(val)}
                      />
                    </View>
                  </View>
                  {/* Single Input */}

                  {/* Single Input */}
                  <View style={styles.singleInput}>
                    <Text
                      style={{
                        color: '#eee',
                        fontSize: hp('2%'),
                        fontFamily: 'Helvetica-Bold',
                      }}>
                      Website
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={website}
                      onChangeText={(val) => setWebsite(val)}
                      keyboardType="url"
                    />
                  </View>
                  {/* <View style={styles.flexInput}> */}
                  <View style={{width: '100%', marginTop: 10}}>
                    <Text style={styles.label}>Country:</Text>
                    <View style={styles.textInput}>
                      <MyDarkView
                        userCountry={countryCode}
                        onChangeText={(val) => setCountryCode(val)}
                        country={country}
                        chooseCountry={(val) => setCountry(val)}
                        showCountryModal={showCountryModal}
                        changeCountry={(val) => setCountryCode(val)}
                        openModal={() => setShowCountryModal(!showCountryModal)}
                      />
 
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setGenreModal(true)}
                    activeOpacity={0.8}
                    style={{width: '100%', marginTop: 10}}>
                    <Text style={styles.label}>State:</Text>
                    <View style={styles.textInput}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: '#fff',
                          fontSize: 15,
                          paddingLeft: 4,
                        }}>
                        {state}
                      </Text>
                      <Icon
                        name="chevron-down"
                        size={18}
                        style={[styles.inputIcon, {color: '#999'}]}
                      />
                    </View>
                  </TouchableOpacity>

                </View>
              </ScrollView>
            </View>
            <ImageBottomSheetPicker
              ref={profileImageRef}
              closeImagePicker={closeProfileImageBottomSheet}
              chooseImagePicture={(val) => chooseProfilePics(val)}
              choosePicType={(val) => setPicType(val)}
            />
            {/* <ImageBottomSheetPicker
              ref={headerImageRef}
              closeImagePicker={closeHeaderImageBottomSheet}
              chooseImagePicture={(val) => chooseHeaderImage(val)}
              choosePicType={(val) => setPicType(val)}
            /> */}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ArtistEditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    width,
    // marginTop: 20,
    flex: 1,
    // paddingHorizontal: 20,
  },
  subContent: {
    width,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backgroundImage: {
    width,
    height: height / 2.5,
    // flex: 1,
    // position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  profileImage: {
    // flex: 1,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 2,
    // borderColor: '#000',
    // marginTop: -50,
    // position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0.8,
    zIndex: 500,
    alignSelf: 'center',
  },

  singleInput: {
    marginTop: 10,
  },
  input: {
    color: '#eee',
    width: '100%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#444',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  BioInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    height: 150,
    backgroundColor: '#444',
    position: 'relative',
  },
  genre: {
    width: '100%',
    marginVertical: 10,
    // alignItems: 'center',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '20%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bar: {
    width: 100,
    height: 8,
    backgroundColor: '#f68128',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
  modalContentView: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  flexInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    borderColor: '#444',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    paddingLeft: 5,
    fontFamily: 'Gilroy-light',
    backgroundColor: '#444',
    textTransform: 'uppercase',
    position: 'relative',
    height: 50,
    // marginBottom: 10,
    marginTop: 10,
  },
  label: {
    color: '#eee',
    fontSize: hp('2%'),
    fontFamily: 'Helvetica-Bold',
  },
  inputIcon: {
    position: 'absolute',
    top: 14,
    right: 20,
    color: '#f68126',
  },
});

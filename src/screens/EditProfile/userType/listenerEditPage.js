import React, {useState, useRef, useEffect} from 'react';
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

import {useSelector, useDispatch} from 'react-redux';
import ImageBottomSheetPicker from '../../../Components/BottomSheet/ImagePicker';
import {DEFAULT_IMAGE_URI} from '../../../utils/ImagePicker';
import ImageComponent from '../../../Components/Image/ImageComponent';

const {width, height} = Dimensions.get('window');

const ListenerEditProfile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePics, setProfilePics] = useState(DEFAULT_IMAGE_URI);
  const [headerImage, setHeaderImage] = useState(DEFAULT_IMAGE_URI);

  const getUserProfile = useSelector((state) => state.getUserProfile);
  const {
    userProfile: {
      fullName: userFullName,
      mobileNumber: userPhoneNumber,
      countryCode: userCountryCode,
    },
  } = getUserProfile;

  useEffect(() => {
    setName(userFullName);
    setPhoneNumber(`${userCountryCode}${userPhoneNumber}`);
    // if (artistProfilePicture !== 'null' && artistProfilePicture !== '') {
    //   setProfilePics();
    // }
  }, []);

  const chooseHeaderImage = (val) => {
    setHeaderImage(val);
  };

  const chooseProfilePics = (val) => {
    setProfilePics(val);
  };

  const userProfileImageRef = useRef(null);
  const userHeaderImageRef = useRef(null);

  const openProfileImageBottomSheet = () => {
    userProfileImageRef.current.open();
  };
  const closeProfileImageBottomSheet = () => {
    userProfileImageRef.current.close();
  };
  const openHeaderImageBottomSheet = () => {
    userHeaderImageRef.current.open();
  };
  const closeHeaderImageBottomSheet = () => {
    userHeaderImageRef.current.close();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <CustomHeader title="Edit Profile" title2="SAVE" />
            <View style={styles.content}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                  source={{uri: headerImage}}
                  style={styles.backgroundImage}>
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: '#000',
                      opacity: 0.4,
                    }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => openHeaderImageBottomSheet()}>
                    <CameraIcon color="#fff" width={50} height={50} />
                  </TouchableOpacity>
                </ImageBackground>
                <View style={styles.subContent}>
                  <View style={styles.profileImage}>
                    <ImageComponent
                      image={profilePics}
                      width={130}
                      height={130}
                      round
                      bc="#000"
                      bw={2}
                    />
                    <View
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: '#000',
                        opacity: 0.4,
                        width: 130,
                        height: 130,
                        borderRadius: 130 / 2,
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
                  <View style={styles.singleInput}>
                    <Text style={{color: '#eee', fontSize: 15}}>
                      Full Name:
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={(val) => setName(val)}
                    />
                  </View>
                  {/* Single Input */}
                  <View style={styles.singleInput}>
                    <Text style={{color: '#eee', fontSize: 15}}>
                      Phone Number:
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={phoneNumber}
                      onChangeText={(val) => setPhoneNumber(val)}
                      keyboardType="phone-pad"
                    />
                  </View>

                  {/* Song DESCRIPTION */}
                  <View style={styles.genre}>
                    <Text
                      style={{color: '#eee', marginVertical: 8, fontSize: 15}}>
                      Bio
                    </Text>
                    {/* Description Input */}
                    <View style={styles.BioInput}>
                      <Text
                        style={{
                          color: '#eee',
                          marginVertical: 8,
                          fontSize: 12,
                          position: 'absolute',
                          right: 10,
                        }}>
                        {bio && bio.length}/ 400
                      </Text>

                      <TextInput
                        multiline={true}
                        style={{
                          width: '100%',
                          paddingHorizontal: 10,
                          color: '#eee',
                        }}
                        value={bio}
                        onChangeText={(val) => setBio(val)}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
            <ImageBottomSheetPicker
              ref={userProfileImageRef}
              closeImagePicker={closeProfileImageBottomSheet}
              chooseImagePicture={(val) => chooseProfilePics(val)}
            />
            <ImageBottomSheetPicker
              ref={userHeaderImageRef}
              closeImagePicker={closeHeaderImageBottomSheet}
              chooseImagePicture={(val) => chooseHeaderImage(val)}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
    </View>
  );
};

export default ListenerEditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    width,
    marginTop: 60,
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
    height: height / 4,
    // flex: 1,
    // position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  profileImage: {
    // flex: 1,
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 2,
    borderColor: '#111',
    marginTop: -50,
    // position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
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
});

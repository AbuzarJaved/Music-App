import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import LeftUI from './LeftUi/LeftUI';
import RightUi from './RightUI/RightUi';
import {DEFAULT_IMAGE_URI} from '../../../../utils/ImagePicker';
import {
  getLoggedInUserProfile,
  mainNumberFormat,
} from '../../../../utils/loggedInUserType';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Follower from './RightUI/Follower';
import {loadDataFromStorage} from '../../../../utils/asyncStorage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const HomeProfile = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({});
  const userLogin = useSelector(state => state.userLogin);
  const {type: userType} = userLogin;

  const userData = getLoggedInUserProfile(`${userType}`);
  const getUserProfile = useSelector(state => state.getUserProfile);

  // console.log(userData, 'user data');
  // const {
  //   userProfile: {fullName},
  // } = userData;

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetail = await loadDataFromStorage('user_Info');
      if (userDetail) {
        setUserDetails(userDetail);
      }
    };
    getUserDetails();
  }, []);

  // const {
  //   firstName,
  //   lastName,
  //   username,
  //   followerCount,
  //   followingCount,
  //   website,
  //   state,
  //   country,
  //   profileUrl,
  // } = userDetails;
  const {
    userProfile: {
      firstName,
      lastName,
      username,
      followerCount,
      followingCount,
      website,
      state,
      country,
      profileUrl,
    },
  } = getUserProfile;

  // let stageNameView = null;
  // if (userType && userType === 'ARTIST') {
  //   stageNameView = (
  //     <Text style={styles.profile_username}>{`@${username}`}</Text>
  //   );
  // }
  return (
    <View style={styles.container}>
      <View style={styles.artistDetails}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          {profileUrl === '' || profileUrl === null ? (
            <View style={styles.thumbNail}>
              <Text style={[styles.thumbNailName, {marginRight: 2}]}>
                {firstName ? firstName[0] : null}
              </Text>
              <Text style={styles.thumbNailName}>
                {lastName ? lastName[0] : null}
              </Text>
            </View>
          ) : (
            <Image style={styles.profileImage} source={{uri: profileUrl}} />
          )}
        </TouchableOpacity>
        <View style={styles.profile_Detail}>
          <Text style={styles.profile_name}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.profile_username}>{`@${username}`}</Text>
        </View>
      </View>
      {/* RIGHT SIDE */}
      <View style={styles.rightContent}>
        <View style={{}}>
          <Text
            style={{
              color: '#eee',
              fontSize: scale(10),
              fontFamily: 'Helvetica-Bold',
            }}>
            {mainNumberFormat(followerCount)}
          </Text>
          <Text
            style={{
              color: '#f68128',
              fontSize: scale(8),
              fontFamily: 'Helvetica-ExtraBold',
            }}>
            Followers
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              color: '#eee',
              fontSize: scale(10),
              fontFamily: 'Helvetica-Bold',
            }}>
            {mainNumberFormat(followingCount)}
          </Text>
          <Text
            style={{
              color: '#f68128',
              fontSize: scale(8),
              fontFamily: 'Helvetica-ExtraBold',
            }}>
            Following
          </Text>
        </View>
      </View>
      {/* <LeftUI />
      <RightUi /> */}
    </View>
  );
};

export default HomeProfile;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#222',
    paddingBottom: 10,
    paddingTop: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    // height: 130,
  },
  artistDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('70%'),
  },
  profile_Detail: {
    // marginLeft: 10,
  },
  profile_name: {
    color: '#ddd',
    fontSize: '11@s',
    fontWeight: '900',
    fontFamily: 'Helvetica-ExtraBold',
  },
  profile_username: {
    color: '#f68128',
    fontSize: '9@s',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'lowercase',
  },
  profile_job: {
    color: '#999',
    fontSize: 11,
    marginTop: 5,
    fontFamily: 'Gilroy-Bold',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('30%'),
  },
  thumbNail: {
    width: '45@s',
    height: '45@s',
    borderRadius: '45@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  thumbNailName: {
    fontSize: hp('2%'),
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  profileImage: {
    width: '45@s',
    height: '45@s',
    borderRadius: '45@s',
    marginRight: '5@s',
  },
});

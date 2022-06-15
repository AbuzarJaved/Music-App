import {Button} from 'native-base';
import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, View, Dimensions, Alert, SafeAreaView} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import UploadScreen from './TabsScreens/UploadScreen/FileUpload';
import ShareIcon from '../../Components/Icons/ShareIcon';
import {useSelector, useDispatch} from 'react-redux';
import Divider from '../../Components/Divider/Divider';
import BottomSheetContent from './BottomSheetContent';

// Icons
import DonateIcon from '../../Components/Icons/DonateIcon';
import LikeBtn from '../../Components/Button/LikeBtn';
import HeaderBackBtn from '../../Components/CustomHeader/HeaderWithBackBtn';
import TabView from './ProfileTypes/TabViews/ArtistTabView';
import ProfileModal from '../../Components/Modal/ProfileModal';
import {getLoggedInUserProfile} from '../../utils/loggedInUserType';
import LoginBtn from '../../Components/Button/LoginBtn';
import FollowBtn from '../../Components/Button/FollowBtn';
import {unFollow_Artist, follow_Artist} from '../../redux/actions/userActions';

const {height, width} = Dimensions.get('window');

const SingleArtistProfile = ({route}) => {
  const {
    firstName,
    lastName,
    stageName,
    profilePictureUrl,
    followCount,
    artistIdentity,
  } = route.params;
  // console.log(route.params, 'ROUTE');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [follow, setFollow] = useState(false);
  const [artistFollowers, setArtistsFollowers] = useState(followCount);
  const [showAlert, setShowAlert] = useState(false);

  const followArtist = () => {
    dispatch(follow_Artist(artistIdentity));
    setFollow(true);
    setArtistsFollowers(artistFollowers + 1);
  };
  const unfollowArtist = () => {
    setFollow(false);
  };

  const userData = getLoggedInUserProfile('SUBSCRIBER');
  const {
    userProfile: {fullName, countryCode},
  } = userData;
  const artistData = getLoggedInUserProfile('ARTIST');

  const openAlert = () => {
    Alert.alert('Unfollow', `Stop following ${stageName}?`, [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Unfollow',
        onPress: () => {
          unfollowArtist();
          dispatch(unFollow_Artist(artistIdentity));
          if (artistFollowers >= 0) {
            setArtistsFollowers(artistFollowers - 1);
          }
        },
      },
    ]);
  };

  const {
    artistProfile: {
      firstName: artistFullName,
      lastName: artistLastName,
      // stageName,
      city: artistCity,
      address: artistAddress,
    },
  } = artistData;

  const userLogin = useSelector((state) => state.userLogin);
  const {type: userType} = userLogin;


  return (
    // <ScrollView style={{flex: 1, height: "100%"}}>
    <View style={{flex: 1, backgroundColor: '#000'}}>
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <HeaderBackBtn title="Profile" navigation={navigation} />
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.content}>
          {/* BIG PROFILE IMAGE */}
          <Image
            source={require('../../assests/images/profile.jpg')}
            style={{width: '100%', height: 130, borderRadius: 15}}
          />
          <View style={styles.profile}>
            <View
              style={{
                position: 'relative',
                height: 100,
                width: '100%',
                borderRadius: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {/* MAIN PROFILE IMAGE */}
              <Image
                source={require('../../assests/images/image.jpg')}
                style={{height: 100, width: 100, borderRadius: 100 / 2}}
              />
              {/* VERIFICATION PICTURE */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  position: 'absolute',
                  left: '18%',
                  zIndex: 100,
                  top: 0,
                }}>
                <Image
                  source={require('../../assests/images/verification.png')}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20 / 2,
                  }}
                />
              </View>
              <View style={{width: '25%', marginTop: 15, marginRight: 20}}>
                {/* <LoginBtn title="Follow" height="65%" textSize={12} /> */}
                <FollowBtn
                  title="Follow"
                  textSize={12}
                  artistIdentity={artistIdentity}
                  follow_Artist={followArtist}
                  unFollow={unfollowArtist}
                  follow={follow}
                  openAlert={openAlert}
                />
              </View>
            </View>
            {/* PROFILE DETAILS */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{marginLeft: 6}}>
                <Text style={{color: '#eee', fontSize: 15}}>
                  {`${firstName} ${lastName}`}
                </Text>
                <Text
                  style={{
                    color: '#f68126',
                    fontSize: 11,
                    textTransform: 'lowercase',
                  }}>
                  {`@${stageName}`}
                </Text>
              </View>
              {/* OTHER DETAILS */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* FIRST DETAIL */}
                <View style={{marginHorizontal: 15}}>
                  <Text style={{color: '#eee', fontSize: 13}}>154</Text>
                  <Text style={{color: '#f68126', fontSize: 11}}>likes</Text>
                </View>
                {/* SECOND DETAIL */}
                <View style={{marginHorizontal: 15}}>
                  <Text style={{color: '#eee', fontSize: 13}}>
                    {artistFollowers}
                  </Text>
                  <Text style={{color: '#f68126', fontSize: 11}}>
                    followers
                  </Text>
                </View>
                {/* THIRD DETAIL */}
                <View style={{marginHorizontal: 15}}>
                  <Text style={{color: '#eee', fontSize: 13}}>2566</Text>
                  <Text style={{color: '#f68126', fontSize: 11}}>
                    following
                  </Text>
                </View>
              </View>
            </View>
            {/* BACKGROUNG INFO */}
            <View style={{marginVertical: 10}}>
              <Text style={{color: '#99999F', fontSize: 13, textAlign: 'left'}}>
                Artiste, Singer, R&B, Pop. DM me for your events ranging from
                concerts, birthdays, wedding e.t.c Call: 0802000300
              </Text>
              {/* SOCIALS */}
              <View style={{flexDirection: 'row', marginTop: 10}}>
                {/* SINGLE SOCIALS */}
                <View style={{flexDirection: 'row', marginRight: 20}}>
                  <Icon name="md-location-sharp" color="#f68128" size={20} />
                  <Text style={{color: '#99999F', fontSize: 13}}>
                    &nbsp;{countryCode || `${artistAddress}, ${artistCity}`}
                  </Text>
                </View>
                {/* SINGLE SOCIALS */}
                <View style={{flexDirection: 'row'}}>
                  <Icon name="md-link" color="#f68128" size={20} />
                  <Text style={{color: '#99999F', fontSize: 13}}>
                    &nbsp;www.johndoe.com
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* Divider */}
          <Divider />
          {/* ARTIST MOST LIKED SONG */}
          <View
            style={{marginVertical: 15, paddingHorizontal: 10, width: '100%'}}>
            <Text
              style={{color: '#eee', fontSize: 12, fontFamily: 'Gilroy-Bold'}}>
              Most Liked Song
            </Text>
            {/* MOST LIKED SONG DETAIL */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                {/* MOST SONG IMAGE // THUMBNAIL */}
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    marginRight: 8,
                  }}>
                  <Image
                    source={require('../../assests/images/faded.jpg')}
                    style={{width: 70, height: 70, borderRadius: 10}}
                  />
                </View>
                {/* MOST LIKED SONG NAME */}
                <View
                  style={{
                    width: '65%',
                    justifyContent: 'space-between',
                    paddingVertical: 2,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#999',
                      fontSize: 13,
                      fontFamily: 'Gilroy-Bold',
                    }}>
                    Shine on you crazy diamond ft. Bassey
                  </Text>
                  <Text
                    style={{
                      color: '#f68128',
                      fontSize: 11,
                      fontFamily: 'Gilroy-Bold',
                    }}>
                    400 likes
                  </Text>
                  <Text
                    style={{
                      color: '#f68128',
                      fontSize: 11,
                      fontFamily: 'Gilroy-Bold',
                    }}>
                    4:23
                  </Text>
                </View>
              </View>
              {/* ACTION ICONS */}
              <TouchableOpacity activeOpacity={0.6}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: -1,

                    width: 50,
                  }}>
                  <ShareIcon color="#999" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Divider */}
          <Divider />
          {/* <Divider /> */}

          {/* TABS SCREEN */}
          <TabView />
        </View>
      </ScrollView>
      {/* <AlertComponent /> */}
    </View>
    </SafeAreaView>
    </View>
    // </ScrollView>
  );
};

export default SingleArtistProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 60,
    backgroundColor: '#000',
    height: '100%',
    width: '100%',
    // paddingBottom: 20,
  },
  content: {
    width: '100%',
    // marginTop: 20,
    paddingHorizontal: 15,
    flex: 1,
  },
  profile: {
    marginTop: -30,
    // paddingHorizontal: 7,
    // marginBottom: 10,
    // flex: 1,
  },
  profileIcon: {
    position: 'absolute',
    right: 15,
  },
  TabContainer: {
    flex: 1,
    height: '100%',
    marginTop: 20,
  },
});

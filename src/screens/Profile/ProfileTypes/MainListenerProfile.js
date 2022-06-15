import {Button} from 'native-base';
import React, {useRef, useState, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import UploadScreen from '../TabsScreens/UploadScreen/FileUpload';
import ShareIcon from '../../../Components/Icons/ShareIcon';
import {useSelector, useDispatch} from 'react-redux';
import Divider from '../../../Components/Divider/Divider';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../../Components/CustomHeader/CommonHeader';
import ProfileHeader from '../component/ProfileHeader';
import {scale, ScaledSheet} from 'react-native-size-matters';

// Icons
import DonateIcon from '../../../Components/Icons/DonateIcon';
import LikeBtn from '../../../Components/Button/LikeBtn';
import UploadIcon from '../../../Components/Icons/UploadIcon';
import HeaderBackBtn from '../../../Components/CustomHeader/HeaderWithBackBtn';
import {get_User_Media_Listening_History} from '../../../redux/actions/MediaActions/getMediaActions';
import {get_User_Activities} from '../../../redux/actions/userActions';
import TabView from './TabViews/ListenerTabView';
import ProfileModal from '../../../Components/Modal/ProfileModal';
import {getLoggedInUserProfile} from '../../../utils/loggedInUserType';
import LoginBtn from '../../../Components/Button/LoginBtn';
import BottomSheetContent from '../BottomSheetContent';
import {DEFAULT_IMAGE_URI} from '../../../utils/ImagePicker';
import ArtistDetails from './UserDetails/ArtistDetails';
import ArtistMostPlayedCont from './UserDetails/ArtistMostPlayedCont2';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SingleUserMostPlayedCont from './UserDetails/SingleUserMostPlay';

const {height, width} = Dimensions.get('window');

const MainArtistProfile = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const dispatch = useDispatch();

  const getUserMediaListeningHistory = useSelector(
    state => state.getUserMediaListeningHistory,
  );
  const {data: listeningData} = getUserMediaListeningHistory;
  const playedSong = listeningData?.sort((a, b) => b.plays - a.plays);
  console.log(playedSong);

  useFocusEffect(
    useCallback(() => {
      dispatch(get_User_Media_Listening_History(page, size));
      dispatch(get_User_Activities(page, size));
    }, []),
  );

  return (
    <View style={styles.container}>
      <ProfileHeader title="Profile" />
      {/* <LinearGradient
        colors={['#feee3e', '#f68128', '#f68128']}
        style={styles.playlistBtn}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.playlistBtn2}
          onPress={() => navigation.navigate('Upload')}>
          <Text
            style={{
              color: '#fff',
              fontSize: hp('2.2%'),
              marginRight: 5,
              fontFamily: 'Helvetica-Bold',
            }}>
            Upload Song
          </Text>
          <UploadIcon color="#fff" />
        </TouchableOpacity>
      </LinearGradient> */}
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{paddingTop: 30, paddingBottom: 50}}
          style={{flex: 1}}>
          <ArtistDetails onPress={() => navigation.navigate('Edit_Profile')} />
          {/* MOST LIKE SONG */}
          <View style={styles.likedSong}>
            {playedSong && playedSong.length > 0 ? (
              <Text
                style={{
                  color: '#eee',
                  fontSize: scale(15),
                  fontFamily: 'Helvetica-Bold',
                }}>
                {`Most played song (${playedSong[0]?.plays})`}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#eee',
                  fontSize: scale(15),
                  fontFamily: 'Helvetica-Bold',
                }}>
                Most played song
              </Text>
            )}
            {playedSong && playedSong.length > 0 && (
              <SingleUserMostPlayedCont {...playedSong[0]?.media} />
            )}
          </View>
          {/* TAB SCREENS */}
          <TabView />
        </ScrollView>
      </View>
    </View>
  );
};

export default MainArtistProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 60,
    backgroundColor: '#000',
    height: '100%',
    width: '100%',
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
    }),
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
  playlistBtn: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    zIndex: 100,

    borderRadius: 10,
    width: wp('37%'),
    height: hp('6%'),
  },
  playlistBtn2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  likedSong: {
    width: '100%',
    marginVertical: 20,
    paddingLeft: 10,
  },
});
{
  /* FIRST TAB */
}
{
  /* <TouchableOpacity
                activeOpacity={0}
                onPress={() => segmentClicked(0)}
                style={[
                  activeIndex == 0
                    ? {borderBottomColor: '#f68126', borderWidth: 5}
                    : {},
                ]}>
                <Text
                  style={[
                    activeIndex == 0
                      ? {
                          color: '#eee',

                          transform: [{translateY: -10}],
                        }
                      : {color: '#999'},
                  ]}>
                  Upload
                </Text>
              </TouchableOpacity> */
}
{
  /* <View style={styles.container}>
  <ProfileHeader
    showLeftIcon
    title="Profile"
    onPress={() => navigation.navigate('Edit_Profile')}
  />

  <TouchableOpacity
    activeOpacity={0.8}
    style={styles.playlistBtn}
    onPress={() => navigation.navigate('Upload')}>
    <Text
      style={{
        color: '#fff',
        fontSize: 15,
        marginRight: 5,
        fontFamily: 'Helvetica-Bold',
      }}>
      Upload Song
    </Text>
    <UploadIcon color="#fff" />
  </TouchableOpacity>
  <View style={styles.content}>
    <ScrollView
      contentContainerStyle={{paddingTop: 30, paddingBottom: 50}}
      style={{flex: 1}}>
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
          <Image
            source={
              artistPics !== 'null'
                ? {uri: artistPics}
                : {uri: DEFAULT_IMAGE_URI}
            }
            style={{height: 100, width: 100, borderRadius: 100 / 2}}
          />

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
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{marginLeft: 6}}>
            <Text
              style={{
                color: '#eee',
                fontSize: 15,
                fontFamily: 'Helvetica-Bold',
              }}>
              {fullName ||
                `${artistFullName} ${artistLastName}` ||
                'Napollo Music'}
            </Text>
            {stageNameView}
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{marginHorizontal: 15}}>
              <Text
                style={{
                  color: '#eee',
                  fontSize: 13,
                  fontFamily: 'Helvetica-Medium',
                }}>
                154
              </Text>
              <Text
                style={{
                  color: '#f68126',
                  fontSize: 11,
                  fontFamily: 'Helvetica-Bold',
                }}>
                likes
              </Text>
            </View>
           
            <View style={{marginHorizontal: 15}}>
              <Text
                style={{
                  color: '#eee',
                  fontSize: 13,
                  fontFamily: 'Helvetica-Medium',
                }}>
                {artistFollowers}
              </Text>
              <Text
                style={{
                  color: '#f68126',
                  fontSize: 11,
                  fontFamily: 'Helvetica-Bold',
                }}>
                followers
              </Text>
            </View>

            <View style={{marginHorizontal: 15}}>
              <Text
                style={{
                  color: '#eee',
                  fontSize: 13,
                  fontFamily: 'Helvetica-Medium',
                }}>
                2566
              </Text>
              <Text
                style={{
                  color: '#f68126',
                  fontSize: 11,
                  fontFamily: 'Helvetica-Bold',
                }}>
                following
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginVertical: 10}}>
          <Text
            style={{
              color: '#99999F',
              fontSize: 13,
              textAlign: 'left',
              fontFamily: 'Helvetica-Medium',
            }}>
            {artistBio
              ? artistBio
              : ' Artiste, Singer, R&B, Pop. DM me for your events ranging from concerts, birthdays, wedding e.t.c Call: 0802000300'}
          </Text>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'row', marginRight: 20}}>
              <Icon name="md-location-sharp" color="#f68128" size={20} />
              <Text
                style={{
                  color: '#99999F',
                  fontSize: 13,
                  fontFamily: 'Helvetica-Medium',
                }}>
                &nbsp;{countryCode || `${artistAddress}, ${artistCity}`}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Icon name="md-link" color="#f68128" size={20} />
              <Text
                style={{
                  color: '#99999F',
                  fontSize: 13,
                  fontFamily: 'Helvetica-Medium',
                }}>
                &nbsp;{artistWebsite ? artistWebsite : 'www.napollo.com'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Divider />

      <View style={{marginVertical: 15, paddingHorizontal: 10, width: '100%'}}>
        <Text
          style={{
            color: '#eee',
            fontSize: 12,
            fontFamily: 'Gilroy-Bold',
            fontFamily: 'Helvetica-Bold',
          }}>
          Most Liked Song
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
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
                  fontFamily: 'Helvetica-Medium',
                }}>
                Shine on you crazy diamond ft. Bassey
              </Text>
              <Text
                style={{
                  color: '#f68128',
                  fontSize: 11,
                  fontFamily: 'Helvetica-Medium',
                }}>
                400 likes
              </Text>
              <Text
                style={{
                  color: '#f68128',
                  fontSize: 11,
                  fontFamily: 'Helvetica-Medium',
                }}>
                4:23
              </Text>
            </View>
          </View>
         
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

      <Divider />

      <TabView />
    </ScrollView>
  </View>
  <GeneralBottomSheet ref={sheetRef} height={150} bg="#222" radius={20}>
    <BottomSheetContent closeBottomSheet={closeBottomSheet} />
  </GeneralBottomSheet>
</View>; */
}

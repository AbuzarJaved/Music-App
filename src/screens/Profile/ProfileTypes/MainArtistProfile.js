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

// Icons
import DonateIcon from '../../../Components/Icons/DonateIcon';
import LikeBtn from '../../../Components/Button/LikeBtn';
import UploadIcon from '../../../Components/Icons/UploadIcon';
import HeaderBackBtn from '../../../Components/CustomHeader/HeaderWithBackBtn';
import {
  get_User_Media_Listening_History,
  get_Artist_Media,
  get_Artist_Trending_Media,
  get_Media,
} from '../../../redux/actions/MediaActions/getMediaActions';
import {
  get_All_User_Album,
  store_Active_Album_Details,
} from '../../../redux/actions/MediaActions/AlbumActions/index';
import TabView from './TabViews/ArtistTabView';
import ProfileModal from '../../../Components/Modal/ProfileModal';
import {getLoggedInUserProfile} from '../../../utils/loggedInUserType';
import LoginBtn from '../../../Components/Button/LoginBtn';
import BottomSheetContent from '../BottomSheetContent';
import {DEFAULT_IMAGE_URI} from '../../../utils/ImagePicker';
import ArtistDetails from './UserDetails/ArtistDetails';
import {get_User_Activities} from '../../../redux/actions/userActions';
import ArtistMostPlayedCont from './UserDetails/ArtistMostPlayedCont2';
import SingleArtistMostPlayedCont from './UserDetails/SingleArtistMostPlayed';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {height, width} = Dimensions.get('window');

const MainArtistProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;
  const getMedia = useSelector(state => state.getMedia);
  const {data: trendingData} = getMedia;

  const likedSong = trendingData?.sort((a, b) => b.likes - a.likes);

  const getAllUserAlbum = useSelector(state => state.getAllUserAlbum);
  const {
    data: albumData,
    loading: albumLoading,
    error: albumError,
  } = getAllUserAlbum;

  useFocusEffect(
    useCallback(() => {
      dispatch(get_Media(page, size));
      dispatch(get_User_Activities(page, size));
      if (albumData && albumData.length <= 0)
        dispatch(get_All_User_Album(page, size));
      // dispatch(get_Artist_Trending_Media(city, state, country, page, size));
    }, []),
  );

  return (
    <View style={styles.container}>
      <ProfileHeader title="Profile" />
      <LinearGradient
        colors={['#feee3e', '#f68128', '#f68128']}
        style={styles.playlistBtn}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.playlistBtn2}
          onPress={() => navigation.navigate('Upload')}>
          <Text
            style={{
              color: '#fff',
              fontSize: scale(10),
              marginRight: 5,
              fontFamily: 'Helvetica-Bold',
            }}>
            Upload Song
          </Text>
          <UploadIcon color="#fff" width={scale(16)} height={scale(16)} />
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{paddingTop: 30, paddingBottom: 50}}
          style={{flex: 1}}>
          <ArtistDetails onPress={() => navigation.navigate('Edit_Profile')} />
          {/* MOST LIKE SONG */}
          <View style={styles.likedSong}>
            <Text
              style={{
                color: '#eee',
                fontSize: scale(15),
                fontFamily: 'Helvetica-Bold',
              }}>
              Most Liked Song
            </Text>
            {trendingData?.length > 0 && (
              <SingleArtistMostPlayedCont {...likedSong[0]} />
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

const styles = ScaledSheet.create({
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

    borderRadius: 5,
    width: '120@s',
    height: '35@s',
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

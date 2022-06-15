import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import Share_Song_Link from '../../screens/Upload/component/Share_Song_Link';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderWithBackBtn from '../CustomHeader/CommonHeader';
import {useDispatch, useSelector} from 'react-redux';
import {closeSingleUserModal} from '../../redux/actions/userActions';
import LoginBtn from '../Button/LoginBtn';
import ImagePlaceholder from '../../assests/images/music-placeholder.png';
const {width, height} = Dimensions.get('window');
import SingleUserDetail from '../../screens/Profile/ProfileTypes/UserDetails/SingleUserDetails';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ArtistMostPlayedCont from '../../screens/Profile/ProfileTypes/UserDetails/ArtistMostPlayedCont2';
import SingleArtistMostPlayedCont from '../../screens/Profile/ProfileTypes/UserDetails/SingleArtistMostPlayed';
import {
  get_Single_Artist_Media,
  get_Single_User_Media_History,
} from '../../redux/actions/MediaActions/getMediaActions';
import {get_User_Profile_With_Id} from '../../redux/actions/userActions';
import {scale, ScaledSheet} from 'react-native-size-matters';
import ArtistTabView from '../../screens/Profile/ProfileTypes/SingleUsersTabView/SingleArtistTabView';
import ListenerTabView from '../../screens/Profile/ProfileTypes/SingleUsersTabView/SingleLinstenerTabView';

const SingleUserModal = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);
  const [userId, setUserId] = useState('');
  const singleUserModal = useSelector(state => state.singleUserModal);
  const {isModalOpen} = singleUserModal;
  const storeActiveUserDetails = useSelector(
    state => state.storeActiveUserDetails,
  );
  const getUserProfileWithId = useSelector(state => state.getUserProfileWithId);

  const openSongBottomSheet = useSelector(state => state.openSongBottomSheet);
  const {
    artistDetails: {id, accountUserType},
  } = openSongBottomSheet;

  const getSingleArtistMedias = useSelector(
    state => state.getSingleArtistMedias,
  );
  const {medias: trendingData} = getSingleArtistMedias;

  const getSingleUserMediasHistory = useSelector(
    state => state.getSingleUserMediasHistory,
  );
  const {medias: listeningData} = getSingleUserMediasHistory;

  const likedSong = trendingData?.sort((a, b) => b.likes - a.likes);

  const {
    loading: userLoading,
    error: userError,
    userProfile: singleProfile,
    profile: singleDetail,
  } = getUserProfileWithId;

  useEffect(() => {
    if (accountUserType === 'ARTIST' && id !== '') {
      dispatch(get_Single_Artist_Media(id, page, size));
    } else {
      dispatch(get_Single_User_Media_History(id, page, size));
    }
  }, [id]);
  // const {
  //   userProfile: {
  //     profile: {type},
  //   },
  // } = storeActiveUserDetails;

  useEffect(() => {
    if (id !== '') {
      console.log(id, 'USER ID SETTSS');
      setUserId(id);
    }
  }, []);

  return (
    <Modal
      style={{margin: 0}}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isModalOpen}
      onBackdropPress={() => dispatch(closeSingleUserModal())}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <HeaderWithBackBtn
          title="Profile"
          func={() => dispatch(closeSingleUserModal())}
        />
        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{paddingTop: 30, paddingBottom: 50}}
            style={{flex: 1}}>
            <SingleUserDetail />
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
              {accountUserType === 'ARTIST' && trendingData?.length > 0 && (
                <SingleArtistMostPlayedCont {...likedSong[0]} />
              )}
              {accountUserType !== 'ARTIST' && listeningData.length > 0 && (
                <ArtistMostPlayedCont />
              )}
            </View>
            {accountUserType === 'ARTIST' ? (
              <ArtistTabView />
            ) : (
              <ListenerTabView />
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SingleUserModal;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '100%',
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
    }),
    backgroundColor: '#000',
    flex: 1,
  },
  content: {
    width: '100%',
    // marginTop: 20,
    paddingHorizontal: 15,
    flex: 1,
  },
  likedSong: {
    width: '100%',
    marginVertical: 20,
    paddingLeft: 10,
  },
});

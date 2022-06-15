import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
// import LibraryComponent from '../../../Components/LibrarySongs/LibrarySongs';
import LibraryHeader from '../component/LibraryHeader';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  get_All_Playlists,
  get_All_User_Playlist,
  store_Active_Playlist_Details,
} from '../../../redux/actions/MediaActions/PlayListActions/index';
import {
  get_User_Follower_List,
  store_Active_User_Details,
} from '../../../redux/actions/userActions';
import SmallErrorModalPopUp from '../../../Components/Modal/SmallErrorModalPopUp';
import {CLEAR_PLAYLIST_ERROR} from '../../../redux/constants';
import SingleViewHeader from '../component/SingleViewHeader';
import PlaylistComponent from '../../../Components/LibrarySongs/components/PlaylistComponent';
import AlbumComponent from '../../../Components/LibrarySongs/components/AlbumComponent';
import ArtistComponent from '../../../Components/LibrarySongs/components/ArtistComponent';
import RecentlyDiscovered from '../../../Components/LibrarySongs/components/RecentlyDiscovered';
import LinearGradient from 'react-native-linear-gradient';
import {loadDataFromStorage} from '../../../utils/asyncStorage';
import {get_Listener_Liked_Media} from '../../../redux/actions/MediaActions/getMediaActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DiscoveryImage from '../../../assests/images/onBoarding7.jpg';
import SongsContainer from '../../../Components/LibrarySongs/components/SongsContainer';
import ArtistContainer from '../../../Components/LibrarySongs/components/ArtistComponent';
import {scale, ScaledSheet} from 'react-native-size-matters';
import DiscoveredSongContainer from '../../../Components/LibrarySongs/components/DiscoveredSongsCont';

const {width, height} = Dimensions.get('window');

const MainListenerLibraryPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const getAllUserPlaylist = useSelector(state => state.getAllUserPlaylist);
  const getListenerLikedMedia = useSelector(
    state => state.getListenerLikedMedia,
  );
  const getUserFollowerList = useSelector(state => state.getUserFollowerList);
  const {
    loading: followLoading,
    error: followError,
    data: followData,
  } = getUserFollowerList;
  const {
    loading: playlistLoading,
    error: playlistError,
    data: playlistData,
  } = getAllUserPlaylist;

  const {
    loading: listenerLoading,
    error: listenerError,
    data: listenerData,
  } = getListenerLikedMedia;

  const dicoveryMedia = [];
  useFocusEffect(
    useCallback(() => {
      if (playlistData && playlistData.length <= 0) {
        dispatch(get_All_User_Playlist(page, size));
      }
      if (listenerData && listenerData.length <= 0) {
        dispatch(get_Listener_Liked_Media(page, size));
      }
      if (followData && followData.length <= 0) {
        dispatch(get_User_Follower_List(page, size));
      }
    }, []),
  );

  const playlistNavigate = val => {
    dispatch(store_Active_Playlist_Details(val));
    navigation.navigate('SinglePlayList');
  };

  const dataList = playlistData
    ?.slice(0, 5)
    .map((data, index) => (
      <PlaylistComponent
        {...data}
        key={index}
        onPress={() => playlistNavigate(data)}
      />
    ));

  const songList = listenerData
    .slice(0, 5)
    .map((data, index) => (
      <SongsContainer {...data} allSongs={listenerData} key={index} />
    ));

  const followList = followData
    ?.filter(item => item.accountUserType === 'ARTIST')
    .slice(0, 5)
    .map((item, index) => (
      <ArtistContainer key={index} user={item} {...item} />
    ));

  const getPlaylistDataAgain = () => {
    dispatch({
      type: CLEAR_PLAYLIST_ERROR,
    });
    dispatch(get_All_User_Playlist(page, size));
  };

  const getSongsAgain = () => {
    dispatch(get_Listener_Liked_Media(page, size));
  };
  const getFollowList = () => {
    dispatch(get_User_Follower_List(page, size));
  };

  let playlistErrorView = null;
  let playlistLoadingView = null;
  let listenerLoadingView = null;
  let listenerMainStatusView = null;
  let followMainView = null;
  if (playlistError) {
    playlistErrorView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => getPlaylistDataAgain()}>
        <Text
          style={{
            color: '#999',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {playlistError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: 5,
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  }
  if (playlistLoading) {
    playlistLoadingView = <ActivityIndicator size="small" color="#F68128" />;
  }
  if (listenerLoading) {
    listenerMainStatusView = <ActivityIndicator size="small" color="#F68128" />;
  }
  if (followLoading) {
    followMainView = <ActivityIndicator size="small" color="#F68128" />;
  } else if (followError) {
    followMainView = (
      <TouchableOpacity activeOpacity={0.7} onPress={() => getFollowList()}>
        <Text
          style={{
            color: '#999',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {followError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: 5,
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  }
  if (listenerError) {
    listenerMainStatusView = (
      <TouchableOpacity activeOpacity={0.7} onPress={() => getSongsAgain()}>
        <Text
          style={{
            color: '#999',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {listenerError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: 5,
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <LibraryHeader />
        {/* CREATE PLAYLIST BTN */}
        <LinearGradient
          colors={['#feee3e', '#f68128', '#f68128']}
          style={styles.playlistBtn}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.playlistBtn2}
            onPress={() => navigation.navigate('CreatePlaylistForm')}>
            <Text
              style={{
                color: '#fff',
                fontSize: scale(10),
                marginRight: 5,
                fontFamily: 'Helvetica-Bold',
              }}>
              Create Playlist
            </Text>
            <Icon
              name="md-add"
              color="#eee"
              size={scale(18)}
              style={{paddingLeft: 2}}
            />
          </TouchableOpacity>
        </LinearGradient>
        {/* CONTENT */}
        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 50,
              width: '100%',
            }}>
            {/* Playlist View */}
            <SingleViewHeader
              title="Playlists"
              onPress={
                playlistData.length > 0
                  ? () => navigation.navigate('Playlist')
                  : () => navigation.navigate('CreatePlaylistForm')
              }
            />
            {playlistErrorView}
            {playlistLoadingView}
            <ScrollView
              contentContainerStyle={{
                marginBottom: 15,
                marginTop: 10,
              }}
              horizontal={true}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}>
              <DiscoveredSongContainer
                name="Recently Discovered"
                media={dicoveryMedia}
                discoveryImage={DiscoveryImage}
                onPress={() => navigation.navigate('DiscoveredSongs')}
              />
              {playlistLoading === false &&
                !playlistError &&
                playlistData.length <= 0 && (
                  <View
                    style={{
                      flexDirection: 'row',

                      // justifyContent: 'center',
                      width: '40%',
                      marginTop: '10%',
                    }}>
                    <Text
                      style={{
                        color: '#eee',
                        textAlign: 'left',
                        fontSize: scale(10),
                      }}>
                      You have no playlist. Please create new playlist
                    </Text>
                  </View>
                )}
              {dataList}
            </ScrollView>

            {/* Songs View */}
            <SingleViewHeader
              title="Favourites Songs"
              onPress={() => navigation.navigate('Favorite')}
            />
            {listenerMainStatusView}
            <ScrollView
              contentContainerStyle={{
                marginBottom: 15,
                marginTop: 10,
              }}
              horizontal={true}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}>
              {listenerLoading === false &&
                !listenerError &&
                listenerData.length <= 0 && (
                  <View
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'center',
                      width: '100%',
                      marginTop: '10%',
                    }}>
                    <Text
                      style={{
                        color: '#eee',
                        textAlign: 'center',
                        fontSize: scale(12),
                      }}>
                      You have no favourite songs.Listen and like a song
                    </Text>
                  </View>
                )}
              {songList}
            </ScrollView>

            {/* FOLLOWED USERS View */}
            <SingleViewHeader
              title="Favourite Artists"
              onPress={() => navigation.navigate('Artist')}
            />
            {followMainView}
            <ScrollView
              contentContainerStyle={{
                marginBottom: 15,
                marginTop: 10,
              }}
              horizontal={true}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}>
              {!followError &&
                followLoading === false &&
                followData.length <= 0 && (
                  <View
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'center',
                      width: '100%',
                      marginTop: '10%',
                    }}>
                    <Text
                      style={{
                        color: '#eee',
                        textAlign: 'center',
                        fontSize: scale(12),
                      }}>
                      You have no favourite artist.Follow an artist
                    </Text>
                  </View>
                )}
              {followList}
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default MainListenerLibraryPage;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    width,
    height,
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight(),
      },
    }),
  },
  content: {
    flex: 1,
    width,
    height,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  playlistBtn: {
    position: 'absolute',
    bottom: 10,
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
});

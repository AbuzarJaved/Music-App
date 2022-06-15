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
  get_All_User_Album,
  store_Active_Album_Details,
} from '../../../redux/actions/MediaActions/AlbumActions/index';
import {get_All_Artist} from '../../../redux/actions/artistActions';
import {
  get_User_Media_Listening_History,
  get_Artist_Media,
  get_Media,
} from '../../../redux/actions/MediaActions/getMediaActions';
import SmallErrorModalPopUp from '../../../Components/Modal/SmallErrorModalPopUp';
import {CLEAR_PLAYLIST_ERROR} from '../../../redux/constants';
import SingleViewHeader from '../component/SingleViewHeader';
import PlaylistComponent from '../../../Components/LibrarySongs/components/PlaylistComponent';
import AlbumComponent from '../../../Components/LibrarySongs/components/AlbumComponent';
import ArtistComponent from '../../../Components/LibrarySongs/components/ArtistComponent';
import SongsContainer from '../../../Components/LibrarySongs/components/SongsContainer';
import RecentlyDiscovered from '../../../Components/LibrarySongs/components/RecentlyDiscovered';
import LinearGradient from 'react-native-linear-gradient';
import {loadDataFromStorage} from '../../../utils/asyncStorage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DiscoveryImage from '../../../assests/images/playlist-image-placeholder.png';
import {scale, ScaledSheet} from 'react-native-size-matters';
import DiscoveredSongContainer from '../../../Components/LibrarySongs/components/DiscoveredSongsCont';
import {get_Listener_Liked_Media} from '../../../redux/actions/MediaActions/getMediaActions';

const {width, height} = Dimensions.get('window');

const MainArtistLibraryPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(30);
  const getMedia = useSelector(state => state.getMedia);
  const {loading, error, data: artistMedias} = getMedia;
  const getAllUserPlaylist = useSelector(state => state.getAllUserPlaylist);
  const getAllArtists = useSelector(state => state.getAllArtists);
  const getListenerLikedMedia = useSelector(
    state => state.getListenerLikedMedia,
  );
  const {
    loading: playlistLoading,
    error: playlistError,
    data: playlistData,
  } = getAllUserPlaylist;

  const {
    loading: artistLoading,
    error: artistError,
    artists: artistsData,
  } = getAllArtists;
  const {
    loading: listenerLoading,
    error: listenerError,
    data: listenerData,
  } = getListenerLikedMedia;

  const getAllUserAlbum = useSelector(state => state.getAllUserAlbum);
  const {
    data: albumData,
    loading: albumLoading,
    error: albumError,
  } = getAllUserAlbum;

  const dicoveryMedia = [];

  useFocusEffect(
    useCallback(() => {
      //   const getAllArtistData = async () => {
      //   const artistAlbums = await loadDataFromStorage('artistAlbums');
      if (albumData && albumData.length <= 0)
        dispatch(get_All_User_Album(page, size));

      //   const userPlaylist = await loadDataFromStorage('userPlaylists');
      if (playlistData && playlistData.length <= 0)
        dispatch(get_All_User_Playlist(page, size));

      if (artistMedias && artistMedias.length <= 0) {
        dispatch(get_Media(page, size));
      }
      //   };
      //   getAllArtistData();
    }, []),
  );

  const playlistNavigate = val => {
    dispatch(store_Active_Playlist_Details(val));
    navigation.navigate('SinglePlayList');
  };
  const albumNavigate = val => {
    dispatch(store_Active_Album_Details(val));
    navigation.navigate('SingleAlbum');
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

  const albumList = albumData
    ?.slice(0, 5)
    .map((data, index) => (
      <AlbumComponent
        {...data}
        key={index}
        onPress={() => albumNavigate(data)}
      />
    ));

  const songsList = artistMedias
    ?.slice(0, 5)
    .map((data, index) => (
      <SongsContainer {...data} allSongs={artistMedias} key={index} />
    ));

  const dataList2 = artistsData?.slice(0, 5).map((data, index) => (
    <ArtistComponent
      {...data}
      key={index}
      onPress={() =>
        navigation.navigate('Single_Artist_Profile', {
          screen: 'Single_Artist_Profile',
          params: data,
        })
      }
    />
  ));

  const getPlaylistDataAgain = () => {
    dispatch({
      type: CLEAR_PLAYLIST_ERROR,
    });
    dispatch(get_All_User_Playlist(page, size));
  };

  let playlistErrorView = null;
  let playlistLoadingView = null;
  let artistLoadingView = null;
  let artistErrorView = null;
  let albumMainView = null;
  let songsMainView = null;
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
  if (albumError) {
    albumMainView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_All_User_Album(page, size))}>
        <Text style={{color: '#999', fontSize: 12, textAlign: 'center'}}>
          {albumError}
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
  } else if (albumLoading) {
    albumMainView = <ActivityIndicator size="small" color="#F68128" />;
  } else if (albumData && albumData.length > 0 && !albumLoading) {
    albumMainView = (
      <ScrollView
        contentContainerStyle={{
          marginBottom: 15,
          marginTop: 10,
        }}
        horizontal={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        {albumList}
      </ScrollView>
    );
  }
  if (error) {
    songsMainView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_Media(page, size))}>
        <Text style={{color: '#999', fontSize: 12, textAlign: 'center'}}>
          {error}
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
  } else if (loading) {
    songsMainView = <ActivityIndicator size="small" color="#F68128" />;
  } else if (artistMedias && artistMedias.length > 0 && !loading) {
    songsMainView = (
      <ScrollView
        contentContainerStyle={{
          marginBottom: 15,
          marginTop: 10,
        }}
        horizontal={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        {songsList}
      </ScrollView>
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
              {/* <DiscoveredSongContainer
                name="Recently Discovered"
                media={dicoveryMedia}
                discoveryImage={DiscoveryImage}
                onPress={() => navigation.navigate('DiscoveredSongs')}
              /> */}
              {playlistLoading === false &&
                !playlistError &&
                playlistData.length <= 0 && (
                  <View
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'center',
                      width: '50%',
                      marginTop: '10%',
                    }}>
                    <Text
                      style={{
                        color: '#eee',
                        textAlign: 'center',
                        fontSize: scale(12),
                      }}>
                      You have no playlist. Please create new playlist
                    </Text>
                  </View>
                )}
              {dataList}
            </ScrollView>

            {/* Songs View */}
            <SingleViewHeader
              title="Songs"
              onPress={() => navigation.navigate('Favorite')}
            />
            {songsMainView}

            {/* Songs View */}
            <SingleViewHeader
              title="Albums"
              onPress={() => navigation.navigate('Album')}
            />
            {albumMainView}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default MainArtistLibraryPage;

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

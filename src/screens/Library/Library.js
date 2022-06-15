import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LibraryComponent from '../../Components/LibrarySongs/LibrarySongs';
import LibraryHeader from './component/LibraryHeader';
import LibraryScreens from './component/LibraryScreens';
import data from '../../data';
import GeneralSongs from '../../Components/LibrarySongs/GeneralSong';
import PlaylistIcon from '../../Components/Icons/PlaylistIcon';
import LikeIcon from '../../Components/Icons/LikeIcon';
import AlbumIcon from '../../Components/Icons/LibraryIcon';
import ArtistIcon from '../../Components/Icons/ArtistIcon';
import HistoryIcon from '../../Components/Icons/HistoryIcon';
import DownloadIcon from '../../Components/Icons/DownloadIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {get_All_Playlists} from '../../redux/actions/MediaActions/PlayListActions/index';
import SmallErrorModalPopUp from '../../Components/Modal/SmallErrorModalPopUp';
import {CLEAR_PLAYLIST_ERROR} from '../../redux/constants';

const {width, height} = Dimensions.get('window');

const Library = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const getAllPlaylist = useSelector((state) => state.getAllPlaylist);
  const {
    loading: playlistLoading,
    error: playlistError,
    data: playlistData,
  } = getAllPlaylist;
  const LibaryNav = [
    {
      icon: () => <PlaylistIcon color="#f68128" />,
      link: 'CreatePlaylist',
      screen: 'CreatePlaylist',
      onPress:
        playlistData.length > 0
          ? () => navigation.navigate('Playlist')
          : () => navigation.navigate('CreatePlaylist'),
    },
    {
      icon: () => <LikeIcon color="#f68128" />,
      link: 'Songs',
      screen: 'Favorite',
      onPress: () => navigation.navigate('Favorite'),
    },
    {
      icon: () => <AlbumIcon color="#f68128" />,
      link: 'Albums',
      screen: 'Album',
      onPress: () => navigation.navigate('Album'),
    },
    {
      icon: () => <ArtistIcon color="#f68128" />,
      link: 'Artists',
      screen: 'Artist',
      onPress: () => navigation.navigate('Artist'),
    },

    {
      icon: () => <HistoryIcon color="#f68128" />,
      link: 'Listening History',
      screen: 'History',
      onPress: () => navigation.navigate('History'),
    },
    // {
    //   icon: () => <DownloadIcon color="#f68128" width={24} height={24} />,
    //   link: 'Downloaded',
    //   screen: 'Downloaded',
    //  onPress: () => navigation.navigate('Downloaded'),
    // },
  ];

  useEffect(() => {
    dispatch(get_All_Playlists(page, size));
  }, []);

  const clearPlaylistErr = () => {
    dispatch({
      type: CLEAR_PLAYLIST_ERROR,
    });
  };

  let playlistErrorView = null;
  if (playlistError) {
    playlistErrorView = (
      <SmallErrorModalPopUp
        errorState={playlistError}
        clearError={clearPlaylistErr}>
        {playlistError}
      </SmallErrorModalPopUp>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <LibraryHeader />
        {playlistErrorView}
        <View style={styles.content}>
          {/* SCREEN NAVIGATIONS */}
          <View style={{width: '100%'}}>
            <FlatList
              data={LibaryNav}
              keyExtractor={(item) => item.link}
              renderItem={({item}) => <LibraryScreens {...item} />}
            />
          </View>
          {/* RECENTLY PLAYED */}
          <View style={styles.recently}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{color: '#f68128'}}>Recently Discovered Songs</Text>
              <TouchableOpacity activeOpacity={0.6} style={styles.viewAll}>
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="chevron-forward" size={18} color="#f68128" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.title}
              renderItem={({item}) => (
                <GeneralSongs {...item} showLikeBtn="true" />
              )}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default Library;

const styles = StyleSheet.create({
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
    marginTop: 20,
    // paddingVertical: 10,
    paddingHorizontal: 20,
  },
  recently: {
    marginTop: 10,
    flex: 1,
  },
  viewAllText: {
    color: '#f68128',
    fontSize: 10,
    fontFamily: 'Gilroy-Bold',

    right: 0,
    marginRight: 5,
  },
  viewAll: {
    // width: '100%',

    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

// const libraryList = [
//   {title: 'Rebel Rebel', subtitle: 'Mark John', type: 'rock', likes: '200'},
//   {title: 'Apollo', subtitle: 'Kizz Daniel', type: 'R&B', likes: '1000'},
//   {title: 'Carpe Diem', subtitle: 'Olamide', type: 'Hip-Hop', likes: '4000'},
//   {title: "Don't Dull", subtitle: 'Wizkid', type: '3:45', likes: '500'},
//   {title: 'Shopping Spree', subtitle: 'Davido', type: '3:25', likes: '10K'},
//   {title: 'Ye', subtitle: 'Burna Boy', type: 'Afro', likes: '20K'},
//   {title: 'Made in Lagos', subtitle: 'Wizkid', type: 'Afro', likes: '20M'},
//   {title: 'Ghetto Dreams', subtitle: 'Dagrin', type: 'Hip-Hop', likes: '900M'},
//   {title: 'Mama', subtitle: 'Teckno', type: 'Soul', likes: '7000'},
// ];

// const libraryView = libraryList.map((song, index) => (
//   <LibraryComponent {...song} key={index} />
// ));

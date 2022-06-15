import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader/CommonHeader';
import SongContainer from '../../Components/LibrarySongs/GeneralSong';
import data from '../../data';
import {useDispatch, useSelector} from 'react-redux';
import ArtistSongs from './UserTypes/ArtistSongs';
import ListenerSongs from './UserTypes/ListenerSongs';

const {width, height} = Dimensions.get('window');

const FavoriteScreen = () => {
  const userLogin = useSelector(state => state.userLogin);
  const {type} = userLogin;
  return <>{type === 'ARTIST' ? <ArtistSongs /> : <ListenerSongs />}</>;
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    // paddingTop: 80,
  },
  content: {
    // marginTop: 100,
    width,
    flex: 1,
    height,
    paddingHorizontal: 25,
  },
});

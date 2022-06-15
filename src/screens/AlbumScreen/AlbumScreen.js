import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import ArtistAlbum from './ScreenTypes/ArtistAlbum';
import ListenerAlbum from './ScreenTypes/ListenerAlbum';

const AlbumScreen = () => {
  const userLogin = useSelector(state => state.userLogin);
  const {type} = userLogin;
  return <>{type === 'ARTIST' ? <ArtistAlbum /> : <ListenerAlbum />}</>;
};

export default AlbumScreen;

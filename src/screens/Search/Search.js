import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SearchHeader from './SearchHeader';
import SearchContent from './SearchContent';
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import LoadingAnime from '../../Components/Loading/Loading';
// import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import HeaderWithImage from '../../Components/CustomHeader/HeaderWithImage';
import NetworkError from '../NetworkErrorScreen.js/NetworkError';
import {
  get_Media,
  get_Trending_Media,
} from '../../redux/actions/MediaActions/getMediaActions';
import {get_New_Releases} from '../../redux/actions/MediaActions/SearchActions/index';
import SongBottomModal from '../../Components/Modal/SongBottomModal';
import {scale, ScaledSheet} from 'react-native-size-matters';

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(30);
  const getNewReleases = useSelector(state => state.getNewReleases);
  const {
    error: mediaError,
    loading: mediaLoading,
    data: mediaData,
  } = getNewReleases;

  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;

  // useEffect(() => {
  // }, []);
  // useFocusEffect(
  //   useCallback(() => {;
  //   }, []),
  // );
  useFocusEffect(
    useCallback(() => {
      dispatch(get_New_Releases(page, size));
      dispatch(get_Trending_Media(page, size, city, state, country));
    }, []),
  );
  const getMedias = () => {
    dispatch(get_New_Releases(page, size));
    dispatch(get_Trending_Media(page, size, city, state, country));
  };
  let mediaLoadingView = null;
  let networkView = null;
  if (mediaLoading) {
    mediaLoadingView = <LoadingAnime width={70} height={70} />;
  }
  if (mediaError) {
    networkView = <NetworkError errorTitle={mediaError} onPress={getMedias} />;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        {mediaLoadingView}
        {networkView}
        <SongBottomModal />
        <StatusBar barStyle="default" backgroundColor="#000" />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <HeaderWithImage
            onPress={() => navigation.navigate('SearchScreen')}
            navigate
          />
          <SearchHeader />

          <SearchContent />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SearchScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

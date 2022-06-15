import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
} from 'react-native';

import SearchHeader from './SearchHeader';
import SearchContent from './SearchContent';
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LoadingAnime from '../../Components/Loading/Loading';
// import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderWithImage from '../../Components/CustomHeader/HeaderWithImage';
import NetworkError from '../NetworkErrorScreen.js/NetworkError';
import {get_Media} from '../../redux/actions/MediaActions/getMediaActions';
import SongBottomModal from '../../Components/Modal/SongBottomModal';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AllSongsTab from './TabScreens/All_Songs_Screen';
import ArtistTab from './TabScreens/Artists_Screen';

const {width, height} = Dimensions.get('window');

const MainSearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [text, setText] = useState('');
  const getMedia = useSelector((state) => state.getMedia);
  const {error: mediaError, loading: mediaLoading, data: mediaData} = getMedia;

  // useEffect(() => {
  // }, []);
  //
  const myRef = useRef(null);
  const getMedias = () => {
    dispatch(get_Media(page, size));
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
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginRight: 15}}>
          <Icon name="md-arrow-back" size={24} color="#f68128" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search Song"
          style={{color: '#fff'}}
          // ref={inputRef}
          value={text}
          placeholderTextColor="#999"
          onChangeText={(val) => setText(val)}
        />
      </View>
      <View style={styles.content}>
        {/* <ScrollableTabView ref={myRef}>
          <AllSongsTab tabLabel="React" />
          <ArtistTab tabLabel="Flow" />
        </ScrollableTabView> */}
      </View>
    </View>
  );
};

export default MainSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
    }),
  },
  searchHeader: {
    backgroundColor: '#000',
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,

    zIndex: 100,
    elevation: 5,
    borderBottomColor: '#1A1A1A',
    borderWidth: 1,
  },
  content: {
    width,
    height,
    // paddingHorizontal: 20,
  },
});

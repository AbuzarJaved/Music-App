import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeProfile from './HomeComponent/HomeProfile/HomeProfile';
import HomeInfo from './HomeComponent/HomeInfo/HomeInfo';
import HomeAddButton from './Add Button/HomeAddButton';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheets from './HomeComponent/BottomSheet/BottomSheet.js';
import {useSelector, useDispatch} from 'react-redux';
import {CLEAR_ERROR} from '../../redux/constants/index';
import ErrorView from '../../Components/ErrorScreen/DiscoveryErrorScreen';
import {
  login,
  clearData,
  get_User_Profile,
  storeUserCoordinates,
  storeUserLocation,
} from '../../redux/actions/userActions';
import {get_Timeline_Post} from '../../redux/actions/TimelineActions';
import {get_Artist_Profile} from '../../redux/actions/artistActions';
import Comment_Modal from '../../Components/Modal/Comment_Modal';
import SinglePost from './HomeComponent/SinglePost';
import ArtistPostModal from '../../Components/Modal/ArtistPostModal';
import Loader from '../../Components/Animations/ActivityIndicator';
import PlayContainer from '../../Components/Modal/components/PlayContainer';
import BottomSongModal from '../../Components/Modal/SongBottomModal';
import {getUserLocation} from '../../utils/AppPermissions';
import {useFocusEffect} from '@react-navigation/native';
import GeneralBottomSheet from '../../Components/BottomSheet/GeneralBottomSheet';

const {width, height} = Dimensions.get('window');
const Home = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [artistPostModal, setArtistPostModal] = useState(false);
  const [postPics, setPostPics] = useState('');
  const [postSong, setPostSong] = useState('');
  const userLogin = useSelector(state => state.userLogin);
  const getTimelinePost = useSelector(state => state.getTimelinePost);
  const {loading, error, post} = getTimelinePost;
  const {type} = userLogin;
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);

  const openPostModal = () => {
    setArtistPostModal(true);
  };
  const closePostModal = () => {
    setArtistPostModal(false);
  };

  const choosePostsPics = val => {
    setPostPics(val);
  };
  const choosePostsSong = val => {
    setPostSong(val);
  };
  const Bs = useRef(null);
  const openBottomSheet = () => {
    Bs.current.open();
  };
  const closeBottomSheet = () => {
    Bs.current.close();
  };

  const fall = new Animated.Value(1);


  useFocusEffect(
    useCallback(() => {
      dispatch(get_Timeline_Post(page, size));
    }, []),
  );

  let mainStatusView = null;
  if (error) {
    mainStatusView = (
      <ErrorView
        errorTitle={error}
        onPress={() => dispatch(get_Timeline_Post(page, size))}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <BottomSongModal navigating={props.navigation} />
      {mainStatusView}
      <GeneralBottomSheet ref={Bs} height={200} radius={20}>
        <BottomSheets
          onPress={() => closeBottomSheet()}
          navigation={navigation}
        />
      </GeneralBottomSheet>
      <ArtistPostModal
        visible={artistPostModal}
        closePostModal={closePostModal}
        postPics={postPics}
        postSong={postSong}
        choosePostsPics={val => choosePostsPics(val)}
        choosePostsSong={val => choosePostsSong(val)}
      />
      {type === 'ARTIST' && <HomeAddButton onPress={() => openPostModal()} />}

      {/* CONTENT */}
      <Animated.View
        style={{
          marginTop: 10,
          width,
          flex: 1,
          opacity: Animated.add(0.1, Animated.multiply(fall, 0.9)),
        }}>
        <HomeProfile />
        {loading && (
          <View style={{marginTop: 10}}>
            <ActivityIndicator size="small" color="#f68128" />
          </View>
        )}
        <ScrollView
          // onScrollToTop={() => console.log('hELLO')}

          contentContainerStyle={{paddingTop: 20, paddingHorizontal: 20}}>
          {/* <Loader/> */}
          {/* <HomeInfo onPress={Bs} /> */}
          {/* <PlayContainer/> */}
          {post.map((item, index) => (
            <SinglePost
              onPress={openBottomSheet}
              {...item}
              key={index}
              activePost={item}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    position: 'relative',
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
    }), // paddingTop:  10,
  },
  menu_Icon: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Divider from '../Divider/Divider';
import Icon from 'react-native-vector-icons/Ionicons';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import {
  get_All_Playlists,
  add_Media_To_Playlist,
  get_All_User_Playlist,
} from '../../redux/actions/MediaActions/PlayListActions';
import Button from '../../Components/Button/LoginBtn';
import {
  CLEAR_ADD_MEDIA_TO_PLAYLIST,
  CLEAR_PLAYLIST_FORM,
  CLOSE_MEDIA_PLAYLIST_MODAL,
  CLOSE_MEDIA_PLAYLIST_MODAL_FORM,
  OPEN_MEDIA_PLAYLIST_MODAL,
  OPEN_MEDIA_PLAYLIST_MODAL_FORM,
} from '../../redux/constants';
import CreatePlaylistIcon from '../Icons/CreatePlaylistIcon';
import MyPlaylistContainer from '../../screens/Playlist/component/MyPlaylistContainer';
import SmallSuccessPopUpModal from './SmallSuccessModalPopUp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MediaPlaylistModal = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const getAllUserPlaylist = useSelector((state) => state.getAllUserPlaylist);
  const {
    loading: playlistLoading,
    error: playlistError,
    data: playlistData,
  } = getAllUserPlaylist;
  const openSongBottomSheet = useSelector((state) => state.openSongBottomSheet);
  const {
    songDetails: {id: mediaIdentity},
  } = openSongBottomSheet;
  const addMediaToPlaylist = useSelector((state) => state.addMediaToPlaylist);
  const {
    status,
    message,
    loading: mediaAddLoading,
    error: mediaAddError,
  } = addMediaToPlaylist;

  const openMediaPlaylistModal = useSelector(
    (state) => state.openMediaPlaylistModal,
  );
  const {isMediaPlaylistModalOpen} = openMediaPlaylistModal;
  const MainPlaylistView = playlistData.map((data, index) => (
    <MyPlaylistContainer
      {...data}
      key={data.id}
      onPress={() => addMediaToPlaylistFunc(data.id)}
    />
  ));

  let playlistErrorView = null;
  let playlistLoadingView = null;
  let successView = null;
  let mediaAddLoadingView = null;
  let mediaAddErrorView = null;

  const addMediaToPlaylistFunc = (id) => {
    console.log(id, 'PLAYLIST IDENTITY');
    dispatch(add_Media_To_Playlist(mediaIdentity, id));
    // dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL});
  };

  useEffect(() => {
    if (playlistData.length <= 0) {
      dispatch(get_All_User_Playlist(page, size));
    } else {
      null;
    }
  }, []);
  useEffect(() => {
    if (status && status === true) {
      setTimeout(() => {
        dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL});
        dispatch({type: CLEAR_ADD_MEDIA_TO_PLAYLIST});
      }, 700);
    }
  }, [status]);

  if (playlistError) {
    playlistErrorView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_All_User_Playlists(page, size))}>
        <Text
          style={{
            color: '#999',
            fontSize: hp('2%'),
            textAlign: 'center',
            marginTop: 10,
          }}>
          {mediaAddError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: hp('1.7%'),
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
      // <ErrorScreen
      //   errorTitle={playlistError}
      //   onPress={() => dispatch(get_All_User_Playlists(page, size))}
      // />
    );
  }
  if (playlistLoading) {
    playlistLoadingView = (
      <View style={{width: '100%', alignItems: 'center'}}>
        <ActivityIndicator size={60} color="#f68128" />
      </View>
    );
  }

  if (mediaAddError) {
    mediaAddErrorView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(add_Media_To_Playlist(mediaIdentity, id))}>
        <Text
          style={{
            color: '#999',
            fontSize: hp('2%'),
            textAlign: 'center',
            marginTop: 10,
          }}>
          {mediaAddError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: hp('1.7%'),
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
      // <ErrorScreen
      //   errorTitle={mediaAddError}
      //   onPress={() => dispatch(add_Media_To_Playlist(mediaIdentity, id))}
      // />
    );
  }
  if (mediaAddLoading) {
    mediaAddLoadingView = (
      <View style={{width: '100%', alignItems: 'center'}}>
        <ActivityIndicator size={60} color="#f68128" />
      </View>
    );
  }
  if (status === true) {
    successView = (
      <SmallSuccessPopUpModal
        successState={status}
        clearMessage={() => dispatch({type: CLEAR_ADD_MEDIA_TO_PLAYLIST})}>
        {message}
      </SmallSuccessPopUpModal>
    );
  }

  const createPlaylist = () => {
    dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL});
    dispatch({type: OPEN_MEDIA_PLAYLIST_MODAL_FORM});
  };

  let noPlaylistView = null;
  if (playlistData.length <= 0 && !playlistLoading && !playlistError) {
    noPlaylistView = (
      <View style={styles.emptyContent}>
        <View style={{marginBottom: 20}}>
          <CreatePlaylistIcon color="#999" width={80} height={80} />
        </View>
        <Text
          style={{
            color: '#999',
            fontSize: 20,
            fontFamily: 'Gilroy-Bold',
          }}>
          You do not have any playlist yet
        </Text>
        {/* Button */}
        <View style={{width: '80%', marginTop: 50}}>
          <Button title="Create Playlist" onPress={() => createPlaylist()} />
        </View>
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isMediaPlaylistModalOpen}
      onRequestClose={() => dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL})}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View></View>
          <Text style={styles.text}>Add To Playlist</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL})}>
            <Icon name="close-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}>
          <Divider />
        </View>
        {playlistErrorView}
        {playlistLoadingView}
        {successView}
        {mediaAddErrorView}
        {mediaAddLoadingView}
        <View styles={styles.content}>
          <ScrollView
            contentContainerStyle={{
              width: '100%',
              paddingTop: 20,
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}
            showsHorizontalScrollIndicator={false}>
            {playlistData !== [] && <View style={{}}>{MainPlaylistView}</View>}
            {noPlaylistView}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MediaPlaylistModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#111',
    height: '100%',
  },
  content: {
    width: '100%',
    // marginTop: 70,
    // paddingHorizontal: 20,
    // alignItems: 'center',
    height: '100%',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
      android: {
        paddingTop: 20,
      },
    }),
    paddingHorizontal: 25,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  divider: {
    marginTop: 10,
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: '#900',
  },
});

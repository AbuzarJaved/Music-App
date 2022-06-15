import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Divider from '../Divider/Divider';
import CameraIcon from '../Icons/CameraIcon';
// import CustomHeader from '../../../Notifications/component/CustomHeader';
// import CustomHeader from '../../../../Components/CustomHeader/CommonHeader';
import CheckBox from '../../screens/Playlist/subScreens/PlaylistForm/PlayListStateComponent';
// import Switch from '../../../../Components/Switch/Switch';
import Button from '../Button/LoginBtn';

import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import LoadingAnime from '../Loading/Loading';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import {
  get_All_Playlists,
  get_All_User_Playlist,
  create_Playlist_From_Modal,
} from '../../redux/actions/MediaActions/PlayListActions/index';
import {
  CLEAR_PLAYLIST_FORM,
  CLOSE_MEDIA_PLAYLIST_MODAL_FORM,
  OPEN_MEDIA_PLAYLIST_MODAL,
  CLEAR_PLAYLIST_FROM_MODAL_FORM,
} from '../../redux/constants';
import ImageBottomSheetPicker from '../BottomSheet/ImagePicker';
import LoginBtn from '../Button/LoginBtn';
import MainErrorPopUp from './MainErrorPopUp';
import MainSuccessPopUp from './MainSuccessPopUp';

const playListState = [
  {title: 'PUBLIC', id: '1'},
  {title: 'PRIVATE', id: '2'},
];

const CreatePlaylistModal = (props) => {
  const dispatch = useDispatch();
  const createPlaylistFromModal = useSelector(
    (state) => state.createPlaylistFromModal,
  );
  const {loading, error, status} = createPlaylistFromModal;
  const openMediaPlaylistModalForm = useSelector(
    (state) => state.openMediaPlaylistModalForm,
  );
  const {isMediaPlaylistModalFormOpen} = openMediaPlaylistModalForm;

  const [errText, setErrText] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [playlistState, setPlaylistState] = useState('PUBLIC');
  const [playlistArt, setPlaylistArt] = useState('');
  const [playlistArtType, setPlaylistArtType] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [visible, setVisible] = useState(true);

  const bottomSheetRef = useRef(null);

  const closeImagePicker = () => {
    bottomSheetRef.current.close();
  };
  const openImagePicker = () => {
    bottomSheetRef.current.open();
  };
  const chooseImage = (val) => {
    setPlaylistArt(val);
  };
  const chooseImageType = (val) => {
    setPlaylistArtType(val);
  };
  // const choosePlaylistState = (val) => {
  //   setPlaylistState(val);
  // };
  const choosePlaylistState = (val) => {
    if (val === 'PUBLIC') {
      setVisible(true);
    } else {
      setVisible(false);
    }
    setPlaylistState(val);
  };
  const submitPlaylist = () => {
    setErrText('');
    if (name === '') {
      setErrText('Playlist name is required');
    } else {
      dispatch(create_Playlist_From_Modal(name, description, playlistState));
    }
  };
  useEffect(() => {
    if (status && status === true) {
      setName('');
      setDescription('');
      dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL_FORM});

      dispatch({
        type: CLEAR_PLAYLIST_FROM_MODAL_FORM,
      });
      dispatch(get_All_User_Playlist(page, size));
      dispatch({type: OPEN_MEDIA_PLAYLIST_MODAL});
    }
  }, [status]);

  const stateView = playListState.map((item) => (
    <CheckBox
      {...item}
      key={item.id}
      value={playlistState}
      chooseValue={(val) => choosePlaylistState(val)}
    />
  ));

  let loadingView = null;
  let errorView = null;
  if (loading) {
    loadingView = <LoadingAnime width={60} height={60} />;
  }
  if (error) {
    errorView = (
      <MainErrorPopUp
        clearError={() =>
          dispatch({
            type: CLEAR_PLAYLIST_FROM_MODAL_FORM,
          })
        }
        errorState={error}
        clearTime={2000}>
        {error}
      </MainErrorPopUp>
      // <ErrorScreen
      //   errorTitle={error}
      //   onPress={() => dispatch(get_All_Playlists(page, size))}
      // />
    );
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isMediaPlaylistModalFormOpen}
      onRequestClose={() => dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL_FORM})}>
      <View style={styles.container}>
        {loadingView}
        {errorView}
        <View style={styles.header}>
          <View></View>
          <Text style={styles.text}>Create Playlist</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL_FORM})}>
            <Icon name="close-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}>
          <Divider />
        </View>
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={{
              width: '100%',
              paddingTop: 20,
              paddingBottom: 20,
            }}
            showsHorizontalScrollIndicator={false}>
            {/* Image Art */}
            <View style={styles.imageArt}>
              <View style={{position: 'absolute', zIndex: 100}}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => openImagePicker()}>
                  <CameraIcon color="#fff" width={50} height={50} />
                </TouchableOpacity>
              </View>
              <Image
                source={
                  playlistArt !== ''
                    ? {uri: playlistArt}
                    : require('../../assests/images/image-placeholder.png')
                }
                resizeMode="cover"
                style={styles.image}
              />
            </View>

            <View style={{width: '100%', marginTop: 20, paddingHorizontal: 20}}>
              {/* Single Input */}
              <View style={styles.singleInput}>
                <Text style={{color: '#eee', fontSize: 15}}>Playlist Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={(val) => setName(val)}
                  onFocus={() => setErrText('')}
                />
                {errText ? (
                  <Text style={styles.errTexts}>{errText}</Text>
                ) : null}
              </View>
              <View style={{marginTop: 20}}>
                {/* Description Input */}
                <Text style={{color: '#eee', fontSize: 15}}>Description</Text>
                <View style={styles.BioInput}>
                  <Text
                    style={{
                      color: '#eee',
                      marginVertical: 8,
                      fontSize: 12,
                      position: 'absolute',
                      right: 10,
                    }}>
                    {description.length}/ 400
                  </Text>

                  <TextInput
                    multiline={true}
                    style={{
                      width: '100%',
                      paddingHorizontal: 10,
                      color: '#eee',
                    }}
                    value={description}
                    onChangeText={(val) => setDescription(val)}
                  />
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {stateView}
              </View>
              <View style={{marginTop: 50, width: '80%', alignSelf: 'center'}}>
                <Button
                  title="Create Playlist"
                  onPress={() => submitPlaylist()}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <ImageBottomSheetPicker
          ref={bottomSheetRef}
          chooseImagePicture={(val) => chooseImage(val)}
          choosePicType={(val) => chooseImageType(val)}
          closeImagePicker={closeImagePicker}
        />
      </View>
    </Modal>
  );
};

export default CreatePlaylistModal;

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
  imageArt: {
    width: '80%',
    alignSelf: 'center',
    height: 250,
    // backgroundColor: '#555',
    borderRadius: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  singleInput: {
    marginTop: 10,
  },
  input: {
    color: '#eee',
    width: '100%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#444',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  BioInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    height: 150,
    backgroundColor: '#444',
    position: 'relative',
    marginTop: 10,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '20%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bar: {
    width: 100,
    height: 8,
    backgroundColor: '#f68128',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
  modalContentView: {
    width: '100%',
    height: '100%',
    padding: 10,
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
  errTexts: {
    color: '#900',
    fontSize: 12,
  },
});

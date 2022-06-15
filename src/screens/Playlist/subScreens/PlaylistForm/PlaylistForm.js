import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import CameraIcon from '../../../../Components/Icons/CameraIcon';
// import CustomHeader from '../../../Notifications/component/CustomHeader';
import CustomHeader from '../../../../Components/CustomHeader/CommonHeader';
import CheckBox from './PlayListStateComponent';
import Switch from '../../../../Components/Switch/Switch';
import Button from '../../../../Components/Button/LoginBtn';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import ImageBottomSheetPicker from '../../../../Components/BottomSheet/ImagePicker';
import {useDispatch, useSelector} from 'react-redux';
import LoadingAnime from '../../../../Components/Loading/Loading';
import ErrorScreen from '../../../../Components/ErrorScreen/ErrorScreen';
import {
  create_Playlist,
  get_All_Playlists,
  get_All_User_Playlist,
} from '../../../../redux/actions/MediaActions/PlayListActions/index';
import {
  CLEAR_PLAYLIST_FORM,
  CLEAR_PLAYLIST_STATE,
} from '../../../../redux/constants';
import SmallErrorModal from '../../../../Components/Modal/SmallErrorModalPopUp';
import MainSuccessPopUp from '../../../../Components/Modal/MainSuccessPopUp';
import MainErrorPopUp from '../../../../Components/Modal/MainErrorPopUp';

const {width, height} = Dimensions.get('window');

const playListState = [
  {title: 'PUBLIC', id: '1'},
  {title: 'PRIVATE', id: '2'},
];

const PlaylistForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const createPlaylist = useSelector(state => state.createPlaylist);
  const {loading, error, status, message} = createPlaylist;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [playlistState, setPlaylistState] = useState('PUBLIC');
  const [visible, setVisible] = useState(true);
  const [playlistArt, setPlaylistArt] = useState('');
  const [errText, setErrText] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [playlistArtType, setPlaylistArtType] = useState('');
  const bottomSheetRef = useRef(null);

  const closeImagePicker = () => {
    bottomSheetRef.current.close();
  };
  const openImagePicker = () => {
    bottomSheetRef.current.open();
  };
  const chooseImage = val => {
    setPlaylistArt(val);
  };
  const chooseImageType = val => {
    setPlaylistArtType(val);
  };
  const choosePlaylistState = val => {
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
      dispatch(
        create_Playlist(
          name,
          description,
          visible,
          playlistArt,
          playlistArtType,
        ),
      );
    }
  };
  // const func = () => {
  //   navigation.;
  // };
  useEffect(() => {
    if (status && status === true) {
      setName('');
      setDescription('');
      setPlaylistArt('');
      dispatch(get_All_User_Playlist(page, size));
      // navigation.navigate('Playlist');
      setTimeout(() => {
        navigation.navigate('Playlist');
      }, 2500);
    }
    return () => clearTimeout(() => {}, 2500);
  }, [status]);

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: CLEAR_PLAYLIST_STATE,
      });
    }, []),
  );

  const stateView = playListState.map(item => (
    <CheckBox
      {...item}
      key={item.id}
      value={playlistState}
      chooseValue={val => choosePlaylistState(val)}
    />
  ));

  let loadingView = null;
  let errorView = null;
  let emptyNameTextView = null;
  let successView = null;
  if (loading) {
    loadingView = <LoadingAnime width={60} height={60} />;
  }
  if (error) {
    errorView = (
      <MainErrorPopUp
        clearTime={2000}
        clearError={() => dispatch({type: CLEAR_PLAYLIST_FORM})}
        errorState={error}>
        {error}
      </MainErrorPopUp>
    );
  }
  if (errText) {
    emptyNameTextView = (
      <MainErrorPopUp
        clearTime={2000}
        errorState={errText}
        clearError={() => setErrText('')}>
        {errText}
      </MainErrorPopUp>
    );
  }
  if (message) {
    successView = (
      <MainSuccessPopUp
        clearTime={1500}
        successState={message}
        clearSuccess={() => dispatch({type: CLEAR_PLAYLIST_FORM})}>
        {message}
      </MainSuccessPopUp>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View style={styles.container}>
          {loadingView}
          {emptyNameTextView}
          {errorView}
          {successView}
          <CustomHeader title="Create Playlist" />
          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={{width, paddingTop: 20, paddingBottom: 30}}
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
                      : require('../../../../assests/images/image-placeholder.png')
                  }
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
              <View
                style={{width: '100%', marginTop: 20, paddingHorizontal: 20}}>
                {/* Single Input */}
                <View style={styles.singleInput}>
                  <Text style={{color: '#eee', fontSize: 15}}>
                    Playlist Name
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={val => setName(val)}
                  />
                </View>
                <View style={{marginTop: 20}}>
                  {/* Description Input */}
                  <Text style={{color: '#eee', fontSize: 15}}>Description</Text>
                  <View style={styles.BioInput}>
                    <Text
                      style={{
                        color: '#eee',
                        marginVertical: 8,
                        fontSize: 9,
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
                      onChangeText={val => setDescription(val)}
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
                <View
                  style={{marginTop: 50, width: '80%', alignSelf: 'center'}}>
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
            chooseImagePicture={val => chooseImage(val)}
            choosePicType={val => chooseImageType(val)}
            closeImagePicker={closeImagePicker}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PlaylistForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#000',
  },
  content: {
    width,
    // marginTop: 70,
    // paddingHorizontal: 20,
    alignItems: 'center',
    height,
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
});

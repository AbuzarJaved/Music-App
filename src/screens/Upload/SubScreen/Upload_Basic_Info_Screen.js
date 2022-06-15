import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../Components/CustomHeader/CommonHeader';
import LoginBtn from '../../../Components/Button/LoginBtn';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import SingleGenre from '../component/SingleGenre';
import GenreModal from '../component/GenreModal';
import AlbumModal from '../component/AlbumModal';
import {upload_Media} from '../../../redux/actions/MediaActions/Uploads/uploadMediaToApiActions';
import Progress from '../../../Components/ProgressComponent/Progress';
import CheckAnim from '../../../Components/Animations/CheckAnim';
import SuccessView from '../../../Components/Animations/SuccessView';
import UploadProgressScreen from './UploadProgressScreen';
import Message from '../../../Components/Message/Message';
import {getGenres} from '../../../redux/actions/getGenreActions';
import {get_All_User_Album} from '../../../redux/actions/MediaActions/AlbumActions/index';
import SmallErrorPopUp from '../../../Components/Modal/SmallErrorModalPopUp';
import {loadDataFromStorage} from '../../../utils/asyncStorage';
import {scale, ScaledSheet} from 'react-native-size-matters';
import MainErrorPopUp from '../../../Components/Modal/MainErrorPopUp';
import {CLEAR_UPLOAD_DATA} from '../../../redux/constants';

const {width, height} = Dimensions.get('window');

const Upload_Basic_Info_Screen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [featuring, setFeaturing] = useState('');
  const [description, setDescription] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genre, setGenre] = useState('');
  const [genreModal, setGenreModal] = useState(false);
  const [albumId, setAlbumId] = useState('');
  const [album, setAlbum] = useState('');
  const [albumModal, setAlbumModal] = useState(false);
  const [picture, setPicture] = useState('');
  const [errText, setErrText] = useState('');
  const [songErr, setSongErr] = useState('');
  const [genreErrText, setGenreErrText] = useState('');
  // const [albumErrText, setGenreErrText] = useState('');
  const [userMedia, setUserMedia] = useState(null);
  const [userTrimMedia, setUserTrimMedia] = useState(null);
  const [userMediaArt, setUserMediaArt] = useState(null);
  const [genrePage, setGenrePage] = useState(0);
  const [genreSize, setGenreSize] = useState(50);

  //MEDIA UPLOAD
  const uploadMedia = useSelector(state => state.uploadMedia);
  const {path: mediaUri, name: mediaName, type: mediaType} = uploadMedia;

  //TRIMMEDIA
  const uploadTrimMedia = useSelector(state => state.uploadTrimMedia);
  const {
    path: trimMediaUri,
    name: trimMediaName,
    type: trimMediaType,
  } = uploadTrimMedia;

  //MEDIA UPLOAD
  const uploadMediaArt = useSelector(state => state.uploadMediaArt);
  const {
    path: mediaArtUri,
    name: mediaArtName,
    type: mediaArtType,
  } = uploadMediaArt;
  const mediaUploadToApi = useSelector(state => state.mediaUploadToApi);
  const {
    loading: uploadLoading,
    error: uploadError,
    status: uploadStatus,
  } = mediaUploadToApi;
  const uploadProgress = useSelector(state => state.uploadProgress);
  const {progress: upload_Progress} = uploadProgress;

  const getGenreList = useSelector(state => state.getGenreList);
  const {data: genreData} = getGenreList;
  const getAllUserAlbum = useSelector(state => state.getAllUserAlbum);
  const {data: albumData} = getAllUserAlbum;

  useEffect(() => {
    setUserMedia(mediaUri);
    setUserTrimMedia(trimMediaUri);
    setUserMediaArt(mediaArtUri);
  }, [mediaUri, trimMediaUri, mediaArtUri]);
  const featureed = featuring.split(',');

  useEffect(() => {
    if (uploadStatus === true) {
      setTitle('');
      setFeaturing('');
      setGenre('');
      setGenreId('');
      setSongErr('');
      setAlbumId('');
      setAlbum('');
      setDescription('');
    }
  }, [uploadStatus]);

  useEffect(() => {
    if (genreData.length <= 0) {
      dispatch(getGenres(genrePage, genreSize));
    }
  }, []);
  useEffect(() => {
    if (albumData.length <= 0) {
      dispatch(get_All_User_Album(genrePage, genreSize));
    }
  }, []);

  const shareScreen = () => {
    navigation.navigate('Upload_Share');
  };

  // Validate Input
  const validateInput = () => {
    setErrText('');
    setGenreErrText('');
    setSongErr('');
    if (
      title === '' &&
      genre === '' &&
      userMedia === '' &&
      userTrimMedia === ''
    ) {
      setErrText('Title is required');
      setGenreErrText('Genre is required');
      setSongErr('Both Full Song And 15sec trailer required.');
    } else if (title === '') {
      setErrText('Title is required');
    } else if (genre === '') {
      setGenreErrText('Genre is required');
    } else if (userMedia === '' || userTrimMedia === '') {
      setSongErr('Both Full Song And 15sec trailer required.');
    } else if (
      albumId === '' &&
      title !== '' &&
      genre !== '' &&
      userMedia !== '' &&
      userTrimMedia !== ''
    ) {
      dispatch(
        upload_Media(
          userMedia,
          userTrimMedia,
          userMediaArt,
          mediaName,
          trimMediaName,
          mediaArtName,
          mediaType,
          trimMediaType,
          mediaArtType,
          title,
          description,
          genreId,
          featuring,
        ),
      );
    } else if (
      albumId !== '' &&
      title !== '' &&
      genre !== '' &&
      userMedia !== '' &&
      userTrimMedia !== ''
    ) {
      dispatch(
        upload_Media(
          userMedia,
          userTrimMedia,
          userMediaArt,
          mediaName,
          trimMediaName,
          mediaArtName,
          mediaType,
          trimMediaType,
          mediaArtType,
          title,
          description,
          genreId,
          featuring,
          albumId,
        ),
      );
    }
  };

  const openModal = () => {
    setGenreModal(true);
    setGenreErrText('');
  };
  const closeModal = () => {
    setGenreModal(false);
  };
  const chooseGenre = (genre, genreId) => {
    setGenre(genre);
    setGenreId(genreId);
    closeModal();
  };

  const chooseAlbum = (album, albumId) => {
    setAlbum(album);
    setAlbumId(albumId);
    setAlbumModal(false);
  };
  const resetSongErr = () => {
    setSongErr('');
  };
  const func = () => {
    setSongErr('');
    navigation.goBack();
  };
  let uploadLoadingView = null;
  let uploadErrorView = null;
  let uploadStatusView = null;
  if (uploadLoading) {
    uploadLoadingView = (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 500,
        }}>
        <View style={styles.subContent}>
          <Text style={styles.text}>Submitting your Song.....</Text>
          <Progress progress={upload_Progress} />
        </View>
      </View>
    );
  }
  if (uploadError) {
    uploadErrorView = (
      <MainErrorPopUp
        clearTime={2000}
        errorState={uploadError}
        clearError={() => dispatch({type: CLEAR_UPLOAD_DATA})}>
        {uploadError}
      </MainErrorPopUp>
    );
  }
  if (uploadStatus === true) {
    uploadStatusView = <SuccessView />;
  }
  let songErrView = null;
  if (songErr) {
    songErrView = (
      <SmallErrorPopUp
        errorState={songErr}
        clearClientsErr={() => setSongErr('')}>
        {songErr}
      </SmallErrorPopUp>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {uploadErrorView}
      <SafeAreaView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <CustomHeader title="Song Information" func={func} />
            <GenreModal
              genre={genre}
              chooseGenre={(val1, val2) => chooseGenre(val1, val2)}
              closeGenreModal={closeModal}
              genreModal={genreModal}
              tryAgain={() => dispatch(getGenres(genrePage, genreSize))}
            />
            <AlbumModal
              album={album}
              chooseAlbum={(val1, val2) => chooseAlbum(val1, val2)}
              closeAlbumModal={() => setAlbumModal(false)}
              albumModal={albumModal}
              tryAgain={() =>
                dispatch(get_All_User_Album(genrePage, genreSize))
              }
            />

            <View style={styles.content}>
              {uploadLoadingView}
              {/* {uploadErrorView} */}
              {uploadStatusView}
              {/* <SuccessView /> */}
              <KeyboardAwareScrollView
                contentContainerStyle={{
                  marginTop: '10%',

                  // flex: 1,
                }}
                showsVerticalScrollIndicator={false}>
                {songErrView}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                    width: '100%',
                  }}>
                  <Icon
                    name="md-information-circle"
                    size={20}
                    color="#ff3333"
                  />
                  <Text
                    style={{
                      color: '#999',
                      fontSize: scale(10),
                      fontFamily: 'Helvetica-Regular',
                      marginLeft: scale(3),
                      textAlign: 'left',
                      width: '90%',
                    }}>
                    &nbsp;Featured artists names must be seperated with a&nbsp;
                    <Text style={{color: '#f68128'}}>comma ( , ) .</Text>
                  </Text>
                </View>
                {/* Single Input */}
                <View style={styles.singleInput}>
                  <Text style={{color: '#eee', fontSize: scale(12)}}>
                    Title
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={val => setTitle(val)}
                    onFocus={() => setErrText('')}
                  />
                  {errText ? (
                    <Text style={styles.errTexts}>{errText}</Text>
                  ) : null}
                </View>
                {/* Single Input */}
                <View style={styles.singleInput}>
                  <Text style={{color: '#eee', fontSize: scale(12)}}>
                    Description
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={val => setDescription(val)}
                  />
                </View>
                {/* Single Input */}
                <View style={styles.singleInput}>
                  <Text style={{color: '#eee', fontSize: scale(12)}}>
                    Featured Artist
                    <Text style={{color: '#f68128', fontSize: scale(10)}}>
                      &nbsp;( Seperate names with a comma ( , )&nbsp;)
                    </Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={featuring}
                    onChangeText={val => setFeaturing(val)}
                  />
                </View>

                <View style={styles.inputFlex}>
                  <View style={styles.genre}>
                    <Text style={{color: '#eee', fontSize: scale(12)}}>
                      Genre
                    </Text>
                    <TouchableOpacity
                      onPress={() => openModal()}
                      activeOpacity={0.7}
                      style={styles.genreCont}>
                      <Text
                        style={{
                          color: '#eee',
                          fontSize: scale(11),
                          width: '90%',
                        }}>
                        {genre}
                      </Text>
                      <Icon name="chevron-down" color="#eee" size={25} />
                    </TouchableOpacity>
                    {genreErrText ? (
                      <Text style={styles.errTexts}>{genreErrText}</Text>
                    ) : null}
                  </View>

                  <View style={styles.genre}>
                    <Text style={{color: '#eee', fontSize: scale(12)}}>
                      Album
                    </Text>
                    <TouchableOpacity
                      onPress={() => setAlbumModal(true)}
                      activeOpacity={0.7}
                      style={styles.genreCont}>
                      <Text
                        style={{
                          color: '#eee',
                          fontSize: scale(13),
                          width: '90%',
                        }}>
                        {album}
                      </Text>
                      <Icon name="chevron-down" color="#eee" size={25} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* NEXT STEP BTN */}
                <View style={styles.stepBtn}>
                  <View style={styles.navBtn}>
                    <LoginBtn
                      title="Back"
                      onPress={() => navigation.goBack()}
                    />
                  </View>
                  <View style={styles.navBtn}>
                    <LoginBtn
                      title="Submit"
                      // onPress={() => shareScreen()}
                      onPress={() => validateInput()}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

export default Upload_Basic_Info_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    // marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width,
    flex: 1,

    paddingHorizontal: 20,
  },
  singleInput: {
    width: '100%',
    // paddingHorizontal: 30,
    marginTop: 20,
  },
  input: {
    color: '#eee',
    width: '100%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#444',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,

    height: 70,
  },
  navBtn: {
    marginHorizontal: 10,
    width: '45%',
  },
  errTexts: {
    color: '#900',
    fontSize: 12,
  },
  genreCont: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#444',
    // marginHorizontal: 30,
    padding: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genre: {
    width: '48%',
    marginVertical: 10,
    // alignItems: 'center',
  },
  browseCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  btn: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#999',
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContent: {
    borderWidth: 1,
    borderColor: '#222',
    height: '80%',
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#222',
  },
  text: {
    marginBottom: 20,
    color: '#eee',
    textAlign: 'center',
    fontSize: 13,
  },
});

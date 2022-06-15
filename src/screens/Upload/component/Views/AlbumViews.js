import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import LoginBtn from '../../../../Components/Button/LoginBtn';
import LoadingAnime from '../../../../Components/Loading/Loading';
import MainSuccessPopUp from '../../../../Components/Modal/MainSuccessPopUp';
import MainErrorPopUp from '../../../../Components/Modal/MainErrorPopUp';
import CameraIcon from '../../../../Components/Icons/CameraIcon';
import {create_Album} from '../../../../redux/actions/MediaActions/AlbumActions/index';
import ImageBottomSheetPicker from '../../../../Components/BottomSheet/ImagePicker';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {CLEAR_ALBUM_FORM} from '../../../../redux/constants';

const AlbumViews = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [albumArt, setAlbumArt] = useState('');
  const [albumArtType, setAlbumArtType] = useState('');
  const [errText, setErrText] = useState('');
  const [albumErr, setAlbumErr] = useState('');
  const bottomSheetRef = useRef(null);
  console.log(albumArtType, 'ALBUM TYPE');

  const createAlbum = useSelector(state => state.createAlbum);
  const {loading, error, status, message} = createAlbum;

  const closeImagePicker = () => {
    bottomSheetRef.current.close();
  };
  const openImagePicker = () => {
    bottomSheetRef.current.open();
  };

  const chooseImage = val => {
    setAlbumArt(val);
  };
  const chooseImageType = val => {
    setAlbumArtType(val);
  };

  useEffect(() => {
    if (status && status === true) {
      setName('');
      setDescription('');
      setYear('');
      setAlbumArt('');
      setAlbumArtType('');
    }
  }, [status]);

  let loadingView = null;
  let errorView = null;
  let successView = null;
  let statusView = null;
  if (loading) {
    statusView = <LoadingAnime width={50} height={50} />;
  } else if (error) {
    statusView = (
      <MainErrorPopUp
        clearTime={2000}
        errorState={error}
        clearError={() => dispatch({type: CLEAR_ALBUM_FORM})}>
        {error}
      </MainErrorPopUp>
    );
  } else if (status === true) {
    statusView = (
      <MainSuccessPopUp
        clearSuccess={() => dispatch({type: CLEAR_ALBUM_FORM})}
        successState={message}
        clearTime={2000}>
        {message}
      </MainSuccessPopUp>
    );
  } else if (errText) {
    statusView = (
      <MainErrorPopUp
        clearTime={2000}
        errorState={errText}
        clearError={() => setErrText('')}>
        {errText}
      </MainErrorPopUp>
    );
  } else if (albumErr) {
    statusView = (
      <MainErrorPopUp
        clearTime={2000}
        errorState={albumErr}
        clearError={() => setAlbumErr('')}>
        {albumErr}
      </MainErrorPopUp>
    );
  } else {
    statusView = null;
  }

  const submit = () => {
    setErrText('');
    if (name === '') {
      setErrText('Album name is required');
    } else if (year === '') {
      setErrText('Album year is required');
    } else if (name === '' && year === '') {
      setErrText('Album name and year  are both required');
    } else if (albumArt === '') {
      setAlbumErr('Album art is required');
    } else {
      dispatch(create_Album(albumArt, albumArtType, name, description, year));
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: '50%'}}>
      <View style={styles.container}>
        {statusView}
        <View style={{}}>
          <ScrollView
            contentContainerStyle={{
              width: '100%',
              //   paddingTop: 20,
              paddingBottom: 30,
            }}
            showsHorizontalScrollIndicator={false}>
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
                  albumArt !== ''
                    ? {uri: albumArt}
                    : require('../../../../assests/images/image-placeholder.png')
                }
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <View style={styles.inputView}>
              {/* Single Input */}
              <View style={styles.singleInput}>
                <Text style={{color: '#eee', fontSize: scale(12)}}>
                  Album name
                </Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={val => setName(val)}
                />
              </View>
              <View style={{marginTop: 20}}>
                {/* Description Input */}
                <Text style={{color: '#eee', fontSize: scale(12)}}>
                  Album description
                </Text>
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
              {/* Single Input */}
              <View style={styles.singleInput}>
                <Text style={{color: '#eee', fontSize: scale(12)}}>
                  Album year
                </Text>
                <TextInput
                  style={styles.input}
                  value={year}
                  keyboardType="number-pad"
                  onChangeText={val => setYear(val)}
                />
              </View>

              <View
                style={{
                  width: '80%',
                  marginTop: scale(50),
                  alignSelf: 'center',
                }}>
                <LoginBtn title="Create Album" onPress={() => submit()} />
              </View>
            </View>
            <ImageBottomSheetPicker
              ref={bottomSheetRef}
              chooseImagePicture={val => chooseImage(val)}
              choosePicType={val => chooseImageType(val)}
              closeImagePicker={closeImagePicker}
            />
          </ScrollView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AlbumViews;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // flex: 1,
  },
  imageArt: {
    width: '60%',
    alignSelf: 'center',
    height: '160@s',
    // backgroundColor: '#555',
    borderRadius: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
  inputView: {
    width: '100%',
    marginTop: '15@s',
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
});

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import LoginBtn from '../../../../Components/Button/LoginBtn';
import SingleUpload from '../SingleUploadType';
import DocumentPicker from 'react-native-document-picker';
import {pickSingleSong, pickSinglePicture} from '../../../../utils/FilePicker';
import {
  chooseMedia,
  chooseMediaArt,
  chooseTrimMedia,
} from '../../../../redux/actions/MediaActions/Uploads/uploadActions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import MainErrorPopUp from '../../../../Components/Modal/MainErrorPopUp';

const songType = [
  {title: 'Full Song', id: 1},
  {title: 'Trim Version', id: 2},
];

const SongsView = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  //MEDIA UPLOAD
  const uploadMedia = useSelector(state => state.uploadMedia);
  const {
    loading: mediaLoading,
    error: mediaError,
    name: mediaName,
    path: mediaUri,
  } = uploadMedia;

  //TRIMMEDIA
  const uploadTrimMedia = useSelector(state => state.uploadTrimMedia);
  const {
    loading: trimMediaLoading,
    error: trimMediaError,
    name: trimMediaName,
    path: trimMediaUri,
  } = uploadTrimMedia;

  //MEDIA UPLOAD
  const uploadMediaArt = useSelector(state => state.uploadMediaArt);
  const {
    loading: mediaArtLoading,
    error: mediaArtError,
    name: mediaArt,
    path: mediaArtUri,
  } = uploadMediaArt;

  const [type, setType] = useState('Full Song');
  const [errText, setErrText] = useState('');

  const changeType = val => {
    setType(val);
  };

  const trimSong = () => {
    if (Platform.OS === 'android') {
      setErrText('Trimmer not available on Android yet');
    } else {
      navigation.navigate('Trim_Upload');
    }
  };

  let errTextView = null;
  if (errText) {
    errTextView = (
      <MainErrorPopUp
        clearTime={2000}
        errorState={errText}
        clearError={() => setErrText('')}>
        {errText}
      </MainErrorPopUp>
    );
  }

  return (
    <View style={styles.container}>
      {errTextView}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="md-information-circle" size={20} color="#ff3333" />
        <Text
          style={{
            color: '#999',
            fontSize: scale(11),
            fontFamily: 'Helvetica-Bold',
          }}>
          &nbsp;&nbsp;Both Full Song And 15sec trailer required.
        </Text>
      </View>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* SINGLE VIEW */}
          <View style={styles.singleView}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => changeType('Full Song')}>
              <View style={styles.singleBox}>
                <View style={[styles.check]}>
                  {type === 'Full Song' && (
                    <View style={[styles.activeCheck]}></View>
                  )}
                </View>
                <Text style={{color: '#eee', fontSize: scale(11)}}>
                  Full Song
                </Text>
              </View>
            </TouchableOpacity>
            {/* File View */}
            {type === 'Full Song' && (
              <View style={styles.browseView}>
                <View activeOpacity={0.7} style={styles.genreCont}>
                  <Text style={{color: '#eee', fontSize: 11}}>
                    {mediaName ? mediaName : 'song name'}
                  </Text>
                </View>
                {mediaLoading ? (
                  <ActivityIndicator color="#f68128" size="large" />
                ) : (
                  <LoginBtn
                    width="30%"
                    height={50}
                    title="Browse"
                    onPress={() => dispatch(chooseMedia())}
                  />
                )}
              </View>
            )}
          </View>
          {/* SINGLE VIEW */}
          <View style={styles.singleView}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => changeType('Trim Version')}>
              <View style={styles.singleBox}>
                <View style={[styles.check]}>
                  {type === 'Trim Version' && (
                    <View style={[styles.activeCheck]}></View>
                  )}
                </View>
                <Text style={{color: '#eee', fontSize: scale(11)}}>
                  Trimmed Version
                </Text>
              </View>
            </TouchableOpacity>
            {/* File View */}
            {type === 'Trim Version' && (
              <>
                <Text style={{color: '#eee', fontSize: 12, marginBottom: 10}}>
                  Trimmed length should not exceed 15 seconds
                </Text>
                <View style={styles.browseView}>
                  <View activeOpacity={0.7} style={styles.genreCont}>
                    <Text style={{color: '#eee', fontSize: 11}}>
                      {trimMediaName ? trimMediaName : 'trimmed song'}
                    </Text>
                  </View>
                  {trimMediaLoading ? (
                    <ActivityIndicator color="#f68128" size="large" />
                  ) : (
                    <LoginBtn
                      width="30%"
                      height={50}
                      title="Browse"
                      onPress={() => dispatch(chooseTrimMedia())}
                    />
                  )}
                </View>
                <View style={{width: '100%', marginTop: 10}}>
                  <Text
                    style={{color: '#eee', fontSize: 13, textAlign: 'center'}}>
                    Or
                  </Text>
                  <Text
                    style={{
                      color: '#eee',
                      fontSize: scale(11),
                      textAlign: 'center',
                    }}>
                    Use our in-built trimmer
                  </Text>
                  <View style={{marginTop: 15, alignSelf: 'center'}}>
                    <LoginBtn
                      width="40%"
                      height={40}
                      title="Trim Song"
                      textSize={12}
                      onPress={() => trimSong()}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
          {/* SINGLE VIEW */}
          <View style={styles.singleView}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => changeType('Song Art')}>
              <View style={styles.singleBox}>
                <View style={[styles.check]}>
                  {type === 'Song Art' && (
                    <View style={[styles.activeCheck]}></View>
                  )}
                </View>
                <Text style={{color: '#eee', fontSize: scale(12)}}>
                  Song Art
                </Text>
              </View>
            </TouchableOpacity>
            {/* File View */}
            {type === 'Song Art' && (
              <View style={styles.browseView}>
                <View activeOpacity={0.7} style={styles.genreCont}>
                  <Text style={{color: '#eee', fontSize: 11}}>
                    {mediaArt ? mediaArt : 'song art'}
                  </Text>
                </View>
                {mediaArtLoading ? (
                  <ActivityIndicator color="#f68128" size="large" />
                ) : (
                  <LoginBtn
                    width="30%"
                    height={50}
                    title="Browse"
                    onPress={() => dispatch(chooseMediaArt())}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SongsView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    width: '100%',
    marginTop: 20,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#eee',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCheck: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: '#f68128',
  },
  singleBox: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  genreCont: {
    width: '65%',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#444',
    // marginHorizontal: 30,
    paddingVertical: 12,
    paddingLeft: 5,
  },
  browseView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleView: {
    marginBottom: 25,
  },
});

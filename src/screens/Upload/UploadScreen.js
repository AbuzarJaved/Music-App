import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CheckBox} from 'native-base';
// import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../Components/CustomHeader/CommonHeader';
import LoginBtn from '../../Components/Button/LoginBtn';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SingleUploads from './component/SingleUploadType';
// VIEWS
import SongView from './component/Views/SongsView';
import AlbumView from './component/Views/AlbumViews';
import VideoView from './component/Views/VideoViews';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const uploads = [
  {title: 'Song', id: 1},
  {title: 'Album/Ep', id: 2},
  {title: 'Video', id: 3},
];

const UploadScreen = () => {
  const navigation = useNavigation();

  const [type, setType] = useState('Song');
  const changeType = (val) => {
    setType(val);
  };
  const nextPage = () => {
    if (type) {
      navigation.navigate('Upload_Info');
    }
  };
  const uploadTypeView = uploads.map((item) => (
    <SingleUploads
      {...item}
      key={item.id}
      type={type}
      chooseUpload={() => changeType(item.title)}
    />
  ));

  let subView = null;
  if (type === 'Song') {
    subView = <SongView />;
  } else if (type === 'Album/Ep') {
    subView = <AlbumView />;
  } else {
    subView = <VideoView />;
  }
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <CustomHeader title="Upload " />
          <View style={styles.content}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{height: '100%'}}>
              <Text
                style={{
                  color: '#eee',
                  textAlign: 'center',
                  fontSize: scale(12),
                  fontFamily: 'Gilroy-Bold',
                }}>
                Please select the upload type
              </Text>
              <Text
                style={{
                  color: '#f68128',
                  textAlign: 'center',
                  fontSize: scale(10),
                  fontFamily: 'Gilroy-Bold',
                  marginTop: 10,
                }}>
                (formats allowed include mp3, mp4)
              </Text>
              <View style={styles.checkBox}>{uploadTypeView}</View>
              {/* SUBVIEWS */}
              <View style={styles.subView}>{subView}</View>
              {type === 'Song' && (
                <View
                  style={{
                    width: '70%',
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: '2%',
                  }}>
                  <LoginBtn title="Next" onPress={() => nextPage()} />
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    // paddingBottom: 100,
  },
  content: {
    marginTop: 20,
    // paddingTop: 50,
    width,
    flex: 1,
  },
  checkBox: {
    width,
    // flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    // paddingVertical: 50,
  },
  subView: {
    paddingTop: 30,
    width: '100%',
    paddingHorizontal: 30,
  },
});

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CustomHeader from '../../Notifications/component/CustomHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import UploadFileIcon from '../../../Components/Icons/Upload_File_Icon';
import {downloadSong} from '../../../utils/RNnFetchBlobFunc';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from 'react-redux';
import {addTrimTrackDetails} from '../../../redux/actions/trimTrackActions';

const {width, height} = Dimensions.get('window');

const Upload1 = (props) => {
  const navigation = useNavigation();
  const dirs = RNFetchBlob.fs.dirs;
  const dispatch = useDispatch();
  // console.log(props.route, 'Home transfer');
  const pickSong = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      if (res) {
        dispatch(addTrimTrackDetails(res));
        navigation.navigate('Trim_Upload');
      }

      // if (res && res.uri) {
      //   RNFetchBlob.fetch(
      //     'POST',
      //     res.uri,
      //     {
      //       'Content-Type': 'application/octet-stream',
      //     },
      //     // RNFetchBlob.wrap(res.uri),
      //   )
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((err) => {
      //       // error handling ..
      //       console.log(err, 'ERR');
      //     });
      // }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log(err);
      } else {
        throw err;
      }
    }
  };
  const nextPage = () => {
    pickSong();
    navigation.navigate('Trim_Upload');
  };

  // console.log(dirs.DocumentDir);
  // console.log(dirs.CacheDir);
  // console.log(dirs.DCIMDir);
  // console.log(dirs.DownloadDir);
  // console.log(dirs.SDCardDir);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomHeader title="Upload" />
        <Text style={styles.text}>Upload your Music</Text>
        <View style={styles.content}>
          <View style={styles.subContent}>
            <View style={{}}>
              <UploadFileIcon color="#f69129" width={50} height={50} />
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.6}
              onPress={() => pickSong()}>
              <Icon name="add-circle" size={30} color="#eee" />
              <Text style={styles.btnText}>Browse From File</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// navigation.navigate('Upload_Progress');
export default Upload1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    // paddingBottom: 100,
  },
  content: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 60,
    paddingTop: 50,
    color: '#eee',
    textAlign: 'center',
    fontSize: 15,
  },
  subContent: {
    borderWidth: 1,
    borderColor: '#999',
    height: '80%',
    width: '80%',
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btn: {
    width: '100%',
    borderRadius: 20,
    height: 60,
    borderWidth: 1,
    padding: 12,
    alignSelf: 'center',
    backgroundColor: '#f68126',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -50,
  },
  btnText: {
    color: '#eee',
    marginLeft: 10,
  },
});

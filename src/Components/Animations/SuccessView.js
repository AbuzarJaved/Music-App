import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckAnim from './CheckAnim';
import {useDispatch, useSelector} from 'react-redux';
import {CLEAR_UPLOAD_DATA} from '../../redux/constants';
import {useNavigation} from '@react-navigation/native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginBtn from '../../Components/Button/LoginBtn';

const SuccessView = props => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mediaUploadToApi = useSelector(state => state.mediaUploadToApi);
  const {
    loading: uploadLoading,
    error: uploadError,
    status: uploadStatus,
    message: uploadMessage,
  } = mediaUploadToApi;

  // useEffect(() => {
  //   if (uploadStatus === true) {
  //     setShow(true);
  //     setTimeout(() => {
  //       setShow(false);
  //       dispatch({
  //         type: CLEAR_UPLOAD_DATA,
  //       });
  //       navigation.navigate('Upload_Share');
  //     }, 2000);
  //   }
  // }, [uploadStatus]);
  const navigate = () => {
    setShow(false);
    dispatch({type: CLEAR_UPLOAD_DATA});
    navigation.navigate('Upload_Share');
  };

  if (show === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.subContent}>
        <Text style={styles.text}>{uploadMessage}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="md-information-circle"
            size={20}
            color="#ff3333"
            style={{width: '8%'}}
          />
          <Text
            style={{
              color: '#ddd',
              fontSize: scale(11),
              fontFamily: 'Helvetica-Regular',

              textAlign: 'left',
              width: '90%',
              lineHeight: scale(12),
            }}>
            Artists can only have one trimmed version of there (any) song on the
            discover screen.If you have a trimmed song uploaded to the discover
            screen where users discover artists, uploading a new one will
            overwrite the former trimmed song.
          </Text>
        </View>
        <View style={{marginTop: scale(50)}}>
          <Text style={styles.title}>
            Add the new uploaded song to discover page
          </Text>
        </View>
        <View style={styles.flex}>
          <LoginBtn
            title="NO"
            width="35%"
            height="35%"
            onPress={() => navigate()}
          />
          <LoginBtn
            title="YES"
            width="35%"
            height="35%"
            onPress={() => navigate()}
          />
        </View>

        {/* <CheckAnim width={100} height={100} /> */}
      </View>
    </View>
  );
};

export default SuccessView;

const styles = ScaledSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    // opacity: 0.4,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  subContent: {
    borderWidth: 1,
    borderColor: '#222',
    height: '70%',
    width: '90%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#222',
    paddingTop: 10,
  },
  text: {
    marginBottom: 20,
    color: '#eee',
    textAlign: 'center',
    fontSize: '17@s',
    fontFamily: 'Helvetica-Bold',
  },
  title: {
    color: '#eee',
    fontSize: '18@s',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

//  <View style={{flexDirection: 'row'}}>
//           <Icon
//             name="md-information-circle"
//             size={20}
//             color="#ff3333"
//             style={{width: '8%'}}
//           />
//           <Text
//             style={{
//               color: '#ddd',
//               fontSize: scale(11),
//               fontFamily: 'Helvetica-Regular',

//               textAlign: 'left',
//               width: '90%',
//               lineHeight: scale(12),
//             }}>
//             Artists can only have one trimmed version of there (any) song on the
//             discover screen.If you have a trimmed song uploaded to the discover
//             screen where users discover artists, uploading a new one will
//             overwrite the former trimmed song.
//           </Text>
//         </View>
//         <View style={{marginTop: scale(50)}}>
//           <Text style={styles.title}>
//             Add the new uploaded song to discover page
//           </Text>
//         </View>
//         <View style={styles.flex}>
//           <LoginBtn
//             title="NO"
//             width="35%"
//             height="30%"
//             onPress={() => navigate()}
//           />
//           <LoginBtn
//             title="YES"
//             width="35%"
//             height="30%"
//             onPress={() => navigate()}
//           />
//         </View>

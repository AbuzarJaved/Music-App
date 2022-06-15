import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../Notifications/component/CustomHeader';
import ProgressCircle from 'react-native-progress-circle';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const UploadProgressScreen = (props) => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('Upload_Success');
  //   }, 2000);
  // }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomHeader title="Upload" />
        <Text style={styles.text}>Uploading your Song</Text>
        <View style={styles.content}>
          <View style={styles.subContent}>
            <ProgressCircle
              percent={Number(props.progress)}
              radius={150 / 2}
              borderWidth={8}
              color="#f68128"
              shadowColor="#999"
              bgColor="#111"
              outerCircleStyle={{
                width: 150,
                height: 150,
                borderRadius: 150 / 2,
              }}>
              <Text style={{fontSize: 28, color: '#f68128'}}>
                {String(props.progress)}
              </Text>
            </ProgressCircle>
            <Text style={{fontSize: 15, color: '#99999f', marginTop: 20}}>
              Fly Higher.mp3
            </Text>
            <Text style={{fontSize: 15, color: '#f68128', marginTop: 20}}>
              (In progress, 1 out of 1)
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
    fontSize: 13,
  },
  subContent: {
    borderWidth: 1,
    borderColor: '#111',
    height: '80%',
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#111',
  },
});

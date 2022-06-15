import React from 'react';
import {StyleSheet, Text, View, Dimensions, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CustomHeader from '../../Notifications/component/CustomHeader';
import CheckedIcon from '../../../Components/Icons/CheckedIcon';
import LoginBtn from '../../../Components/Button/LoginBtn';
import CheckAnim from '../../../Components/Animations/CheckAnim';

const {width, height} = Dimensions.get('window');

const Upload_Success = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomHeader title="Upload" />
        <Text style={styles.text}>
          Your Song has been Successfully Uploaded
        </Text>
        <View style={styles.content}>
          <View style={styles.subContent}>
            {/* <CheckedIcon color="#45f322" /> */}
            <CheckAnim width={100} height={100} />
          </View>
          <View
            style={{
              flex: 1,
              width: '70%',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <LoginBtn
              title="Proceed"
              onPress={() => navigation.navigate('Trim_Upload')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Upload_Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
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
    width: '65%',
    alignSelf: 'center',
  },
  subContent: {
    borderWidth: 1,
    borderColor: '#111',
    height: '70%',
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#111',
    marginTop: 20,
  },
});

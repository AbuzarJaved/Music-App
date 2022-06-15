import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import CustomHeader from '../../Notifications/component/CustomHeader';
import {useNavigation} from '@react-navigation/native';

import {CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginBtn from '../../../Components/Button/LoginBtn';

const {width, height} = Dimensions.get('window');

const Upload_Release_Screen = () => {
  const [privates, setPrivate] = useState(false);
  const [publics, setPublic] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [songRelease, setSongRelease] = useState('');
  const changeSongRelease = (val) => {
    setSongRelease(val);
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <CustomHeader title="Release" />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.checkBox}>
            {/* SINGLE BOX */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => changeSongRelease('private')}>
              <View style={styles.singleBox}>
                <View style={[styles.check]}>
                  {songRelease === 'private' && (
                    <View style={[styles.activeCheck]}></View>
                  )}
                </View>
                <Text style={{color: '#eee', marginTop: -4, fontSize: 15}}>
                  Private
                </Text>
              </View>
            </TouchableOpacity>
            {/* SINGLE BOX */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => changeSongRelease('public')}>
              <View style={styles.singleBox}>
                <View style={[styles.check]}>
                  {songRelease === 'public' && (
                    <View style={[styles.activeCheck]}></View>
                  )}
                </View>
                <Text style={{color: '#eee', marginTop: -4, fontSize: 15}}>
                  Public
                </Text>
              </View>
            </TouchableOpacity>
            {/* SINGLE BOX */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => changeSongRelease('schedule')}>
              <View style={styles.singleBox}>
                <View style={[styles.check]}>
                  {songRelease === 'schedule' && (
                    <View style={[styles.activeCheck]}></View>
                  )}
                </View>
                <Text style={{color: '#eee', marginTop: -4, fontSize: 15}}>
                  Schedule Date and Time
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* LINK */}
          <View style={styles.linkCont}>
            <Text style={{color: '#eee', marginVertical: 8, fontSize: 15}}>
              Link
            </Text>
            {/* Napollo Link */}
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.input, styles.browseCont]}>
                <Text style={{color: '#eee', width: '100%', paddingLeft: 5}}>
                  Hello
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{alignSelf: 'center', marginHorizontal: 5, marginTop: 5}}
                hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}>
                <Icon name="copy-outline" size={28} color="#999" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{alignSelf: 'center', marginHorizontal: 5, marginTop: 5}}
                hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}>
                <Icon name="ellipsis-vertical" size={28} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
          {/* STEPS */}
          {/* <View
            style={{
              width,
              marginTop: 40,
             
              backgroundColor: "#900",
            
            }}> */}
          <Text
            style={{
              color: '#f68128',
              fontSize: 12,
              marginTop: 40,

              textAlign: 'center',
              // alignSelf: 'center',
            }}>
            Step 3 of 3
          </Text>
          {/* </View> */}
          {/* BTN */}
          {/* NEXT STEP BTN */}
          <View style={styles.stepBtn}>
            <View style={styles.navBtn}>
              <LoginBtn title="Back" onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.navBtn}>
              <LoginBtn
                title="Complete"
                onPress={() => navigation.navigate('Upload_Share')}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Upload_Release_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  checkBox: {
    width,
    marginTop: 30,
    // paddingHorizontal: 30,
    paddingVertical: 30,
    position: 'relative',
  },

  singleBox: {
    flexDirection: 'row',
    margin: 10,
  },
  content: {
    width,
    marginTop: -80,
    height: height,
    flex: 1,
    // backgroundColor: '#900',
    paddingHorizontal: 20,
    justifyContent: 'center',
    // paddingBottom:200
  },
  linkCont: {
    width,
    paddingHorizontal: 20,
  },
  input: {
    color: '#eee',
    width: '70%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#444',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  browseCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  stepBtn: {
    width,
    flexDirection: 'row',
    alignItems: 'center',

    // justifyContent: 'center',
    // marginTop: 70,
    height: 70,
    paddingHorizontal: 20,

    position: 'absolute',
    bottom: 50,
  },
  navBtn: {
    marginHorizontal: 10,
    width: '40%',
  },

  check: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#eee',
    marginRight: 20,
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
});

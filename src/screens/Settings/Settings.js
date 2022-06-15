import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, View} from 'native-base';
import LoginBtn from '../../Components/Button/LoginBtn';
import SettingComponent from '../../Components/Settings/SettingComponent';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageModal from '../../Components/Modal/LanguageModal';
import Divider from '../../Components/Divider/Divider';
import CommonHeader from '../../Components/CustomHeader/CommonHeader';
import UserSettingComponent from './component/UserSettingComponent';
import SingleSettingsCont from './component/SingleSettingsCont';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/userActions';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {type} = userLogin;
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <CommonHeader title="Settings" />
          <View style={styles.content}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 30}}>
              <UserSettingComponent />
              <View
                style={{
                  width: '60%',
                  alignSelf: 'center',
                  paddingBottom: scale(30),
                }}>
                {/* <LoginBtn
                  title="GET PREMIUM"
                  onPress={() => navigation.navigate('Premium')}
                /> */}
              </View>
              <View style={{width: '100%'}}>
                <SingleSettingsCont
                  title="Account"
                  text="Manage your account details"
                  onPress={() => navigation.navigate('SettingAccount')}
                />
                {type === 'ARTIST' && (
                  <SingleSettingsCont
                    title="Discover"
                    text="Choose the song that represent you "
                    onPress={() => navigation.navigate('SettingDiscover')}
                  />
                )}
                {type === 'ARTIST' && (
                  <SingleSettingsCont
                    title="Albums"
                    text="Add songs to your album "
                    onPress={() => navigation.navigate('AddSongToAlbum')}
                  />
                )}

                <SingleSettingsCont
                  title="Notifications"
                  text="Manage your notifications"
                  onPress={() => navigation.navigate('SettingNotification')}
                />
                <SingleSettingsCont
                  title="About Napollo"
                  text="Get more info about Napollo"
                  onPress={() => navigation.navigate('SettingAboutNapollo')}
                />
                <SingleSettingsCont
                  onPress={() => dispatch(logout())}
                  title="Logout"
                  text="Take a chilled break"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // paddingTop: 70,
    width,
    height,
    // paddingBottom: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  settingText: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Gilroy-Heavy',
    marginTop: 20,
    marginBottom: 25,
  },
  dropdownBox: {
    width: 110,
    height: 40,
    borderColor: '#eee',
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  dropdownText: {
    color: '#eee',
    fontSize: 13,
  },
});

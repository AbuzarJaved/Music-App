import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, View} from 'native-base';
import LoginBtn from '../Components/Button/LoginBtn';
import SettingComponent from '../Components/Settings/SettingComponent';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageModal from '../Components/Modal/LanguageModal';
import Divider from '../Components/Divider/Divider';
import CommonHeader from '../Components/CustomHeader/CommonHeader';

const {width, height} = Dimensions.get('window');

const Settings = ({navigation}) => {
  const [language, setLanguage] = useState('English');
  const [languageModal, setLanguageModal] = useState(false);

  const openLanguageModal = () => {
    setLanguageModal(true);
  };
  const closeLanguageModal = () => {
    setLanguageModal(false);
  };
  const items = [
    {
      label: 'English',
      value: 'english',
    },
    {
      label: 'French',
      value: 'french',

      hidden: true,
    },

    {
      label: 'Spanish',
      value: 'spanish',
    },
    {
      label: 'Chinese',
      value: 'madanrin',
    },
  ];
  const changeLanguage = (val) => {
    setLanguage(val);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <LanguageModal
          closeModal={closeLanguageModal}
          openModal={openLanguageModal}
          language={language}
          languageModal={languageModal}
          changeLanguage={(val) => changeLanguage(val)}
        />
        <CommonHeader title="Settings" />
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.settingText}>Free Account</Text>
            <LoginBtn
              title="GET PREMIUM"
              onPress={() => navigation.navigate('Premium')}
            />
            {/* SECTIONS */}
            <View>
              <Text
                style={{
                  color: '#f68126',
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 17,
                  marginVertical: 20,
                }}>
                Playback
                <Text
                  style={{
                    color: '#999',
                    fontFamily: 'Gilroy-Bold',
                    fontSize: 14,
                  }}>
                  &nbsp; (Premium Feature)
                </Text>
              </Text>
              <SettingComponent title="Dark mode" />
              <View style={{marginVertical: 10}}>
                <Divider />
              </View>
              <SettingComponent title="Compress all my tracks" />
              <View style={{marginVertical: 10}}>
                <Divider />
              </View>
            </View>

            <View>
              <Text
                style={{
                  color: '#f68126',
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 17,
                  marginVertical: 20,
                }}>
                Notifications
              </Text>
              <SettingComponent
                title="Enable notifications"
                style={{fontFamily: 'Gilroy-Bold', marginBottom: 10}}
              />
              <View style={{marginVertical: 10}}>
                <Divider />
              </View>
              <SettingComponent
                title="Recommended music"
                style={{fontFamily: 'Gilroy-Bold', marginBottom: 10}}
              />
              <View style={{marginVertical: 10}}>
                <Divider />
              </View>
              <SettingComponent
                title="Playlist updates"
                style={{fontFamily: 'Gilroy-Bold', marginBottom: 10}}
              />
              <View style={{marginVertical: 10}}>
                <Divider />
              </View>
            </View>
            {/* LOGIN AND SECURITY */}
            {/* <View>
              <Text
                style={{
                  color: '#f68126',
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 17,
                  marginVertical: 20,
                }}>
                Account / Security
              </Text>
            </View> */}
            {/* SECTIONS */}
            <View>
              <Text
                style={{
                  color: '#f68126',
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 17,
                  marginVertical: 20,
                }}>
                About
              </Text>
              <Text
                style={{
                  color: '#999',
                  fontSize: 14,
                  marginVertical: 5,
                  fontFamily: 'Gilroy-Bold',
                }}>
                Terms and Conditions
              </Text>
              <Text
                style={{
                  color: '#999',
                  fontSize: 14,
                  marginVertical: 5,
                  fontFamily: 'Gilroy-Bold',
                }}>
                Private Policy
              </Text>
              <Text
                style={{
                  color: '#999',
                  fontSize: 14,
                  marginVertical: 5,
                  fontFamily: 'Gilroy-Bold',
                }}>
                Support
              </Text>
              {/* LANGUAGE VIEWS */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#999',
                    fontSize: 14,
                    marginVertical: 5,
                    fontFamily: 'Gilroy-Bold',
                  }}>
                  Language
                </Text>
                <View style={styles.dropdownBox}>
                  <Text style={styles.dropdownText}>{language}</Text>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    hitSlop={{bottom: 30, right: 30, left: 30, top: 30}}
                    onPress={() => openLanguageModal()}>
                    <Icon color="#f68128" name="chevron-down" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* APP VERSION VIEW */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  paddingRight: 15,
                }}>
                <Text
                  style={{
                    color: '#999',
                    fontSize: 14,
                    marginVertical: 5,
                    fontFamily: 'Gilroy-Bold',
                  }}>
                  App version
                </Text>
                <Text
                  style={{
                    color: '#999',
                    fontSize: 12,
                    marginVertical: 5,
                    fontFamily: 'Gilroy-Bold',
                  }}>
                  1.0.0
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 50,
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

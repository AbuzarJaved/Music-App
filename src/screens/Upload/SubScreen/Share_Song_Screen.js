import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../../Components/CustomHeader/CommonHeader';
import Share_Song_Link from '../component/Share_Song_Link';
import LoginBtn from '../../../Components/Button/LoginBtn';
import Icon from 'react-native-vector-icons/Ionicons';

// SOCIAL ICONS
import ItunesIcon from '../../../Components/Icons/SocialIcons/ItunesIcon';
import ShazamIcon from '../../../Components/Icons/SocialIcons/ShazamIcon';
import YoutubeIcon from '../../../Components/Icons/SocialIcons/YoutubeIcon';
import TidalIcon from '../../../Components/Icons/SocialIcons/TidalIcon';
import SpotifyIcon from '../../../Components/Icons/SocialIcons/SpotifyIcon';
import SoundCloudIcon from '../../../Components/Icons/SocialIcons/SoundCloudIcon';
import DeezerIcon from '../../../Components/Icons/SocialIcons/DeezerIcon';
import AmazonIcon from '../../../Components/Icons/SocialIcons/AmazonIcon';
import AppleMusicIcon from '../../../Components/Icons/SocialIcons/AppleMusicIcon';
import {copyToClipboard} from '../../../utils/FilePicker'

const {width, height} = Dimensions.get('window');
const IconList = [
  // {name: 'Itunes', icon: <ItunesIcon />},
  // {name: 'Shazam', icon: <ShazamIcon />},
  // {name: 'Amazon', icon: <AmazonIcon />},
  {name: 'Spotify', icon: <SpotifyIcon />},
  {name: 'Apple Music', icon:  <AppleMusicIcon />},
  // {name: 'SoundCloud', icon: <SoundCloudIcon />},
  // {name: 'Deezer', icon: <DeezerIcon />},
  {name: 'Youtube Music', icon: <YoutubeIcon />},
];

const Share_Song_Screen = () => {
  const navigation = useNavigation();
  const [link,setMusicLink] = useState('napollomusic.com/id/song')
  const socialIcons = IconList.map((Icon, index) => (
    <Share_Song_Link {...Icon} key={index} />
  ));

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomHeader title="Share Song" func={() => navigation.navigate('Upload')}/>
        <View style={styles.content}>
          <ScrollView
            style={{flex: 1, width: '100%'}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.imageContent}>
              <Image
                source={require('../../../assests/images/bad-liar.jpg')}
                style={{width: '80%', height: '90%', borderRadius: 20}}
              />
              <View style={{marginTop: 10}}>
                <Text
                  style={{color: '#eee', textAlign: 'center', fontSize: 15}}>
                  Fly Higher
                </Text>
                <Text style={{color: '#f68128', fontSize: 13}}>
                  Starboy &nbsp;
                  <Text style={{color: '#eee', fontSize: 13}}>ft. Lax</Text>
                </Text>
              </View>
            </View>
            {/* Napollo Link */}
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <View style={[styles.input, styles.browseCont]}>
                <Text style={{color: '#eee', width: '100%', paddingLeft: 5}}>
                  {link}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{alignSelf: 'center', marginHorizontal: 5, marginTop: 5}}
                hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}>
                <Icon name="copy-outline" size={28} color="#999" />
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={0.6}
                style={{alignSelf: 'center', marginHorizontal: 5, marginTop: 5}}
                hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}>
                <Icon name="ellipsis-vertical" size={28} color="#999" />
              </TouchableOpacity> */}
            </View>
            {/* EXTERNAL LINKS  */}
            <View style={styles.shareContainer}>{socialIcons}</View>
            <View style={styles.stepBtn}>
              <View style={styles.navBtn}>
                <LoginBtn title="Done" onPress={() => null} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Share_Song_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    flex: 1,
    width,
    // marginTop: 60,
    // paddingTop:10
    // paddingHorizontal: 25,
    // paddingTop: 20,
  },
  imageContent: {
    width,
    // justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#900',
    height: height / 2,
    paddingTop: 10,
  },
  shareContainer: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 70,
    paddingHorizontal: 20,
  },
  navBtn: {
    marginHorizontal: 10,
    width: '60%',
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
});

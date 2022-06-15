import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Share_Song_Link from '../../screens/Upload/component/Share_Song_Link';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderWithBackBtn from '../CustomHeader/CommonHeader';
import {useDispatch, useSelector} from 'react-redux';
import {closeListenElsewhereModal} from '../../redux/actions/songBottomSheetAction';
import LoginBtn from '../Button/LoginBtn';
import ImagePlaceholder from '../../assests/images/music-placeholder.png';
const {width, height} = Dimensions.get('window');
// ICONS
import ItunesIcon from '../Icons/SocialIcons/ItunesIcon';
import ShazamIcon from '../Icons/SocialIcons/ShazamIcon';
import YoutubeIcon from '../Icons/SocialIcons/YoutubeIcon';
import TidalIcon from '../Icons/SocialIcons/TidalIcon';
import SpotifyIcon from '../Icons/SocialIcons/SpotifyIcon';
import SoundCloudIcon from '../Icons/SocialIcons/SoundCloudIcon';
import DeezerIcon from '../Icons/SocialIcons/DeezerIcon';
import AmazonIcon from '../Icons/SocialIcons/AmazonIcon';
import AppleMusicIcon from '../Icons/SocialIcons/AppleMusicIcon';

const IconList = [
  // {name: 'Itunes', icon: <ItunesIcon />},
  // {name: 'Shazam', icon: <ShazamIcon />},
  // {name: 'Amazon', icon: <AmazonIcon />},
  {name: 'Spotify', icon: <SpotifyIcon />},
  {name: 'Apple Music', icon: <AppleMusicIcon />},
  // {name: 'SoundCloud', icon: <SoundCloudIcon />},
  // {name: 'Deezer', icon: <DeezerIcon />},
  {name: 'Youtube Music', icon: <YoutubeIcon />},
];

const ListenElsewhereModal = () => {
  const dispatch = useDispatch();
  const [link, setMusicLink] = useState('napollomusic.com/id/song');
  const socialIcons = IconList.map((Icon, index) => (
    <Share_Song_Link {...Icon} key={index} />
  ));
  const openSongBottomSheet = useSelector(state => state.openSongBottomSheet);
  const listenElsewhereModal = useSelector(state => state.listenElsewhereModal);
  const {
    songDetails: {title, image, url, id, artist, featuredArtists},
  } = openSongBottomSheet;
  const {isListenElsewhereModalOpen} = listenElsewhereModal;
  const featuringArtist = featuredArtists?.join('&');

  const songLink = `https://www.napollomusic.com/${title}/${id}`;

  return (
    <Modal
      style={{margin: 0}}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      isVisible={isListenElsewhereModalOpen}
      onBackdropPress={() => dispatch(closeListenElsewhereModal())}>
      <View style={styles.container}>
        <HeaderWithBackBtn
          title="Listen Elsewhere"
          func={() => dispatch(closeListenElsewhereModal())}
        />
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={{width: '100%', paddingBottom: 30}}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.imageContent}>
              <Image
                source={
                  image !== null || image !== ''
                    ? {uri: image}
                    : ImagePlaceholder
                }
                style={{width: '80%', height: '90%', borderRadius: 20}}
              />
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    color: '#eee',
                    textAlign: 'center',
                    fontSize: 15,
                    fontFamily: 'Helvetica-Bold',
                  }}>
                  {title}
                </Text>
                <Text
                  style={{
                    color: '#f68128',
                    fontSize: 12,
                    fontFamily: 'Helvetica-Medium',
                  }}>
                  {artist} &nbsp;
                  {featuringArtist && (
                    <Text
                      style={
                        styles.featuredArtists
                      }>{`ft (${featuringArtist})`}</Text>
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 20,
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={[styles.input, styles.browseCont]}>
                <Text
                  style={{
                    color: '#eee',
                    // width: '100%',
                    paddingLeft: 5,
                    fontSize: 10,
                    fontFamily: 'Helvetica-Regular',
                  }}>
                  {songLink}
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
            <View style={styles.shareContainer}>{socialIcons}</View>
            <View style={styles.stepBtn}>
              <View style={styles.navBtn}>
                <LoginBtn title="Done" onPress={() => null} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ListenElsewhereModal;

const styles = StyleSheet.create({
  container: {
    width,
    position: 'absolute',
    bottom: 0,
    height: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    width: '100%',
    // marginTop: 60,
    // paddingTop:10
    // paddingHorizontal: 25,
    // paddingTop: 20,
  },
  imageContent: {
    width: '100%',
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
    width: '90%',
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
    // justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

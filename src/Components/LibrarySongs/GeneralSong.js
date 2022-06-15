import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import {useNavigation} from '@react-navigation/native';
import DownloadIcon from '../../Components/Icons/DownloadIcon';
import LikeBtn from '../../Components/Button/LikeButton';
import EllipsisBtn from '../../Components/Button/EllipisisVeticalIcon';
import {useDispatch, useSelector} from 'react-redux';
import {openModalPlayer} from '../../redux/actions/musicPlayerActions';
import {openSongBottomSheetView} from '../../redux/actions/songBottomSheetAction';

const {width} = Dimensions.get('window');

const GeneralSong = ({
  image,
  url,
  id,
  title,
  artist,
  showLikeBtn,
  index,
  indexes,
  likes,
  time,
}) => {
  const navigation = useNavigation();
  const playerContext = usePlayerContext();
  const musicPlayerDetails = useSelector((state) => state.openMusicPlayer);

  const dispatch = useDispatch();
  const {} = musicPlayerDetails;

  const navigate = () => {
    dispatch(openModalPlayer({title, url, image, id, artist}));

    // navigation.navigate('Now_Playing', {screen: 'Now_Playing'});
    playerContext.play({title, url, image, id, artist});
  };

  const openBottomSheet = () => {
    dispatch(openSongBottomSheetView({title, url, image, id, artist}));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigate()}>
        <View style={{flexDirection: 'row', width: '85%'}}>
          {indexes && (
            <Text
              style={{
                color: '#f68126',
                // alignSelf: 'center',
                marginRight: 6,
                fontSize: 13,
                marginTop: 6,
              }}>
              {index > 10 ? index : `0${index + 1}`}
            </Text>
          )}
          <View style={styles.songImageCont}>
            <View style={styles.likes}>
              <Image
                source={require('../../assests/images/verification.png')}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  marginRight: 5,
                }}
              />
              <Text style={{color: '#eee', fontSize: 13}}>94k</Text>
            </View>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: '#000',
                opacity: 0.9,
              }}
            />
            <Image
              // source={require('../../assests/images/Background.jpg')}
              source={image || require('../../assests/images/Background.jpg')}
              style={styles.songImage}
            />
          </View>
          <View style={{marginLeft: 13}}>
            <Text style={styles.songName}>{title}</Text>
            <Text style={styles.songArtist}>{artist}</Text>
            <Text style={styles.songTime}>{time || '3:00'}</Text>
            {/* Song Details */}
            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
                justifyContent: 'space-between',
              }}> */}
            {/* SingleIcon */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="play" color="#f68128" size={18} />
                <Text style={styles.songPlay}>52K</Text>
              </View> */}
            {/* SingleIcon */}
            {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <DownloadIcon color="#f68128" width={18} height={18} />
                <Text style={styles.songPlay}>52K</Text>
              </View> */}
            {/* SingleIcon */}
            {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Icon name="heart" color="#f68128" size={18} />
                <Text style={styles.songPlay}>{likes}</Text>
              </View> */}
            {/* </View> */}
          </View>
        </View>
      </TouchableOpacity>
      {/* CONTROLS SIGNAL */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   width: '15%',
        }}>
        {showLikeBtn && (
          <View style={{marginRight: 10}}>
            <LikeBtn col likes={20} />
          </View>
        )}

        <View>
          <EllipsisBtn color="#999" onPress={() => openBottomSheet()} />
        </View>
      </View>
    </View>
  );
};

export default GeneralSong;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  songImageCont: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  songImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  songName: {
    color: '#fff',

    marginTop: 5,
    fontFamily: 'Gilroy-Heavy',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  songArtist: {
    color: '#f68126',
    fontFamily: 'Gilroy-Heavy',
    fontSize: 13,
    textTransform: 'capitalize',
    marginTop: 5,
  },
  songPlay: {
    color: '#999',
    fontFamily: 'Gilroy-Heavy',
    fontSize: 12,
    textTransform: 'capitalize',
    marginLeft: 5,
  },
  songTime: {
    color: '#999',
    fontFamily: 'Gilroy-Heavy',
    fontSize: 11,
    textTransform: 'capitalize',
    marginTop: 10,
  },
  likes: {
    position: 'absolute',
    left: 5,
    top: 60,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MainImage from '../../../assests/images/albums-placeholder.jpg';
import {store_Active_Album_Details} from '../../../redux/actions/MediaActions/AlbumActions/index';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {usePlayerContext} from '../../../PlayerContext/PlayerContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {openModalPlayer} from '../../../redux/actions/musicPlayerActions';
import {play_Media} from '../../../redux/actions/MediaActions/getMediaActions';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const SongsContainer = ({
  title,
  numListening,
  image,
  hits,
  url,
  id,
  allSongs,
  index,
  ownerAccountUser,
  featuredArtists,
}) => {
  const featuringArtist = featuredArtists.join('&');
  const playerContext = usePlayerContext();
  const dispatch = useDispatch();
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;
  const {playMusic} = usePlayerContext();
  const currentTrack = {
    title,
    url,
    image,
    id,
    artwork: image,
    artist: ownerAccountUser.username,
    featuredArtists,
    ownerAccountUser: ownerAccountUser,
  };
  const allSong = {
    currentTrack,
    mediaSongs: allSongs,
  };
  const navigate = () => {
    const songsData = [];
    allSong.mediaSongs.forEach(item =>
      songsData.push({
        ...item,
        artist: item.ownerAccountUser
          ? `${item.ownerAccountUser?.username}`
          : `${item.firstName} ${item.lastName}`,
      }),
    );
    dispatch(openModalPlayer(songsData));
    dispatch(play_Media(city, state, country, id));
    // const check = [...allSongs.mediaSongs];
    const check = [allSong.currentTrack, ...songsData];
    playerContext.playMusic(check);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigate()}
      style={[styles.container, {}]}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.3,
          position: 'absolute',
          zIndex: 100,
          width: '100%',
          height: '100%',
        }}
      />
      <Image
        source={image && image !== null ? {uri: image} : MainImage}
        style={styles.image}
      />
      <View style={styles.listner}>
        <Icon
          name="headset"
          color="#fff"
          size={scale(11)}
          style={{marginRight: 5}}
        />
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Helvetica-Medium',
            fontSize: scale(9),
            textTransform: 'capitalize',
          }}>
          {hits}
        </Text>
      </View>
      {/* BLACK OVERLAY */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.2,
        }}
      />
      <View style={{marginTop: 8, paddingLeft: 10, zIndex: 400}}>
        <Text
          numberOfLines={1}
          style={{
            color: '#eee',
            textTransform: 'capitalize',
            fontSize: 12,
            fontFamily: 'Helvetica-Bold',
            width: '90%',
          }}>
          {title}&nbsp;
          {featuringArtist && (
            <Text
              style={styles.featuredArtists}>{`ft (${featuringArtist})`}</Text>
          )}
        </Text>
        <Text
          style={{
            color: '#f68128',
            fontSize: 10,
            fontFamily: 'Helvetica-Medium',
          }}>
          {ownerAccountUser?.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SongsContainer;

const styles = ScaledSheet.create({
  container: {
    width: 150,
    height: 200,

    marginRight: 15,
    borderRadius: 10,
    position: 'relative',
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  likes: {
    position: 'absolute',
    left: 10,
    bottom: 50,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: '60@s',
    paddingLeft: 10,
    zIndex: 400,
  },
});

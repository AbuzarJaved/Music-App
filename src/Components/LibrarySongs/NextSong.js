import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import NoImage from '../../assests/images/image-placeholder.png';
import {useDispatch, useSelector} from 'react-redux';
import PlayingGif from '../../assests/Animations/Nt6v.gif';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import {play_Media} from '../../redux/actions/MediaActions/getMediaActions';
import {scale, ScaledSheet} from 'react-native-size-matters';

const NextSong = ({
  index,
  title,
  url,
  image,
  id,
  ownerAccountUser,
  featuredArtists,
  hits,
  album,
  genre
}) => {
  const playerContext = usePlayerContext();
  const dispatch = useDispatch();
  const {id: trackId} = playerContext.currentTrackDetails;
  const openMusicPlayer = useSelector(state => state.openMusicPlayer);
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;
  // const {id: trackId} = openMusicPlayer.currentPlayerTrack;
  const {data} = openMusicPlayer;
  const {username} = ownerAccountUser;
  const song = {
    title,
    url,
    image,
    id,
    username,
    featuredArtists,
    ownerAccountUser,
    hitCount: hits,
    album,
    artist: ownerAccountUser?.username,
    artwork: image,
    genre:genre?.name
  };
  const songs = [song, ...data];

  const featuringArtist = featuredArtists?.join('&');

  const playSong = async () => {
    // await TrackPlayer.play(song);
    // playerContext.playMusic(data);
    const songsData = [];
    data.forEach(item =>
      songsData.push({
        ...item,
        artist: item.ownerAccountUser.username
          ? `${item.ownerAccountUser.username}`
          : item.title,
      }),
    );
    // console.log(songsData);
    playerContext.playMusic(songsData);
    dispatch(play_Media(city, state, country, id));

    // playerContext.playMusic(songs);


  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => playSong()}
      style={[
        styles.container,
        trackId === id ? {backgroundColor: 'rgba(246, 129, 40,0.3)'} : null,
      ]}>
      <View style={styles.detail}>
        <Image
          style={styles.nextImage}
          source={image ? {uri: image} : NoImage}
        />
        <View style={{width: '75%'}}>
          <Text numberOfLines={1} style={styles.title}>
            {title}&nbsp;
            {featuringArtist && (
              <Text
                style={
                  styles.featuredArtists
                }>{`ft (${featuringArtist})`}</Text>
            )}
          </Text>
          <Text style={styles.artist}>{username}</Text>
        </View>
      </View>
      <View>
        {trackId === id ? (
          <Image source={PlayingGif} style={styles.playingImage} />
        ) : (
          <Icon name="md-musical-note" size={20} color="#fff" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NextSong;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',

    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  nextImage: {
    width: 45,
    height: 45,
    borderRadius: 5,
    marginRight: '6@s',
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: '14@s',
    color: '#fff',
    textTransform: 'capitalize',
  },
  artist: {
    fontSize: '10@s',
    color: '#999',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  playingImage: {
    width: 25,
    height: 25,
  },
  featuredArtists: {
    fontSize: '10@s',
  },
});

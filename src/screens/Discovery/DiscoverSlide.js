import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import {scale, ScaledSheet} from 'react-native-size-matters';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const DiscoverSlide = (
  {
    // image,
    // title,
    // ownerAccountUser: {username},
    // featuredArtists,
  },
) => {
  // const {firstName, lastName} = realArtist;
  const {
    isBuffering,
    isEmpty,
    isPaused,
    isPlaying,
    isStopped,
    play,
    pause,
    currentTrackDetails,
    currentDiscoveryTrack,
  } = usePlayerContext();

  const {image, title, ownerAccountUser, featuredArtists} = currentTrackDetails;

  const featuringArtist = featuredArtists?.join('&');

  let btnView = null;
  if (isBuffering) {
    btnView = (
      <View style={{position: 'absolute', top: '40%', left: '40%'}}>
        <ActivityIndicator color="#fff" size={55} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={image !== null || image !== '' ? {uri: image} : {}}
      style={[
        {
          width: SCREEN_WIDTH,
          position: 'absolute',
          top: 0,
          height: SCREEN_HEIGHT,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        image === null || image === ''
          ? {backgroundColor: 'rgba(255,255,255,0.061)'}
          : null,
      ]}
      blurRadius={100}
      resizeMode="cover">
      <Image
        source={
          image !== null || image !== ''
            ? {uri: image}
            : require('../../assests/images/music-placeholder.png')
        }
        style={{
          width: SCREEN_WIDTH / 1.3,
          height: '52%',
          resizeMode: 'cover',
          borderRadius: 10,
          marginBottom: 100,
          marginTop: '15%',
          alignSelf: 'center',
          zIndex: 100,
        }}
        resizeMode="cover"
      />
      {btnView}

      <View
        style={{
          position: 'absolute',
          bottom: '30%',
          left: 30,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '90%',
          zIndex: 500,
        }}>
        <View>
          {title && ownerAccountUser && (
            <>
              <Text
                style={{
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontSize: scale(15),
                  fontFamily: 'Helvetica-ExtraBold',
                }}>
                {title}
                {featuringArtist && (
                  <Text
                    style={
                      styles.featuredArtists
                    }>{`ft (${featuringArtist})`}</Text>
                )}
              </Text>
              <Text
                style={{
                  color: '#f68128',
                  textTransform: 'capitalize',
                  fontSize: scale(12),
                  fontFamily: 'Helvetica-ExtraBold',
                  textAlign: 'center',
                }}>
                {`${ownerAccountUser?.username}`}
              </Text>
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default DiscoverSlide;

const styles = StyleSheet.create({
  playContainer: {
    borderRadius: 55 / 2,
    width: 55,
    height: 55,
    borderColor: '#f68128',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#f68128',
    alignSelf: 'flex-end',
  },
});

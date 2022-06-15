import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PlaylistImagePlacHolder from '../../../assests/images/playlist-image-placeholder.png';

const {width, height} = Dimensions.get('window');

const PlaylistContainer = ({
  title,
  songs,
  image,
  details,
  name,
  url,
  media,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={0.7}
      style={[styles.container, {}]}>
      {/* <View style={styles.likes}>
        <Image
          source={require('../../../assests/images/verification.png')}
          style={{width: 20, height: 20, borderRadius: 20 / 2, marginRight: 5}}
        />
        <Text style={{color: '#eee', fontSize: 13}}>94k</Text>
      </View> */}
      <Image
        source={url && url !== null ? {uri: url} : PlaylistImagePlacHolder}
        style={styles.image}
      />
      {/* BLACK OVERLAY */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.4,
        }}
      />
      <View style={{marginTop: 8, paddingLeft: 10}}>
        <Text style={{color: '#eee', textTransform: 'capitalize'}}>{name}</Text>

        <Text style={{color: '#f68128', fontSize: 12}}>
          {media.length} songs
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistContainer;

const styles = StyleSheet.create({
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
    bottom: 70,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

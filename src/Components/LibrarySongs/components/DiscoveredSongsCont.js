import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MainImage from '../../../assests/images/onBoarding7.jpg';

const {width, height} = Dimensions.get('window');

const DiscoveredSongContainer = ({
  title,
  songs,
  image,
  details,
  name,
  photoUrl,
  onPress,
  url,
  media,
  discoveryImage,
}) => {
  console.log(media, name, 'FROM CONTAINER');
  return (
    <TouchableOpacity
      onPress={onPress ? () => onPress() : null}
      activeOpacity={0.6}
      style={[styles.container, {}]}>
      {/* <View style={styles.likes}>
        <Image
          source={require('../../../assests/images/verification.png')}
          style={{width: 20, height: 20, borderRadius: 20 / 2, marginRight: 5}}
        />
        <Text
          style={{color: '#eee', fontSize: 13, fontFamily: 'Helvetica-Bold'}}>
          94k
        </Text>
      </View> */}
      <Image
        source={
          url && url !== null ? {uri: url} : MainImage
          // ? discoveryImage
          // : MainImage
        }
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
        <Text
          style={{
            color: '#eee',
            textTransform: 'capitalize',
            fontSize: 12,
            fontFamily: 'Helvetica-Bold',
          }}>
          {name}
        </Text>
        <Text
          style={{
            color: '#f68128',
            fontSize: 10,
            fontFamily: 'Helvetica-Medium',
          }}>
          {media.length} songs
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DiscoveredSongContainer;

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

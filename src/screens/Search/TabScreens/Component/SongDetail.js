import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LikeBtn from '../../../../Components/Button/LikeBtn';

const {width, height} = Dimensions.get('window');

const SongDetail = ({image, artist, title, numListening,songs,details}) => {
  return (
    <View style={styles.container}>
      <View style={styles.likes}>
        <Image
          source={require('../../../../assests/images/verification.png')}
          style={{width: 20, height: 20, borderRadius: 20 / 2, marginRight: 5}}
        />
        <Text style={{color: '#eee', fontSize: 13}}>94k</Text>
      </View>
      <View style={{width: '100%', height: '70%', borderRadius: 10}}>
        <TouchableOpacity>
          <Image
            source={image}
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Text style={styles.detail_name}>{title}</Text>
          <Text style={styles.artist_name}>{details}</Text>
        </View>
      </View>
    </View>
  );
};

export default SongDetail;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
    marginHorizontal: 8,
    width: width / 2.35,
    height: 250,

    borderRadius: 10,
  },
  detailContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  detail_name: {
    color: '#eee',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  artist_name: {
    color: '#f68128',
    fontSize: 13,
    marginTop: 5,
    textTransform: 'capitalize',
  },
  likes: {
    position: 'absolute',
    left: 10,
    bottom: 90,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

//,backgroundColor:"#ffeedf"

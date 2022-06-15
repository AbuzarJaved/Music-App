import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MainImage from '../../../assests/images/hate-me.jpg';
import LikeIcon from '../../Icons/LikeIcon';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const RecentlyDiscovered = ({title, songs, image, details, name, photoUrl}) => {
  const [like, setLike] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, {}]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.likes}
        onPress={() => setLike(!like)}>
        {like ? (
          <Icon name="heart" size={28} color="#f68128" />
        ) : (
          <Icon name="heart-outline" size={28} color="#f68128" />
        )}
      </TouchableOpacity>
      <Image
        source={photoUrl ? {uri: photoUrl} : MainImage}
        style={styles.image}
      />
      {/* BLACK OVERLAY */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.2,
        }}
      />
      <View style={{marginTop: 8, paddingLeft: 10}}>
        <Text
          style={{
            color: '#eee',
            textTransform: 'capitalize',
            fontSize: 15,
            fontFamily: 'Helvetica-Bold',
          }}>
          23
        </Text>
        <Text
          style={{
            color: '#f68128',
            fontSize: 12,
            fontFamily: 'Helvetica-Medium',
          }}>
          Burna boy
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecentlyDiscovered;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,

    marginRight: 20,
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
    right: -10,
    top: -5,
    zIndex: 100,
    // flexDirection: 'row',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 40 / 2,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

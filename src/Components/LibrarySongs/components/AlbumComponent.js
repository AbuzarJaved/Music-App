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

const {width, height} = Dimensions.get('window');

const AlbumContainer = ({
  title,
  songs,
  details,
  name,
  photoUrl,
  song,
  artist,
  url,
  owner,
  id,
  year,
  description,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const albumData = {
    name,
    description,
    url,
    year,
    id,
    owner,
  };

  const albumNavigate = () => {
    dispatch(store_Active_Album_Details(albumData));
    navigation.navigate('SingleAlbum');
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => albumNavigate()}
      style={[styles.container, {}]}>
      <Image
        source={url && url !== null ? {uri: url} : MainImage}
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
          numberOfLines={1}
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
          {/* {owner?.username} */}
          {year}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AlbumContainer;

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
    bottom: 50,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

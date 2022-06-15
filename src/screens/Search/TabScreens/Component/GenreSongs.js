import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Hip_Hop_Icon from '../../../../Components/Icons/GenreIcons/Hip-Hop';
const {width, height} = Dimensions.get('window');

const GenreSongs = ({songs, genre, color,icon}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.container,
        color ? {backgroundColor: color} : {backgroundColor: '#689'},
      ]}>
      <View style={styles.likes}>
        <Image
          source={require('../../../../assests/images/verification.png')}
          style={{width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5}}
        />
      </View>
      <View style={styles.detailContainer}>
        <View>
         {icon}
        </View>
        <View>
          <Text style={styles.detail_name}>{genre}</Text>
          <Text style={styles.artist_name}>{songs || 0} Tracks</Text>
        </View>
        {/* <LikeBtn col /> */}
      </View>
    </TouchableOpacity>
  );
};

export default GenreSongs;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 20,
    marginHorizontal: 8,
    width: width / 2.2,
    height: 200,
    borderRadius: 10,
  },
  likes: {
    position: 'absolute',
    left: 15,
    bottom: 20,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    // justifyContent: 'center',
  },
  detail_name: {
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#ddd',
    fontFamily: 'Gilroy-ExtraBold',
  },
  artist_name: {
    fontSize: 15,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#ddd',
    fontFamily: 'Gilroy-ExtraBold',
  },
});

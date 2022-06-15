import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const ArtistMostPlayedCont2 = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content}>
        <Image
          style={{
            width: scale(60),
            height: scale(60),
            borderRadius: 10,
            marginRight: 15,
          }}
          source={require('../../../../assests/images/image.jpg')}
          //   source={
          //     props.photoUrl
          //       ? {uri: props.photoUrl}
          //       : require('../../../../assests/images/image.jpg')
          //   }
        />
        <View>
          <Text numberOfLines={1} style={styles.songName}>
            {/* {props.mediaTitle ? props.mediaTitle : 'Infinity ft Omah Lay'} */}
            Infinity ft Omah Lay
          </Text>
          <View style={styles.listner}>
            <Icon
              name="headset"
              color="#999"
              size={scale(14)}
              style={{marginRight: 5}}
            />
            <Text
              style={{
                color: '#999',
                fontFamily: 'Helvetica-Medium',
                fontSize:scale(12),
                textTransform: 'capitalize',
              }}>
              {/* {hitCount} */}
              {/* {props.hitCount} */}
              122k
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.likesText}>
          {/* {props.likeCount ? `${props.likeCount} likes` : '12.4k Likes'} */}
          {/* {`${props.likeCount} likes`} */}
          24.4 likes
        </Text>
      </View>
    </View>
  );
};

export default ArtistMostPlayedCont2;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.061)',
    padding: 5,
    borderRadius: 10,
  },
  songName: {
    color: '#F68128',
    fontFamily: 'Helvetica-Bold',
    fontSize: '12@s',
    textTransform: 'capitalize',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  likesText: {
    color: '#eee',
    fontFamily: 'Helvetica-Medium',
    fontSize: '10@s',
    textTransform: 'capitalize',
    paddingRight: 10,
  },
});

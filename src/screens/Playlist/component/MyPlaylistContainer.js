import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import EllipsisVertical from '../../../Components/Button/EllipisisVeticalIcon';
import Like from '../../../Components/Button/LikeBtn';
import PlaylistImagePlacHolder from '../../../assests/images/playlist-image-placeholder.png';
import Icon from 'react-native-vector-icons/Ionicons';

const MyPlaylistContainer = ({
  image,
  name,
  onPress,
  id,
  url,
  media,
  description,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress ? () => onPress() : null}
        activeOpacity={0.8}
        style={{flexDirection: 'row', width: '80%'}}>
        <Image
          source={
            url !== '' && url !== null ? {uri: url} : PlaylistImagePlacHolder
          }
          style={styles.image}
        />
        <View>
          <Text
            style={{
              textTransform: 'capitalize',
              color: '#eee',
              fontSize: 16,
              marginTop: 5,
              fontFamily: 'Helvetica-Medium',
            }}>
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              // textTransform: 'capitalize',
              color: '#888',
              fontSize: 10,
              // marginTop: 5,
              fontFamily: 'Helvetica-Medium',
            }}>
            {description}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="musical-notes" size={13} color="#F68128" />
              <Text
                style={{
                  textTransform: 'capitalize',
                  color: '#F68128',
                  fontSize: 10,
                  fontFamily: 'Helvetica-Medium',
                }}>
                &nbsp; {media.length}
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Icon name="headset" size={13} color="#999" />
              <Text
                style={{
                  textTransform: 'capitalize',
                  color: '#999',
                  fontSize: 10,
                }}>
                {media.length}
              </Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
      {/* Bts */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '20%',
        }}>
        <View>
          <Like col />
        </View>
        <EllipsisVertical color="#999" onPress={onPress} />
      </View>
    </View>
  );
};

export default MyPlaylistContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    width: 70,
    height: 70,
    marginRight: 10,
  },
});

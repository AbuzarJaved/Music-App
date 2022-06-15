import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayerContext } from '../../PlayerContext/PlayerContext';
import {useNavigation} from '@react-navigation/native'


const WhatsHotSongs = ({
  email,
  name,
  subtitle,
  likes,
  index,
  indexes,
  image,
  url,
  id,
  title,
  artist
}) => {
  const navigation = useNavigation()
  const playerContext = usePlayerContext();
  const navigate = () => {
    navigation.navigate('Now_Playing',{screen:"Now_Playing"});
    playerContext.play({title, url, image, id, artist});
  }

  const [like, setLike] = useState(false);
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
      }}>
      {/* Onpress navigate to the Now Playing screen passing the required details */}
      <TouchableOpacity onPress={() => navigate()}>
        <View style={{flexDirection: 'row'}}>
          {indexes && (
            <Text
              style={{
                color: '#f68126',
                alignSelf: 'center',
                marginRight: 5,
                fontSize: 12,
              }}>
              {index > 10 ? index : `0${index + 1}`}
            </Text>
          )}

          <Image
            // source={require('../../assests/images/Background.jpg')}
            source={image}
            style={{width: 60, height: 60, borderRadius: 10}}
          />
          <View style={{marginLeft: 7}}>
            <Text
              style={{
                color: '#fff',

                marginTop: 3,
                fontFamily: 'Gilroy-Heavy',
                fontSize: 11,
                textTransform: 'capitalize',
              }}>
              {name}
            </Text>
            {/* EMAIL */}
            {email && (
              <Text
                style={{
                  color: '#999',
                  marginTop: 2,
                  fontFamily: 'Gilroy-Heavy',
                  fontSize: 9,
                  textTransform: 'capitalize',
                }}>
                {email}
              </Text>
            )}
            {/* LIKES OR SUBTITLE */}
            {likes ? (
              <Text
                style={{
                  color: '#f68126',
                  fontFamily: 'Gilroy-Heavy',
                  fontSize: 10,
                  textTransform: 'capitalize',
                  marginTop: 3,
                }}>
                {`${likes}K`} likes
              </Text>
            ) : (
              <Text
                style={{
                  color: '#999',
                  fontFamily: 'Gilroy-Heavy',
                  fontSize: 10,
                  textTransform: 'capitalize',
                  marginTop: 3,
                }}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Icon
          name={!like ? 'heart-outline' : 'heart-sharp'}
          color={!like ? '#999' : '#f68126'}
          size={24}
          onPress={() => setLike(!like)}
          style={{ marginRight: 10 }}
          
        />
        <Icon name="md-ellipsis-vertical" size={24} color="#999" />
      </View>
    </View>
  );
};

export default WhatsHotSongs;

const styles = StyleSheet.create({});

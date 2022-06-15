import React, {useState} from 'react';
import {Body, Left, Right, Text, View} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LikeBtn from '../../Components/Button/LikeBtn';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import {useNavigation} from '@react-navigation/native';

const LibraryComponent = ({
  title,
  subtitle,
  type,
  likes,
  onPress,
  image,

  url,
  id,

  artist,
}) => {
  const [like, setLike] = useState(false);
   const navigation = useNavigation();
   const playerContext = usePlayerContext();
   const navigate = () => {
     navigation.navigate('Now_Playing');
     playerContext.play({title, url, image, id, artist});
   };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate()} style={{width: '100%'}}>
          <Left style={{flexDirection: 'row', width: '100%'}}>
            <Image
              source={image}
              style={{height: 60, width: 60, borderRadius: 10}}
            />
            <View style={{marginLeft: 15}}>
              <Text
                style={{
                  color: '#fff',
                  marginBottom: 12,
                  marginTop: 3,
                  fontFamily: 'Gilroy-Heavy',
                  fontSize: 14,
                  textTransform: 'capitalize',
                }}>
                {title}
              </Text>
              <Text
                style={{
                  color: '#999',
                  fontFamily: 'Gilroy-Heavy',
                  fontSize: 10,
                  textTransform: 'capitalize',
                }}>
                {subtitle}&nbsp; /&nbsp; {type}
              </Text>
            </View>
          </Left>
        </TouchableOpacity>

        <Right>
          <LikeBtn col likes={likes} />
          {/* <Icon
            name={!like ? 'heart-outline' : 'heart-sharp'}
            color={!like ? '#444' : '#f68126'}
            size={22}
            style={{marginBottom: 8}}
            onPress={() => setLike(!like)}
          />
          <Text
            style={{color: '#999', fontSize: 10, fontFamily: 'Gilroy-Heavy'}}>
            {likes}
          </Text> */}
        </Right>
      </View>
      {/* Divider */}
      <View
        style={{
          borderWidth: 0.5,
          borderBottomColor: '#333',
          width: '100%',
          marginTop: 10,
        }}></View>
    </>
  );
};

export default LibraryComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 10,
    justifyContent: 'space-between',
  },
});

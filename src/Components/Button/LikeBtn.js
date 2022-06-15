import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';


const LikeBtn = ({
  col,
  numListening,
  likes,
  likeCount,
  mediaId,
  likeMedia,
  unLikeMedia,
  mediaBtn,
}) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);

  // const toggleLikeUnlikeMedia = () => {
  //   if (!like) {
  //     likeMedia();
  //     setLike(true);
  //   } else {
  //     unLikeMedia();
  //     setLike(false);
  //   }
  // };

  // const mainBtn = () => {
  //   if (mediaBtn) {
  //     toggleLikeUnlikeMedia();
  //   }
  // };

  return (
    <View
      style={
        col
          ? {
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }
          : {flexDirection: 'row'}
      }>
      <Icon
        name={!like ? 'heart-outline' : 'heart-sharp'}
        color={!like ? '#888' : '#f68126'}
        size={col ? 24 : 20}
        // style={{marginBottom: 5}}
        onPress={() => setLike(!like)}
      />
      {!like ? (
        <Text
          style={
            col
              ? {color: '#888', fontSize: 13}
              : {color: '#888', fontSize: 15, marginLeft: 5}
          }>
          {likes}
        </Text>
      ) : (
        <Text
          style={
            col
              ? {color: '#f68128', fontSize: 13}
              : {color: '#f68128', fontSize: 15, marginLeft: 5}
          }>
          {likes}
        </Text>
      )}
    </View>
  );
};

export default LikeBtn;

const styles = StyleSheet.create({});

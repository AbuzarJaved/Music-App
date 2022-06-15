import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

const LikeBtn = ({
  col,

  likes,
}) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
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
        color={!like ? '#eee' : '#f68126'}
        size={col ? 18 : 18}
        // style={{marginBottom: 5}}
        onPress={() => setLike(!like)}
      />
      {!like ? (
        <Text
          style={
            col
              ? {color: '#eee', fontSize: 13, fontFamily: 'Helvetica-Medium'}
              : {
                  color: '#eee',
                  fontSize: 12,
                  marginLeft: 5,
                  fontFamily: 'Helvetica-Medium',
                }
          }>
          {likes} Likes
        </Text>
      ) : (
        <Text
          style={
            col
              ? {color: '#f68128', fontSize: 13, fontFamily: 'Helvetica-Medium'}
              : {
                  color: '#f68128',
                  fontSize: 15,
                  marginLeft: 5,
                  fontFamily: 'Helvetica-Medium',
                }
          }>
          {likes} Likes
        </Text>
      )}
    </View>
  );
};

export default LikeBtn;

const styles = StyleSheet.create({});

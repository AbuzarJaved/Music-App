import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  unLikeMedia,
  likeMedia,
  addToLikedList,
  removeFromLikedList,
} from '../../redux/actions/MediaActions/Like_UnLike/Like_Unlike';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {mainNumberFormat} from '../../utils/loggedInUserType';
import {get_Listener_Liked_Media} from '../../redux/actions/MediaActions/getMediaActions';

const LikeBtn = ({
  col,
  numListening,
  likes,
  likeCount,
  mediaId,
  increaseLike,
  decreaseLike,
}) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [userLike, setUserLike] = useState(likes);

  const storeUserLikedList = useSelector(state => state.storeUserLikedList);
  const getListenerLikedMedia = useSelector(
    state => state.getListenerLikedMedia,
  );
  const {data: listenerData} = getListenerLikedMedia;
  const {likedList} = storeUserLikedList;

  // useEffect(() => {
  //   dispatch(get_Listener_Liked_Media());
  // }, []);

  const checkStatus = () => {
    if (likedList.includes(mediaId)) {
      return true;
    } else {
      return false;
    }
  };

  const value = checkStatus();

  const toggleLikeUnlikeMedia = () => {
    if (likedList.includes(mediaId)) {
      dispatch(unLikeMedia(mediaId));
      setLike(false);
      dispatch(removeFromLikedList(mediaId));
      // if (userLike > 0) setUserLike(userLike - 1);
      decreaseLike();
    } else {
      dispatch(likeMedia(mediaId));
      dispatch(addToLikedList(mediaId));
      setLike(true);
      // setUserLike(userLike + 1);
      increaseLike();
    }

    // if (!like) {
    //   dispatch(likeMedia(mediaId));
    //   addToLikedList(mediaId);
    //   setLike(true);
    //   setUserLike(userLike + 1);
    // } else {
    //   dispatch(unLikeMedia(mediaId));
    //   setLike(false);
    //   removeFromLikedList(mediaId);
    //   if (userLike >= 0) setUserLike(userLike - 1);
    // }
  };

  return (
    <TouchableOpacity
      onPress={() => toggleLikeUnlikeMedia()}
      activeOpacity={0.8}
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
        name={value === false ? 'heart-outline' : 'heart-sharp'}
        color={value === false ? '#eee' : '#f68126'}
        size={col ? scale(20) : scale(18)}
        // style={{marginBottom: 5}}
      />
      {value === false ? (
        <Text
          style={
            col
              ? {color: '#eee', fontSize: scale(11)}
              : {color: '#eee', fontSize: scale(13), marginLeft: 5}
          }>
          {mainNumberFormat(userLike)}
        </Text>
      ) : (
        <Text
          style={
            col
              ? {color: '#f68128', fontSize: scale(11)}
              : {color: '#f68128', fontSize: scale(13), marginLeft: 5}
          }>
          {mainNumberFormat(likes)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default LikeBtn;

const styles = StyleSheet.create({});

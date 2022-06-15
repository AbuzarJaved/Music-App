import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LikeBtn from '../../../../../../Components/Button/LikeButton';
import CommentBtn from '../../../../../../Components/Button/CommentBtn';
import OpenToastBtn from '../../../../../../Components/Button/OpenToastBtn';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {openCommentModal} from '../../../../../../redux/actions/commentModal';

const Footer = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // onPress={() => navigation.navigate('Comment')}
  return (
    <View style={styles.container}>
      <LikeBtn />

      <CommentBtn
        comment={props.comment}
        // onPress={() => navigation.navigate('Comment')}
        onPress={() => dispatch(openCommentModal())}
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 5,
  },
});

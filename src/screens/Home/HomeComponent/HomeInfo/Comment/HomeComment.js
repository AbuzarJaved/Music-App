import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import CommentDetails from './CommentDetails/CommentDetails';
import CommentProfileImage from './CommentImage/CommentProfileImage';

const {width} = Dimensions.get('window');

const HomeComment = ({image,onPress}) => {
  return (
    <View style={styles.container}>
      <CommentProfileImage />
      <CommentDetails image onPress={onPress }/>
    </View>
  );
};

export default HomeComment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    flexDirection: 'row',
    borderBottomColor: '#222',
    borderWidth: 1,
    marginTop: 15,
  },
});

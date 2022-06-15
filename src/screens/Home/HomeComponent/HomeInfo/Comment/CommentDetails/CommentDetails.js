import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CommentImage from '../CommentImage/CommentImage'
import CommentFooter from '../CommentDetailsFooter/Footer'

const CommentDetails = ({image,onPress}) => {
  return (
    <View style={styles.container}>
      {/* Comment Details */}
      <View style={styles.commentDetails}>
        <Text style={[styles.nameText, {fontFamily: 'Helvetica-ExtraBold'}]}>
          Drake
        </Text>
        <Text style={styles.username}>@OVO</Text>
        <Text style={styles.comment}>
          Get ready to experience music at it's very best
        </Text>
      </View>
      {image && <CommentImage />}

      <CommentFooter onPress={onPress} />
    </View>
  );
};

export default CommentDetails;

const styles = StyleSheet.create({
  container: {
    width: '65%',
    // marginTop: 5,
  },
  // commentDetails: {
  //   marginBottom:5,
  // },
  nameText: {
    color: '#eee',
    fontSize: 13,
    fontFamily: 'Helvetica-ExtraBold',
  },
  username: {
    color: '#f68128',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },
  comment: {
    fontSize: 11,
    color: '#eee',
    maxWidth: '90%',
    marginTop: 5,
    fontFamily: 'Helvetica-Medium',
  },
});

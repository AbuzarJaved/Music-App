import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LargerPlayIcon from '../../../../../../Components/VideoPlayIcon/LargerPlayIcon';
import SmallPlayIcon from '../../../../../../Components/VideoPlayIcon/SmallPlayIcon';

const CommentImage = ({video,image}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../../assests/images/bad-liar.jpg')}
        style={{ width: '100%', height: '100%', borderRadius: 5 }}
        resizeMode="cover"
      />

      {video && <LargerPlayIcon />}
    </View>
  );
};

export default CommentImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    borderRadius: 5,

    marginTop: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const VideoViews = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Helvetica-Bold',
          fontSize: 20,
          color: '#999',
          marginTop: 20,
        }}>
        Coming Soon
      </Text>
    </View>
  );
};

export default VideoViews;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

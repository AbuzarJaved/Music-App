import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PlayContainer = (props) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[
        'rgba(246,129,40,0.8)',
        'rgba(246,129,40,0.8)',
        'rgba(246,129,40,0.8)',
        'rgba(254,238,62,0.8)',
      ]}
      style={[styles.btn]}>
      {props.children}
    </LinearGradient>
  );
};

export default PlayContainer;

const styles = StyleSheet.create({
  btn: {
    width: 70,
    borderRadius: 70 / 2,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

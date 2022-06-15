import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import LoadingAnime from '../Animations/Small_LoadingAnime';

const {width, height} = Dimensions.get('window');

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <LoadingAnime width={props.width} height={props.height} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width:'100%',
    height:'100%',
    zIndex: 200,
    backgroundColor: '#000',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
});

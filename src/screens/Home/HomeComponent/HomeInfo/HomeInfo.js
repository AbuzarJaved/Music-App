import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import HomeComment from './Comment/HomeComment';

const {width} = Dimensions.get('window');

const HomeInfo = ({onPress}) => {
  return (
    <View style={styles.container}>
      <HomeComment image onPress={onPress} />
      <HomeComment image onPress={onPress} />
      <HomeComment image onPress={onPress} />
      <HomeComment image onPress={onPress} />
      <HomeComment image onPress={onPress} />
    </View>
  );
};

export default HomeInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
   
  },
});

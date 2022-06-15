import React from 'react';
import { useState } from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import TabsHeader from './TabsHeadder';

const {width, height} = Dimensions.get('window');

const SearchScreen = () => {
  // const [text, setText] = useState('');
  

  return (
    <View style={styles.container}>
      <TabsHeader />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width,
    height,
  },
});

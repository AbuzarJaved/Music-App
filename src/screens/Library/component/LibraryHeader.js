import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const LibraryHeader = () => {
  return (
    <View style={styles.subHeader}>
      <Text style={{color: '#fff', fontSize: scale(18), fontFamily: 'Helvetica-Bold'}}>
        Library
      </Text>

      {/* <Text
        style={{
          textAlign: 'center',
          color: '#eee',
          fontSize: 15,
          fontFamily: 'Gilroy-Bold',
        }}>
        Library
      </Text> */}
    </View>
  );
};

export default LibraryHeader;

const styles = StyleSheet.create({
  // container: {
  //   position: 'absolute',
  //   top: 0,
  //   height: 60,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width,
  // },
  subHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#333',
    borderWidth: 1,
    // paddingTop: 10,
  },
});

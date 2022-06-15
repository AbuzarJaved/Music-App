import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const BottomSheetHeader = () => {
  return (
    <View>
      <Text style={{color: '#eee', fontSize: 13}}>
        Top Artist
        <Text style={{color: '#f68128', fontSize: 15}}>&nbsp;&nbsp;USA</Text>
      </Text>
    </View>
  );
};

export default BottomSheetHeader;

const styles = StyleSheet.create({});

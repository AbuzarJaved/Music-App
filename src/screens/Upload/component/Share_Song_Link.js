import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Share_Song_Link = ({name, icon}) => {
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <View style={styles.IconCont}>
        {icon}
        <Text
          style={{color: '#eee', fontSize: 12, fontFamily: 'Helvetica-Bold',letterSpacing:0.6}}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Share_Song_Link;

const styles = StyleSheet.create({
  IconCont: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: 'center',
  },
});

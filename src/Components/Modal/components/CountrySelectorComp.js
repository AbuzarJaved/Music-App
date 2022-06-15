import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CountrySelectorComp = props => {
  return (
    <TouchableOpacity
      style={styles.country}
      onPress={() => props.onPress()}
      activeOpacity={0.8}>
      <Text
        style={{fontFamily: 'Helvetica-Medium', fontSize: 15, color: '#fff'}}>
        {props.name}
        &nbsp;&nbsp;<Text>({props.dial_code})</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default CountrySelectorComp;

const styles = StyleSheet.create({
  country: {
    width: '100%',
    paddingVertical: 15,
    borderBottomColor: '#555',
    borderBottomWidth: 0.5,
  },
});

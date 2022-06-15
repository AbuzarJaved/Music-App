import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CustomAlphabetFilterView = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => props.onPress()}
      style={[
        styles.container,
        props.value === props.title ? {backgroundColor: '#F68128'} : null,
      ]}>
      <Text style={{color: '#fff', fontWeight: '800', fontSize: 15}}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomAlphabetFilterView;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#F68128',
    width: 60,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
});

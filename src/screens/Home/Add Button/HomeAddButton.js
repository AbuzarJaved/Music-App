import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Button = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => onPress()}>
      <Icon name="md-add" color="#eee" size={36} style={{paddingLeft: 2}} />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 45,
    right: 20,
    zIndex: 100,
    elevation: 5,
    // borderWidth: 1,
    backgroundColor: '#f68128',
    // borderColor: '#f68128',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
  },
});

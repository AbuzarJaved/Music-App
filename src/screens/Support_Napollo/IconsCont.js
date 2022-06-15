import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, ScaledSheet} from 'react-native-size-matters';

const IconsCont = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress ? () => props.onPress() : null}>
      <Icon
        name={props.iconName}
        //   style={{marginRight: 10}}
        color={props.iconColor ? props.iconColor : '#ddd'}
        size={scale(30)}
      />
    </TouchableOpacity>
  );
};

export default IconsCont;

const styles = StyleSheet.create({});

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, ScaledSheet} from 'react-native-size-matters';

const EllipsisVerticalIcon = ({onPress, color, size}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Icon name="md-ellipsis-vertical" size={scale(20)} color={color} />
    </TouchableOpacity>
  );
};

export default EllipsisVerticalIcon;

const styles = StyleSheet.create({});

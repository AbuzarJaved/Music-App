import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ActivityIndicators = (props) => {
  return (
    <ActivityIndicator size={65} color="#F68128">
      {/* {props.children} */}
      {/* <Icon name="pause" color="#eee" size={40} style={{paddingLeft: 3}} /> */}
    </ActivityIndicator>
  );
};

export default ActivityIndicators;

const styles = StyleSheet.create({});

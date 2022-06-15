import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Divider = (props) => {
  return (
    <View
      style={[
        {
          borderWidth: 0.5,

          width: '100%',
        },
        props.bc ? {borderBottomColor: props.bc} : '#444',
        props.mt ? {marginTop: props.mt} : null,
        props.mb ? {marginBottom: props.mb} : null,
      ]}></View>
  );
};

export default Divider;

const styles = StyleSheet.create({});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

const Progress = (props) => {
  return (
    <ProgressCircle
      percent={Number(props.progress)}
      radius={150 / 2}
      borderWidth={8}
      color="#f68128"
      shadowColor="#999"
      bgColor="#111"
      outerCircleStyle={{
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
      }}>
      <Text style={{fontSize: 20, color: '#f68128'}}>
        {String(props.progress)}%
      </Text>
    </ProgressCircle>
  );
};

export default Progress;

const styles = StyleSheet.create({});

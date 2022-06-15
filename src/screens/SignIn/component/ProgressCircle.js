import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {scale, ScaledSheet} from 'react-native-size-matters';

const ProgressCircle2 = props => {
  return (
    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
      <ProgressCircle
        percent={props.percent}
        radius={scale(20)}
        borderWidth={scale(3)}
        color="#f68128"
        shadowColor="#666"
        bgColor="#333">
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(8),
            color: '#fff',
            fontFamily: 'Helvetica-Medium',
          }}>{`${props.percent}%`}</Text>
      </ProgressCircle>
      <View style={{marginLeft: scale(10)}}>
        <Text
          style={{
            fontSize: scale(13),
            color: '#ddd',
            fontFamily: 'Helvetica-Bold',
          }}>
          {props.step}
        </Text>
        <Text
          style={{
            fontSize: scale(10),
            color: '#999',
            marginVertical: scale(2),
            fontFamily: 'Helvetica-Medium',
          }}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export default ProgressCircle2;

const styles = StyleSheet.create({});

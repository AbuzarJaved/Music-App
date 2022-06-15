import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const FollowersCont = (props) => {
  return (
    <View style={{marginRight: scale(20)}}>
      <Text
        style={{
          color: '#fff',
          fontSize: scale(12),
          fontFamily: 'Helvetica-Medium',
        }}>
        {props.num}
      </Text>
      <Text
        style={{
          color: '#666',
          fontSize: scale(10),
          fontFamily: 'Helvetica-Bold',
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export default FollowersCont;

const styles = StyleSheet.create({});

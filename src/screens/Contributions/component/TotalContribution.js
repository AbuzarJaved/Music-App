import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TotalContribution = ({price}) => {
  return (
    <View style={{width:"100%"}}>
      {/* TOTAL CONTRIBUTIONS */}
      <Text style={{color: '#eee', fontSize: 15, fontFamily: 'Gilroy-Bold'}}>
        Total Balance:
      </Text>
      <Text
        style={{
          color: '#eee',
          fontSize: 30,
          fontFamily: 'Gilroy-ExtraBold',
          marginTop: 5,
        }}>
        $ {price}.00
      </Text>
    </View>
  );
};

export default TotalContribution;

const styles = StyleSheet.create({});

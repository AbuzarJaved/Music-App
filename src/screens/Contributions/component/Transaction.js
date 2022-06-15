import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const Transaction = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} style={{width: '80%'}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../../assests/images/caro1.jpg')}
            style={styles.Image}
          />
          <View style={{marginLeft: 10, paddingTop: 5}}>
            <Text
              style={{color: '#eee', fontSize: 13, fontFamily: 'Gilroy-Bold'}}>
              Micheal
            </Text>
            <Text
              style={{
                color: '#f68128',
                fontSize: 9,
                fontFamily: 'Gilroy-Bold',
              }}>
              @Micheal
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text
        style={{
          color: 'rgba(0,255,0,0.9)',
          fontSize: 15,
          fontFamily: 'Gilroy-Bold',
        }}>
        +$200
      </Text>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});

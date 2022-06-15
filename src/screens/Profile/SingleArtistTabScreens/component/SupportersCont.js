import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Image1 from '../../../../assests/images/profile.jpg';

const SupportersCont = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container}>
      <Image style={styles.imageStyle} source={Image1} />
      <View style={{width: '50%'}}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.name_handle}>{props.handle}</Text>
        <Text style={styles.num_of_support}>1</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SupportersCont;

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 120,
    borderColor: '#233',
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: .2,
    shadowRadius: 10.0,

    elevation: 5,
    // backgroundColor: '#900',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 20,
    overflow: 'hidden'
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginRight: 10,
  },
  name: {
    color: '#eee',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  name_handle: {
    color: '#F68128',
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'lowercase',
    marginLeft: 5,
  },
  num_of_support: {
    color: '#F68128',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'right',
  },
});

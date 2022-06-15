import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Image1 from '../../../../assests/images/caro.jpg';

const MediaContainer = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container}>
      <View stytle={styles.imageCont}>
        <View style={styles.likes}>
          <Image
            source={require('../../../../assests/images/verification.png')}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              marginRight: 5,
            }}
          />
          <Text style={{color: '#eee', fontSize: 13}}>94k</Text>
        </View>
        <Image source={Image1} style={styles.imageStyle} />
      </View>
      <View
        style={{
          width: '100%',

          flexWrap: 'wrap',
          marginTop: -15,
          paddingHorizontal: 5,
        }}>
        <Text
          numberOfLines={2}
          style={{color: '#fff', fontSize: 12, width: '100%'}}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MediaContainer;

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 150,
    borderColor: '#233',
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    marginRight: 15,
    // backgroundColor: '#900',
  },
  imageCont: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
  },
  imageStyle: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
  },
  likes: {
    position: 'absolute',
    left: 10,
    top: 80,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

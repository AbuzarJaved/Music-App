import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const Small_Loading_Anim = ({width, height}) => {
  return (
    // <View style={{width,height}}>
    <Image
      style={{width, height}}
      source={require('../../assests/Animations/laoding.gif')}
    />
    // </View>
  );
};

export default Small_Loading_Anim;

const styles = StyleSheet.create({});

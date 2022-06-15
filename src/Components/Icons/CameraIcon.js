import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Camera from '../../assests/Icons/camera.svg';

const CameraIcon = ({color,width,height}) => {
  return <Camera width={width} height={height} fill={color} />;
};

export default CameraIcon;

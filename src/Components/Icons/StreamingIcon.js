import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Streaming from '../../assests/Icons/streaming.svg';

const StreamingIcon = ({color,width,height}) => {
  return <Streaming width={width} height={height} fill={color} />;
};

export default StreamingIcon;

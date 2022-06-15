import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Music from '../../assests/Icons/Music (1).svg';

const MusicIcon = ({color, width, height}) => {
  return <Music width={width} height={height} fill={color} />;
};

export default MusicIcon;

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Skrill from '../../assests/Icons/Skrill_logo.svg';

const SkrillIcon = ({width, height}) => {
  return <Skrill width={width} height={height} />;
};

export default SkrillIcon;

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Checked from '../../assests/Icons/checked.svg';

const CheckedIcon = ({color}) => {
  return <Checked width={150} height={150} fill={color} />;
};

export default CheckedIcon;

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Expansion from '../../assests/Icons/Expansion 4.svg';

const ExpansionIcon = ({color}) => {
  return <Expansion width={24} height={24} fill={color} />;
};

export default ExpansionIcon;

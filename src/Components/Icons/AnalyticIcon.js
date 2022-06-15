import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Analytic from '../../assests/Icons/Trending, What_s Hot.svg';

const AnalyticIcon = ({color}) => {
  return <Analytic width={24} height={24} fill={color} />;
};

export default AnalyticIcon;

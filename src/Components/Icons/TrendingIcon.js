import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Trending from '../../assests/Icons/Trending, What_s Hot.svg';

const TrendingIcon = ({color}) => {
  return <Trending width={24} height={24} fill={color} />;
};

export default TrendingIcon;

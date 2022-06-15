import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Ads from '../../assests/Icons/NoAds.svg';

const AdsIcon = ({color, width, height}) => {
  return <Ads width={width} height={height} fill={color} />;
};

export default AdsIcon;

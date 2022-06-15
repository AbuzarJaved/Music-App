import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Discover from '../../assests/Icons/Discover 2.svg';

const DiscoverIcon = ({color}) => {
  return <Discover width={24} height={24} fill={color} />;
};

export default DiscoverIcon;

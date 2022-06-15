import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Share from '../../assests/Icons/Share.svg';

const ShareIcon = ({color,width,height}) => {
  return (
    <Share
      width={width ? width : 26}
      height={height ? height : 26}
      fill={color}
    />
  );
};

export default ShareIcon;

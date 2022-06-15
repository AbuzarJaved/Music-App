import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import ChooseFromCameraIcon from '../../assests/Icons/Choose_Camera.svg';

const Choose_From_Camera_Icon = ({color, width, height}) => {
  return <ChooseFromCameraIcon width={width} height={height} fill={color} />;
};

export default Choose_From_Camera_Icon;

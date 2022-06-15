import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import EditIcon from '../../assests/Icons/Edit 2.svg';

const Edit_Icon = ({color, width, height}) => {
  return <EditIcon width={width} height={height} fill={color} />;
};

export default Edit_Icon;

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import EditUserIcon from '../../assests/Icons/user.svg';

const Edit_User_Icon = ({color, width, height}) => {
  return <EditUserIcon width={width} height={height} fill={color} />;
};

export default Edit_User_Icon;

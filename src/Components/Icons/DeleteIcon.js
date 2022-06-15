import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import DeleteUserIcon from '../../assests/Icons/Delete.svg';

const Delete_User_Icon = ({color, width, height}) => {
  return <DeleteUserIcon width={width} height={height} fill={color} />;
};

export default Delete_User_Icon;

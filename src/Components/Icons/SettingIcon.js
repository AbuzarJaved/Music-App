import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Setting from '../../assests/Icons/Settings.svg';

const SettingIcon = ({color}) => {
  return <Setting width={24} height={24} fill={color} />;
};

export default SettingIcon;

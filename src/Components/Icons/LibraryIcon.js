import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Library from '../../assests/Icons/Music_Library.svg';

const LibraryIcon = ({color}) => {
  return <Library width={24} height={24} fill={color} />;
};

export default LibraryIcon;

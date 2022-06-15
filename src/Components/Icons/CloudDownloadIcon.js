import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import CloudDownload from '../../assests/Icons/Cloud Download.svg';

const CloudDownloadIcon = ({color, width, height}) => {
  return <CloudDownload width={width} height={height} fill={color} />;
};

export default CloudDownloadIcon;

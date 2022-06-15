import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Upload from '../../assests/Icons/upload.svg';

const UploadIcon = ({color, width, height}) => {
  return (
    <Upload
      width={width ? width : 20}
      height={height ? height : 20}
      fill={color}
    />
  );
};

export default UploadIcon;

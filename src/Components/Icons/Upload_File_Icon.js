import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Upload_File from '../../assests/Icons/upload-folder.svg';

const Upload_File_Icon = ({color,width,height}) => {
  return <Upload_File width={width} height={height} fill={color} />;
};

export default Upload_File_Icon;

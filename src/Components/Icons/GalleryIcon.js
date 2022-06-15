import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import GalleryIcon from '../../assests/Icons/Gallery.svg';

const Gallery_Icon = ({color, width, height}) => {
  return <GalleryIcon width={width} height={height} fill={color} />;
};

export default Gallery_Icon;

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Album from '../../assests/Icons/new_albums.svg';

const AlbumIcon = ({width, height, color}) => {
  return (
    <Album
      fill={color}
      width={width ? width : 24}
      height={height ? height : 24}
    />
  );
};

export default AlbumIcon;

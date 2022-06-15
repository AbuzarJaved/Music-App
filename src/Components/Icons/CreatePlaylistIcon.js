import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Music from '../../assests/Icons/Music Library.svg';
import CreatePlaylist from '../../assests/Icons/Music Library.svg'

const CreatePlaylistIcon = ({color, width, height}) => {
  return <CreatePlaylist width={width} height={height} fill={color} />;
};

export default CreatePlaylistIcon;

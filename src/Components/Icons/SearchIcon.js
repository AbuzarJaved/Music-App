import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Search from '../../assests/Icons/Search Icon.svg';

const SearchIcon = ({color}) => {
  return <Search width={24} height={24} fill={color} />;
};

export default SearchIcon;

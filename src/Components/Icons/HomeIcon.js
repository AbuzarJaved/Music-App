import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Home from '../../assests/Icons/Home.svg';

const HomeIcon = ({color}) => {
    return <Home width={24} height={24} fill={color} />;
};

export default HomeIcon;

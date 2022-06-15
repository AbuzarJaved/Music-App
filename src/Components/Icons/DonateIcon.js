import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Donate from '../../assests/Icons/Donate.svg';

const DonateIcon = (props) => {
    return <Donate width={20} height={20} fill={props.color} {...props}/>;
};

export default DonateIcon;

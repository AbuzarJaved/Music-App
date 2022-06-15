import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Contribution from '../../assests/Icons/Donate Charity.svg';

const ContributionIcon = ({color}) => {
  return <Contribution width={24} height={24} fill={color} />;
};

export default ContributionIcon;

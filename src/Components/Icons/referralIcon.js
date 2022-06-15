import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';

import Referral from '../../assests/Icons/referral.svg'

const ReferralIcon = ({color}) => {
  return <Referral width={24} height={24} fill={color} />;
};

export default ReferralIcon;

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import PayPal from '../../assests/Icons/paypal.svg';

const PayPalIcon = ({ width, height}) => {
  return <PayPal width={width} height={height}  />;
};

export default PayPalIcon;

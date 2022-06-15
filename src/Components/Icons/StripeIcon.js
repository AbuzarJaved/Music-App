import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Stripe from '../../assests/Icons/stripe.svg';

const StripeIcon = ({width, height}) => {
  return <Stripe width={width} height={height} />;
};

export default StripeIcon;

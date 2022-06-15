import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Message from '../../assests/Icons/Messages.svg';

const MessageIcon = ({color}) => {
  return <Message width={24} height={24} fill={color} />;
};

export default MessageIcon;

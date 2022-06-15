import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Defs, Path} from 'react-native-svg';
import Notification from '../../assests/Icons/Notifications.svg';

const NotificationIcon = ({color}) => {
  return <Notification width={24} height={24} fill={color} />;
};

export default NotificationIcon;

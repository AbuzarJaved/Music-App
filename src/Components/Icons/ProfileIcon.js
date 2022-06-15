import React from 'react';

import Svg, {Defs, Path} from 'react-native-svg';
import Profile from '../../assests/Icons/Profile.svg';

const ProfileIcon = ({color}) => {
  return <Profile width={24} height={24} fill={color} />;
};

export default ProfileIcon;

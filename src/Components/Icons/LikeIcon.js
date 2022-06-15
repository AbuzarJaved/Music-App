import React from 'react';

import Svg, {Defs, Path} from 'react-native-svg';
import Like from '../../assests/Icons/like.svg';

const LikeIcon = ({color}) => {
  return <Like width={24} height={24} fill={color} />;
};

export default LikeIcon;

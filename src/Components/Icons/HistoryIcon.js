import React from 'react';

import Svg, {Defs, Path} from 'react-native-svg';
import History from '../../assests/Icons/history.svg';

const HistoryIcon = ({color}) => {
  return <History width={24} height={24} fill={color} />;
};

export default HistoryIcon;

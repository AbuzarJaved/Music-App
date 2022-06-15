import React from 'react';

import Svg, {Defs, Path} from 'react-native-svg';
import Download from '../../assests/Icons/Download.svg';

const DownloadIcon = ({color, width, height}) => {
  return <Download width={width} height={height} fill={color} />;
};

export default DownloadIcon;

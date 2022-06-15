import React from 'react';

import Svg, {Defs, Path} from 'react-native-svg';
import Playlist from '../../assests/Icons/Playlist 11.svg';

const PlaylistIcon = ({color}) => {
  return <Playlist width={24} height={24} fill={color} />;
};

export default PlaylistIcon;

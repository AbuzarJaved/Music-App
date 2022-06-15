import React from 'react';

import Svg, {Defs, Path} from 'react-native-svg';
import AddToPlaylist from '../../assests/Icons/Add Playlist.svg';

const AddToPlaylistIcon = ({color}) => {
  return <AddToPlaylist width={24} height={24} fill={color} />;
};

export default AddToPlaylistIcon;

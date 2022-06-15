import React from 'react';

import Svg, {Defs, Path} from 'react-native-svg';
import Artist from '../../assests/Icons/Artiste.svg';

const ArtistIcon = ({color, width, height}) => {
  return (
    <Artist
      width={width ? width : 24}
      height={height ? height : 24}
      fill={color}
    />
  );
};

export default ArtistIcon;

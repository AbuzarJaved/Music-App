import React from 'react';
import {StatusBar} from 'react-native';

import {useSelector} from 'react-redux';

import ArtistLibrary from './UserLibraryTypes/MainArtistLibrary';
import ListenerLibrary from './UserLibraryTypes/MainListenerLibrary';

const MainLibraryPage = () => {
  const userLogin = useSelector(state => state.userLogin);
  const {type} = userLogin;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {type === 'ARTIST' ? <ArtistLibrary /> : <ListenerLibrary />}
    </>
  );
};

export default MainLibraryPage;

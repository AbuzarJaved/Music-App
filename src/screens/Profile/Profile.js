import React from 'react';

import {useSelector, useDispatch} from 'react-redux';

import MainArtistProfile from './ProfileTypes/MainArtistProfile';
import MainListenerProfile from './ProfileTypes/MainListenerProfile';

const Profile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const {type: userType} = userLogin;

  if (userType === 'ARTIST') {
    return <MainArtistProfile />;
  } else {
    return <MainListenerProfile />;
  }
};

export default Profile;

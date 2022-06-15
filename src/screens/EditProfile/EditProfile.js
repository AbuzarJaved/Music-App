import React, {useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import ArtistEditProfile from './userType/artistEditProfile';
import ListenerEditProfile from './userType/listenerEditPage';

const EditProfile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const {type} = userLogin;
  // console.log(type, 'TYPE');

  // if (type === 'ARTIST') {
    return <ArtistEditProfile />;
  // } else {
  //   return <ListenerEditProfile />;
  // }
};

export default EditProfile;

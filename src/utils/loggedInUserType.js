import {useSelector, useDispatch} from 'react-redux';
import React from 'react';
import {logout} from '../redux/actions/userActions';
import {
  LOGOUT_USER_WHEN_TOKEN_EXPIRES,
  SHOW_NOT_ACTIVE_ACCOUNT_MODAL,
} from '../redux/constants';
import {callingCodes} from '../data5';

export const getLoggedInUserProfile = type => {
  const getUserProfile = useSelector(state => state.getUserProfile);
  const getArtistProfile = useSelector(state => state.getArtistProfile);

  if (type === 'LISTENER') {
    return getUserProfile;
  } else if (type === 'ARTIST') {
    return getUserProfile;
  }
};

export const logoutUserWhenTokenExpires = (dispatch, error, type) => {
  console.log(error, 'MAIN ERROR FROM TOKE EXPIRES');
  if (
    error?.message ===
      'Invalid and/or expired access token. Please request a new access token' ||
    error?.response?.data.responseDescription ===
      'Invalid and/or expired access token. Please request a new access token'
  ) {
    dispatch(logout());
    dispatch({
      type: LOGOUT_USER_WHEN_TOKEN_EXPIRES,
      payload:
        'Invalid and/or expired access token. Please request a new access token',
    });
    dispatch({
      type: type,
      payload:
        error?.response && error?.response?.data?.responseDescription
          ? error?.response?.data?.responseDescription
          : error?.message,
    });
  } else if (
    error?.response?.data.responseDescription ===
      'Your account is not active. Please activate your account with the token sent to your email address' ||
    error?.status === 401
    // 'Your account is not active. Please activate your account with the token sent to your email address'
  ) {
    dispatch({
      type: SHOW_NOT_ACTIVE_ACCOUNT_MODAL,
    });
  } else {
    dispatch({
      type: type,
      payload:
        error?.response && error?.response?.data?.responseDescription
          ? error?.response?.data?.responseDescription
          : error?.message,
    });
  }
};

export const getUserCallingCode = val => {
  const res = callingCodes.filter(x => x.code === val);
  // console.log(res[0].dial_code, 'CALLINGcODE');
  return res[0].dial_code;
};

export const getFullCountry = val => {
  const res = callingCodes.filter(x => x.code === val);
  // console.log(res[0], 'RES OBJECT');
  return res[0]?.name || val;
};
export const formatNumbers = val => {
  if (val >= 1000000 || val < 10000000) {
    const value2 = (val / 1000000).toFixed(2);
    return `${value2} M`;
  } else if (10000000 <= val < 100000000) {
    const value3 = (val / 10000000).toFixed(2);
    return `${value3} M`;
  } else if (100000000 <= val < 1000000000) {
    const value4 = (val / 100000000).toFixed(2);
    return `${value4} M`;
  }
};

export const formatNumbers1 = val => {
  if (val < 1000) {
    return `${val}`;
  } else if (1000 <= val < 10000) {
    const value = (val / 1000).toFixed(2);
    return `${value} K`;
  } else if (10000 <= val < 100000) {
    const value8 = (val / 10000).toFixed(2);
    return `${value8} K`;
  } else if (100000 <= val < 1000000) {
    const value9 = (val / 100000).toFixed(2);
    return `${value9} K`;
  }
};
export const formatNumbers2 = val => {
  if (1000000000 <= val < 10000000000) {
    const value5 = (val / 1000000000).toFixed(2);
    return `${value5} B`;
  } else if (10000000000 <= val < 100000000000) {
    const value6 = (val / 10000000000).toFixed(2);
    return `${value6} B`;
  }
};

export const mainNumberFormat = val => {
  if (val < 1000000) {
    return formatNumbers1(val);
  } else if (val < 1000000000) {
    return formatNumbers(val);
  } else {
    return formatNumbers2(val);
  }
};

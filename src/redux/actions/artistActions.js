import {
  ARTIST_LOGIN_FAIL,
  ARTIST_LOGIN_LOGOUT,
  ARTIST_LOGIN_REQUEST,
  ARTIST_LOGIN_SUCCESS,
  ARTIST_PROFILE_FAIL,
  ARTIST_PROFILE_REQUEST,
  ARTIST_PROFILE_SUCCESS,
  ARTIST_REGISTER_FAIL,
  ARTIST_REGISTER_REQUEST,
  ARTIST_REGISTER_SUCCESS,
  CLEAR_ARTIST_REGISTER_DATA,
  UPDATE_ARTIST_PROFILE_REQUEST,
  UPDATE_ARTIST_PROFILE_FAIL,
  UPDATE_ARTIST_PROFILE_SUCCESS,
  UPDATE_ARTIST_PROFILE_PICS_FAIL,
  UPDATE_ARTIST_PROFILE_PICS_REQUEST,
  UPDATE_ARTIST_PROFILE_PICS_SUCCESS,
  GET_ALL_ARTISTS_FAIL,
  GET_ALL_ARTISTS_LOADING,
  GET_ALL_ARTISTS_SUCCESS,
} from '../constants/index';
import {logout} from './userActions';
import axios from 'axios';
import {
  saveDataToStorage,
  removeDataFromStorage,
  loadDataFromStorage,
} from '../../utils/asyncStorage';
import {BASE_URL2, ADMIN_USERNAME, ADMIN_PASSWORD} from '@env';
import axiosInstance from '../../utils/axiosInstance';
import base64 from 'react-native-base64';
import RNFetchBlob from 'rn-fetch-blob';

export const artistRegister =
  (
    firstName,
    lastName,
    stageName,
    bookingEmailAddress,
    bookingMobileNumber,
    password,
    genres,
    address,
    city,
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ARTIST_REGISTER_REQUEST,
      });

      const {
        getAccessToken: {accessToken},
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const data = await axios.post(
        `${BASE_URL2}/artist`,
        {
          firstName,
          lastName,
          stageName,
          bookingEmailAddress,
          bookingMobileNumber,
          password,
          genres,
          address,
          city,
        },
        config,
      );
      console.log(data, 'artist success DATA');
      dispatch({
        type: ARTIST_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ARTIST_REGISTER_FAIL,
        payload:
          error.response && error.response.data.description
            ? error.response.data.description
            : error.message,
      });
    }
  };

export const clearRegisterError = () => {
  return {
    type: CLEAR_ARTIST_REGISTER_DATA,
  };
};

export const get_Artist_Profile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTIST_PROFILE_REQUEST,
    });

    // const {
    //   userLogin: {token},
    // } = getState();
    const token = getState().userLogin.token;

    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.get(`${BASE_URL2}/artist`, config);
    console.log('ARTIST PROFILE DATA', data);
    dispatch({
      type: ARTIST_PROFILE_SUCCESS,
      payload: data.data,
    });
    saveDataToStorage('artist_Info', data.data);
  } catch (error) {
    dispatch({
      type: ARTIST_PROFILE_FAIL,
      payload:
        error.response && error.response.data.description
          ? error.response.data.description
          : error.message,
    });
    // dispatch(logout());
  }
};

export const update_Artist_Profile =
  (
    firstName,
    lastName,

    description,
    website,
    artistId,
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_ARTIST_PROFILE_REQUEST,
      });

      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;

      const config = {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
      };
      const data = {
        firstName,
        lastName,

        description,
        website,
      };

      const res = await axios.put(
        `${BASE_URL2}/artist/${artistId}`,
        data,
        config,
      );
      // console.log(res,'UPDATES PROFILE RES')
      dispatch({
        type: UPDATE_ARTIST_PROFILE_SUCCESS,
        payload: res.data,
      });
      dispatch(get_Artist_Profile());
      // dispatch({
      //   type: ARTIST_PROFILE_SUCCESS,
      // });
    } catch (error) {
      dispatch({
        type: UPDATE_ARTIST_PROFILE_FAIL,
        payload:
          error.response && error.response.data.description
            ? error.response.data.description
            : error.message,
      });
    }
  };

export const updateArtistProfilePics =
  (mediaMultipartFile, profilePicType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_ARTIST_PROFILE_PICS_REQUEST,
      });
      // console.log(pictureMultipartFile, 'MEDIA FROM ACTION');
      // console.log( profilePicType, 'MEDIA FROM ACTION');
      const token = getState().userLogin.token;

      const authorization = `Bearer ${token}`;

      let res = await RNFetchBlob.fetch(
        'POST',
        `${BASE_URL2}/artist/photo`,
        {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'mediaMultipartFile',
            data: RNFetchBlob.wrap(mediaMultipartFile),
            type: profilePicType,
          },
        ],
      );
      let responseJson = await res.json();
      console.log(responseJson, 'JSON');
      if (responseJson.status === true) {
        dispatch({
          type: UPDATE_ARTIST_PROFILE_PICS_SUCCESS,
          payload: responseJson,
        });

        // dispatch({
        //   type: CLEAR_UPLOAD_DATA,
        // });
      } else {
        dispatch({
          type: UPDATE_ARTIST_PROFILE_PICS_FAIL,
          payload: responseJson.description,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ARTIST_PROFILE_PICS_FAIL,
        payload:
          error.response && error.response.data.description
            ? error.response.data.description
            : error.message,
      });
    }
  };

export const get_All_Artist = (page, size) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_ARTISTS_LOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;

    const config = {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
      params: {
        page,
        size,
      },
    };

    const {data} = await axios.get(`${BASE_URL2}/artists`, config);

    dispatch({
      type: GET_ALL_ARTISTS_SUCCESS,
      payload: data.data,
    });
    saveDataToStorage('App_Arists', data.data.content);
  } catch (error) {
    dispatch({
      type: GET_ALL_ARTISTS_FAIL,
      payload:
        error.response && error.response.data.description
          ? error.response.data.description
          : error.message,
    });
  }
};

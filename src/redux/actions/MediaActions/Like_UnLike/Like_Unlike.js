import {
  LIKE_MEDIA_FAIL,
  LIKE_MEDIA_SUCCESS,
  LIKE_MEDIA_lOADING,
  UNLIKE_MEDIA_FAIL,
  UNLIKE_MEDIA_SUCCESS,
  UNLIKE_MEDIA_lOADING,
  ADD_MEDIA_TO_LIKED_LIST,
  REMOVE_MEDIA_FROM_LIKED_LIST,
} from '../../../constants/index';
import {BASE_URL2} from '@env';
import axios from 'axios';
import {logoutUserWhenTokenExpires} from '../../../../utils/loggedInUserType';
import {get_Listener_Liked_Media} from '../getMediaActions';

import axiosInstance from '../../../../utils/axiosInstance';

axios.defaults.timeout = 20000;
axios.defaults.timeoutErrorMessage =
  'Could not connect to server.Poor network connection';
export const likeMedia =
  (id, state = true, page = 0, size = 200) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: LIKE_MEDIA_lOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        params: {
          state,
        },
        headers: {
          Authorization: authorization,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/media/${id}/like`, config);
      // axiosInstance()

      dispatch({
        type: LIKE_MEDIA_SUCCESS,
        payload: data,
      });
      if (data) {
        dispatch(get_Listener_Liked_Media(page, size));
      }
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, LIKE_MEDIA_FAIL);
      // dispatch({
      //   type: LIKE_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const unLikeMedia =
  (id, state = false, page = 0, size = 200) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UNLIKE_MEDIA_lOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          state,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/media/${id}/like`, config);

      dispatch({
        type: UNLIKE_MEDIA_SUCCESS,
        payload: data,
      });
      if (data) {
        dispatch(get_Listener_Liked_Media(page, size));
      }
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, UNLIKE_MEDIA_FAIL);
      // dispatch({
      //   type: UNLIKE_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const addToLikedList = media => {
  return {
    type: ADD_MEDIA_TO_LIKED_LIST,
    payload: media,
  };
};
export const removeFromLikedList = media => {
  return {
    type: REMOVE_MEDIA_FROM_LIKED_LIST,
    payload: media,
  };
};

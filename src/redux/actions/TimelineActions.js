import {
  ARTIST_TIMELINE_POST_FAIL,
  ARTIST_TIMELINE_POST_LOADING,
  ARTIST_TIMELINE_POST_SUCCESS,
  GET_TIMELINE_POST_FAIL,
  GET_TIMELINE_POST_LOADING,
  GET_TIMELINE_POST_SUCCESS,
} from '../constants/index';

import axios from 'axios';
import {Platform} from 'react-native';
import {
  saveDataToStorage,
  removeDataFromStorage,
  loadDataFromStorage,
  clearDataFromStorage,
} from '../../utils/asyncStorage';
import {BASE_URL2} from '@env';
import axiosInstance from '../../utils/axiosInstance';
import base64 from 'react-native-base64';
import RNFetchBlob from 'rn-fetch-blob';
import {logoutUserWhenTokenExpires} from '../../utils/loggedInUserType';

axios.defaults.timeout = 60000;
axios.defaults.timeoutErrorMessage =
  'Could not connect to server.Poor network connection';

export const timeline_Post =
  (post, imageFile, imageType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ARTIST_TIMELINE_POST_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const postData = new FormData();

      if (imageFile === '') {
        postData.append('post', post);
      } else {
        postData.append('post', post);
        postData.append('imageFile', {
          uri: Platform.OS === 'android' ? `file://${imageFile}` : imageFile,
          type: imageType,
          name: 'imageFile',
        });
      }

      const config = {
        method: 'post',
        url: `${BASE_URL2}/timeline/post`,
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
        data: postData,
      };
      const {data} = await axios(config);
      console.log(data, 'POST DATA');
      dispatch({
        type: ARTIST_TIMELINE_POST_SUCCESS,
        payload: data,
      });
      if (data) {
        dispatch(get_Timeline_Post());
      }
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, ARTIST_TIMELINE_POST_FAIL);
    }
  };

export const get_Timeline_Post =
  (page = 0, size = 50) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_TIMELINE_POST_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {page, size},
      };
      const {data} = await axios.get(`${BASE_URL2}/timeline/posts`, config);
      console.log(data, 'TIMELINE POSTS');
      dispatch({
        type: GET_TIMELINE_POST_SUCCESS,
        payload: data.responseBody,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_TIMELINE_POST_FAIL);
    }
  };

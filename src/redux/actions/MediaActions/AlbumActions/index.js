import {
  CREATE_ALBUM_FAIL,
  CREATE_ALBUM_LOADING,
  CREATE_ALBUM_SUCCESS,
  GET_ALBUM_DETAILS_FAIL,
  GET_ALBUM_DETAILS_LOADING,
  GET_ALBUM_DETAILS_SUCCESS,
  GET_ALL_USER_ALBUM_FAIL,
  GET_ALL_USER_ALBUM_LOADING,
  GET_ALL_USER_ALBUM_SUCCESS,
  DELETE_ALBUM_SUCCESS,
  DELETE_ALBUM_FAIL,
  DELETE_ALBUM_LOADING,
  CLEAR_ALBUM_ERROR,
  CLEAR_ALBUM_FORM,
  CLEAR_ALL_USER_ALBUM_ON_LOGOUT,
  UPDATE_ALBUM_DETAILS_FAIL,
  UPDATE_ALBUM_DETAILS_LOADING,
  UPDATE_ALBUM_DETAILS_SUCCESS,
  CLEAR_UPDATE_ALBUM_DETAILS,
  STORE_ACTIVE_ALBUM_DETAILS,
  ADD_SONG_TO_ALBUM_FAIL,
  ADD_SONG_TO_ALBUM_LOADING,
  ADD_SONG_TO_ALBUM_SUCCESS,
  LIKE_ALBUM_FAIL,
  LIKE_ALBUM_LOADING,
  LIKE_ALBUM_SUCCESS,
  UN_LIKE_ALBUM_FAIL,
  UN_LIKE_ALBUM_LOADING,
  UN_LIKE_ALBUM_SUCCESS,
  GET_USER_LIKED_ALBUMS_FAIL,
  GET_USER_LIKED_ALBUMS_LOADING,
  GET_USER_LIKED_ALBUMS_SUCCESS,
  ADD_ALBUM_TO_LIKED_LIST,
  REMOVE_ALBUM_FROM_LIKED_LIST,
  STORE_USER_LIKED_ALBUM,
} from '../../../constants/index';

import {BASE_URL2} from '@env';
import axios from 'axios';
import {saveDataToStorage} from '../../../../utils/asyncStorage';
import {Platform} from 'react-native';
import {logoutUserWhenTokenExpires} from '../../../../utils/loggedInUserType';

axios.defaults.timeout = 20000;
axios.defaults.timeoutErrorMessage =
  'Could not connect to server.Poor network connection';
export const create_Album =
  (albumArt, fileType, name, description, year, page = 0, size = 50) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_ALBUM_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const data = new FormData();
      if (albumArt === '') {
        data.append('name', `${name}`);
        data.append('description', `${description}`);
        data.append('year', `${year}`);
      } else {
        data.append('albumArt', {
          uri: Platform.OS === 'android' ? `file://${albumArt}` : albumArt,
          type: fileType,
          name: 'albumArt',
        });
        data.append('name', `${name}`);
        data.append('description', `${description}`);
        data.append('year', `${year}`);
      }

      const config = {
        method: 'post',
        url: `${BASE_URL2}/album`,
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };
      await axios(config)
        .then(res => {
          console.log(res, 'PICS RES');
          dispatch({
            type: CREATE_ALBUM_SUCCESS,
            payload: res.data,
          });
          dispatch(get_All_User_Album(page, size));
        })
        .catch(error => {
          logoutUserWhenTokenExpires(dispatch, error, CREATE_ALBUM_FAIL);
        });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, CREATE_ALBUM_FAIL);
      //   dispatch({
      //     type: CREATE_ALBUM_FAIL,
      //     payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const get_Album_Detail = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALBUM_DETAILS_LOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
      },
    };
    const {data} = await axios.get(`${BASE_URL2}/album/${id}`, config);
    dispatch({
      type: GET_PLAYLIST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, GET_ALBUM_DETAILS_FAIL);
    //     dispatch({
    //     type: GET_ALBUM_DETAILS_FAIL,
    //     payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const get_All_User_Album =
  (page, size) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_USER_ALBUM_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          page,
          size,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/albums`, config);
      dispatch({
        type: GET_ALL_USER_ALBUM_SUCCESS,
        payload: data.responseBody.content,
      });
      saveDataToStorage('artistAlbums', data.responseBody.content);
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_ALL_USER_ALBUM_FAIL);
      //    dispatch({
      //     type: GET_ALL_USER_ALBUM_FAIL,
      //     payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const delete_Album = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ALBUM_LOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
      },
    };

    const {data} = await axios.delete(`${BASE_URL2}/album/${id}`, config);
    dispatch({
      type: DELETE_ALBUM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, DELETE_ALBUM_FAIL);
    // dispatch({
    //   type: DELETE_PLAYLIST_FAIL,
    //   payload:
    //     error.response && error.response.data.description
    //       ? error.response.data.description
    //       : error.message,
    // });
  }
};
export const add_Song_To_Album =
  (albumId, mediaId, page = 0, size = 100) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_SONG_TO_ALBUM_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          media: mediaId,
        },
      };

      const {data} = await axios.get(
        `${BASE_URL2}/album/${albumId}/media`,
        config,
      );
      console.log(data, 'ADDTOALBUM');
      dispatch({
        type: ADD_SONG_TO_ALBUM_SUCCESS,
        payload: data,
      });
      if (data) {
        dispatch(get_All_User_Album(page, size));
      }
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, ADD_SONG_TO_ALBUM_FAIL);
      // dispatch({
      //   type: DELETE_PLAYLIST_FAIL,
      //   payload:
      //     error.response && error.response.data.description
      //       ? error.response.data.description
      //       : error.message,
      // });
    }
  };

export const update_Playlist_Details =
  (albumArt, fileType, name, description, year) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_ALBUM_DETAILS_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const data = new FormData();
      data.append('albumArt', {
        uri: Platform.OS === 'android' ? `file://${albumArt}` : albumArt,
        type: fileType,
        name: 'albumArt',
      });
      data.append('name', `${name}`);
      data.append('description', `${description}`);
      data.append('year', `${year}`);

      const config = {
        method: 'put',
        url: `${BASE_URL2}/album/${id}`,
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      await axios(config)
        .then(res => {
          dispatch({
            type: UPDATE_ALBUM_DETAILS_SUCCESS,
            payload: res.data,
          });
        })
        .catch(error => {
          logoutUserWhenTokenExpires(
            dispatch,
            error,
            UPDATE_ALBUM_DETAILS_FAIL,
          );
          // dispatch({
          //   type: UPDATE_PLAYLIST_DETAILS_FAIL,
          //   payload:
          //     error.response && error.response.data.responseDescription
          //       ? error.response.data.responseDescription
          //       : error.message,
          // });
        });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, UPDATE_ALBUM_DETAILS_FAIL);
      // dispatch({
      //   type: UPDATE_PLAYLIST_DETAILS_FAIL,
      //   payload:
      //     error.response && error.response.data.description
      //       ? error.response.data.description
      //       : error.message,
      // });
    }
  };

export const store_Active_Album_Details = data => {
  return {
    type: STORE_ACTIVE_ALBUM_DETAILS,
    payload: data,
  };
};

export const get_User_Liked_Album =
  (page = 0, size = 200) =>
  async (dispatch, getState) => {
    try {
      dispatch({type: GET_USER_LIKED_ALBUMS_LOADING});

      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          page,
          size,
        },
      };
      const {data} = axios.get(`${BASE_URL2}/album/likes`, config);

      dispatch({
        type: GET_USER_LIKED_ALBUMS_SUCCESS,
        payload: data.responseBody,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_USER_LIKED_ALBUMS_FAIL);
    }
  };

export const likeMedia =
  (id, like = true, page = 0, size = 200) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: LIKE_ALBUM_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        params: {
          like,
        },
        headers: {
          Authorization: authorization,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/album/${id}/like`, config);
      // axiosInstance()

      dispatch({
        type: LIKE_ALBUM_SUCCESS,
        payload: data,
      });
      if (data) {
        dispatch(get_User_Liked_Album(page, size));
      }
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, LIKE_ALBUM_FAIL);
      // dispatch({
      //   type: LIKE_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const unLikeAlbum =
  (id, like = false, page = 0, size = 200) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UN_LIKE_ALBUM_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          like,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/album/${id}/like`, config);

      dispatch({
        type: UN_LIKE_ALBUM_SUCCESS,
        payload: data,
      });
      if (data) {
        dispatch(get_User_Liked_Album(page, size));
      }
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, UN_LIKE_ALBUM_FAIL);
      // dispatch({
      //   type: UNLIKE_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const addToAlbumLikedList = albumId => {
  return {
    type: ADD_ALBUM_TO_LIKED_LIST,
    payload: albumId,
  };
};
export const removeFromAlbumLikedList = albumId => {
  return {
    type: REMOVE_ALBUM_FROM_LIKED_LIST,
    payload: albumId,
  };
};

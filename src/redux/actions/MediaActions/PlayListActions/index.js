import {
  ADD_MEDIA_TO_PLAYLIST_FAIL,
  ADD_MEDIA_TO_PLAYLIST_LOADING,
  ADD_MEDIA_TO_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAIL,
  CREATE_PLAYLIST_LOADING,
  CREATE_PLAYLIST_SUCCESS,
  DELETE_MEDIA_FROM_PLAYLIST_FAIL,
  DELETE_MEDIA_FROM_PLAYLIST_LOADING,
  DELETE_MEDIA_FROM_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_FAIL,
  DELETE_PLAYLIST_LOADING,
  DELETE_PLAYLIST_SUCCESS,
  UPDATE_PLAYLIST_DETAILS_FAIL,
  UPDATE_PLAYLIST_DETAILS_LOADING,
  UPDATE_PLAYLIST_DETAILS_SUCCESS,
  GET_ALL_PLAYLIST_FAIL,
  GET_ALL_PLAYLIST_LOADING,
  GET_ALL_PLAYLIST_SUCCESS,
  GET_ALL_USER_PLAYLIST_FAIL,
  GET_ALL_USER_PLAYLIST_LOADING,
  GET_ALL_USER_PLAYLIST_SUCCESS,
  GET_PLAYLIST_DETAILS_FAIL,
  GET_PLAYLIST_DETAILS_LOADING,
  GET_PLAYLIST_DETAILS_SUCCESS,
  CREATE_PLAYLIST_FROM_MODAL_FAIL,
  CREATE_PLAYLIST_FROM_MODAL_LOADING,
  CREATE_PLAYLIST_FROM_MODAL_SUCCESS,
  CLEAR_PLAYLIST_FROM_MODAL_FORM,
  STORE_ACTIVE_PLAYLIST_DETAILS,
} from '../../../constants/index';
import {BASE_URL2} from '@env';
import axios from 'axios';
import {saveDataToStorage} from '../../../../utils/asyncStorage';
import RNFetchBlob from 'rn-fetch-blob';
import base64 from 'react-native-base64';
import axiosInstance from '../../../../utils/axiosInstance';
import {Platform} from 'react-native';
import {logoutUserWhenTokenExpires} from '../../../../utils/loggedInUserType';


axios.defaults.timeout = 20000;
axios.defaults.timeoutErrorMessage =
  'Could not connect to server.Poor network connection';
export const create_Playlist =
  (name, description, visible, artFile, fileType) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PLAYLIST_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const data = new FormData();
      if (artFile !== '') {
        data.append('artFile', {
          uri: Platform.OS === 'android' ? `file://${artFile}` : artFile,
          type: fileType,
          name: 'artFile',
        });
        data.append('name', `${name}`);
        data.append('description', `${description}`);
        data.append('visible', `${visible}`);
      } else {
        data.append('name', `${name}`);
        data.append('description', `${description}`);
        data.append('visible', `${visible}`);
        // data.append('artFile', null);
      }

      const config = {
        method: 'post',
        url: `${BASE_URL2}/playlist`,
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
            type: CREATE_PLAYLIST_SUCCESS,
            payload: res.data,
          });
        })
        .catch(error => {
          logoutUserWhenTokenExpires(dispatch, error, CREATE_PLAYLIST_FAIL);
          // dispatch({
          //   type: CREATE_PLAYLIST_FAIL,
          //   payload:
          //     error.response && error.response.data.responseDescription
          //       ? error.response.data.responseDescription
          //       : error.message,
          // });
        });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, CREATE_PLAYLIST_FAIL);
      // dispatch({
      //   type: CREATE_PLAYLIST_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };
export const create_Playlist_From_Modal =
  (name, description, visible, artFile, fileType) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PLAYLIST_FROM_MODAL_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const data = new FormData();
      data.append('name', `${name}`);
      data.append('description', `${description}`);
      data.append('visible', `${visible}`);
      data.append('artFile', {
        uri: Platform.OS === 'android' ? `file://${artFile}` : artFile,
        type: fileType,
        name: 'artFile',
      });

      const config = {
        method: 'post',
        url: `${BASE_URL2}/playlist`,
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
            type: CREATE_PLAYLIST_FROM_MODAL_SUCCESS,
            payload: res.data,
          });
        })
        .catch(error => {
          logoutUserWhenTokenExpires(
            dispatch,
            error,
            CREATE_PLAYLIST_FROM_MODAL_FAIL,
          );
          // dispatch({
          //   type: CREATE_PLAYLIST_FROM_MODAL_FAIL,
          //   payload:
          //     error.response && error.response.data.responseDescription
          //       ? error.response.data.responseDescription
          //       : error.message,
          // });
        });
    } catch (error) {
      logoutUserWhenTokenExpires(
        dispatch,
        error,
        CREATE_PLAYLIST_FROM_MODAL_FAIL,
      );
      // dispatch({
      //   type: CREATE_PLAYLIST_FROM_MODAL_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };
export const get_Playlist_Detail = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PLAYLIST_DETAILS_LOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
      },
    };

    const {data} = await axios.get(`${BASE_URL2}/playlist/${id}`, config);
    dispatch({
      type: GET_PLAYLIST_DETAILS_SUCCESS,
      payload: data,
    });
    console.log(data, 'PLAYLIST DETAIL');
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, GET_PLAYLIST_DETAILS_FAIL);
    // dispatch({

    //   type: GET_PLAYLIST_DETAILS_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const get_All_Playlists =
  (page, size, publicState = true) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_PLAYLIST_LOADING,
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
          publicState,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/playlists`, config);
      dispatch({
        type: GET_ALL_PLAYLIST_SUCCESS,
        payload: data.responseBody.content,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_ALL_PLAYLIST_FAIL);
      // dispatch({
      //   type: GET_ALL_PLAYLIST_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const get_All_User_Playlist =
  (page, size) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_USER_PLAYLIST_LOADING,
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

      const {data} = await axios.get(`${BASE_URL2}/playlists`, config);
      dispatch({
        type: GET_ALL_USER_PLAYLIST_SUCCESS,
        payload: data.responseBody.content,
      });
      saveDataToStorage('userPlaylists', data.responseBody.content);
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_ALL_USER_PLAYLIST_FAIL);
      // dispatch({
      //   type: GET_ALL_USER_PLAYLIST_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const delete_Playlist = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PLAYLIST_LOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
      },
    };

    const {data} = await axios.delete(`${BASE_URL2}/playlist/${id}`, config);
    dispatch({
      type: DELETE_PLAYLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, DELETE_PLAYLIST_FAIL);
    // dispatch({
    //   type: DELETE_PLAYLIST_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const update_Playlist_Details =
  (name, description, visible, id, artFile, fileType) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_PLAYLIST_DETAILS_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const data = new FormData();
      data.append('name', `${name}`);
      data.append('description', `${description}`);
      data.append('visible', `${visible}`);
      data.append('artFile', {
        uri: Platform.OS === 'android' ? `file://${artFile}` : artFile,
        type: fileType,
        name: 'artFile',
      });

      const config = {
        method: 'put',
        url: `${BASE_URL2}/playlist/${id}`,
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      await axios(config)
        .then(res => {
          dispatch({
            type: UPDATE_PLAYLIST_DETAILS_SUCCESS,
            payload: res.data,
          });
        })
        .catch(error => {
          logoutUserWhenTokenExpires(
            dispatch,
            error,
            UPDATE_PLAYLIST_DETAILS_FAIL,
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
      logoutUserWhenTokenExpires(dispatch, error, UPDATE_PLAYLIST_DETAILS_FAIL);
      // dispatch({
      //   type: UPDATE_PLAYLIST_DETAILS_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const add_Media_To_Playlist =
  (id, playlistIdentity, state = true, page = 0, size = 50) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_MEDIA_TO_PLAYLIST_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          id,
          state,
        },
      };

      const {data} = await axios.get(
        `${BASE_URL2}/playlist/${playlistIdentity}/media`,
        config,
      );
      dispatch({
        type: ADD_MEDIA_TO_PLAYLIST_SUCCESS,
        payload: data,
      });
      dispatch(get_All_User_Playlist(page, size));
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, ADD_MEDIA_TO_PLAYLIST_FAIL);
      // dispatch({
      //   type: ADD_MEDIA_TO_PLAYLIST_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const delete_Media_From_Playlist =
  (id, playlistIdentity, state = false) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_MEDIA_FROM_PLAYLIST_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          id,
          state,
        },
      };

      const {data} = await axios.get(
        `${BASE_URL2}/playlist/${playlistIdentity}/media`,
        config,
      );
      dispatch({
        type: DELETE_MEDIA_FROM_PLAYLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(
        dispatch,
        error,
        DELETE_MEDIA_FROM_PLAYLIST_FAIL,
      );
      // dispatch({
      //   type: DELETE_MEDIA_FROM_PLAYLIST_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const store_Active_Playlist_Details = data => {
  return {
    type: STORE_ACTIVE_PLAYLIST_DETAILS,
    payload: data,
  };
};

//try {
//    dispatch({
//      type: CREATE_PLAYLIST_LOADING,
//    });
//    const token = getState().userLogin.token;
//    const authorization = `Bearer ${token}`;

//    let res = await RNFetchBlob.fetch(
//      'POST',
//      `${BASE_URL2}/playlist?name=${name}&description=${description}&visible=${visible}`,
//      {
//        Authorization: authorization,
//        'Content-Type': 'multipart/form-data',
//      },
//      [
//        {
//          name: 'artFile',
//          filename: 'artFile',

//          data: RNFetchBlob.wrap(artFile),
//          type: fileType,
//        },
//      ],
//    );

//    let responseJson = await res.json();
//    console.log(responseJson, 'JSON');
//    if (responseJson.status === true) {
//      dispatch({
//        type: CREATE_PLAYLIST_SUCCESS,
//        payload: responseJson,
//      });
//    } else {
//      dispatch({
//        type: CREATE_PLAYLIST_FAIL,
//        payload: responseJson.message
//          ? responseJson.message
//          : responseJson.responseDescription,
//      });
//    }
//  } catch (error) {
//    dispatch({
//      type: CREATE_PLAYLIST_FAIL,
//      payload:
//        error.response && error.response.data.responseDescription
//          ? error.response.data.responseDescription
//          : error.message,
//    });
//  }

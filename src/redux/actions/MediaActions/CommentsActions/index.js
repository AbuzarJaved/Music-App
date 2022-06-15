import {
  CREATE_MEDIA_COMMENT_FAIL,
  CREATE_MEDIA_COMMENT_LOADING,
  CREATE_MEDIA_COMMENT_SUCCESS,
  GET_MEDIA_COMMENTS_FAIL,
  GET_MEDIA_COMMENTS_LOADING,
  GET_MEDIA_COMMENTS_SUCCESS,
  GET_MEDIA_COMMENT_DETAILS_FAIL,
  GET_MEDIA_COMMENT_DETAILS_LOADING,
  GET_MEDIA_COMMENT_DETAILS_SUCCESS,
  DELETE_MEDIA_COMMENT_FAIL,
  DELETE_MEDIA_COMMENT_LOADING,
  DELETE_MEDIA_COMMENT_SUCCESS,
  CREATE_MEDIA_REPLY_FAIL,
  CREATE_MEDIA_REPLY_LOADING,
  CREATE_MEDIA_REPLY_SUCCESS,
} from '../../../constants/index';
import {BASE_URL2} from '@env';
import axios from 'axios';
import {logoutUserWhenTokenExpires} from '../../../../utils/loggedInUserType';


axios.defaults.timeout = 20000;
axios.defaults.timeoutErrorMessage =
  'Could not connect to server.Poor network connection';
export const create_Media_Comment =
  (comment, id, page = 0, size = 100) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_MEDIA_COMMENT_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
      };
      const commentData = {
        comment,
      };
      const {data} = await axios.post(
        `${BASE_URL2}/media/${id}/comment`,
        commentData,
        config,
      );
      dispatch({
        type: CREATE_MEDIA_COMMENT_SUCCESS,
        payload: data,
      });
      dispatch(get_Media_Comments(page, size, id));
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, CREATE_MEDIA_COMMENT_FAIL);
      // dispatch({
      //   type: CREATE_MEDIA_COMMENT_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };
export const create_Media_Reply =
  (comment, commentId, id, page = 0, size = 100) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_MEDIA_REPLY_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
      };
      const commentData = {
        comment,
        commentId,
      };
      const {data} = await axios.post(
        `${BASE_URL2}/media/${id}/comment`,
        commentData,
        config,
      );
      dispatch({
        type: CREATE_MEDIA_REPLY_SUCCESS,
        payload: data,
      });
      dispatch(get_Media_Comments(page, size, id));
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, CREATE_MEDIA_REPLY_FAIL);
      // dispatch({
      //   type: CREATE_MEDIA_COMMENT_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };
export const get_Media_Comments =
  (page, size, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_MEDIA_COMMENTS_LOADING,
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

      const {data} = await axios.get(
        `${BASE_URL2}/media/${id}/comments`,
        config,
      );
      // console.log(data,'MEDIA COMMENTS')
      dispatch({
        type: GET_MEDIA_COMMENTS_SUCCESS,
        payload: data.responseBody,
      });
    } catch (error) {
      // console.log(error, 'MEDIA COMMENTS');
      logoutUserWhenTokenExpires(dispatch, error, GET_MEDIA_COMMENTS_FAIL);
      // dispatch({
      //   type: GET_MEDIA_COMMENTS_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const get_Media_Comment_Details = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MEDIA_COMMENT_DETAILS_LOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
      },
    };

    const {data} = await axios.get(`${BASE_URL2}/media/comment/${id}`, config);
    dispatch({
      type: GET_MEDIA_COMMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, GET_MEDIA_COMMENT_DETAILS_FAIL);
    // dispatch({
    //   type: GET_MEDIA_COMMENT_DETAILS_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const delete_Media_Comment = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_MEDIA_COMMENT_LOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
      },
    };

    const {data} = await axios.delete(
      `${BASE_URL2}/media/comment/${id}`,
      config,
    );
    dispatch({
      type: DELETE_MEDIA_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, DELETE_MEDIA_COMMENT_FAIL);
    // dispatch({
    //   type: DELETE_MEDIA_COMMENT_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

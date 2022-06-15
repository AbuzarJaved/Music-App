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
  CLEAR_MEDIA_COMMENTS_ERROR,
  CREATE_MEDIA_REPLY_FAIL,
  CREATE_MEDIA_REPLY_LOADING,
  CREATE_MEDIA_REPLY_SUCCESS,
} from '../../../constants/index';

export const createMediaCommentReducer = (
  state = {loading: false, error: '', status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case CREATE_MEDIA_COMMENT_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        status: null,
        message: '',
      };
    case CREATE_MEDIA_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case CREATE_MEDIA_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: null,
        message: '',
      };

    default:
      return state;
  }
};
export const createMediaReplyReducer = (
  state = {loading: false, error: '', status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case CREATE_MEDIA_REPLY_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        status: null,
        message: '',
      };
    case CREATE_MEDIA_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case CREATE_MEDIA_REPLY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: null,
        message: '',
      };

    default:
      return state;
  }
};

export const getMediaCommentsReducer = (
  state = {loading: false, error: '', mediaComments: []},
  {type, payload},
) => {
  switch (type) {
    case GET_MEDIA_COMMENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MEDIA_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        mediaComments: payload.content,
      };
    case GET_MEDIA_COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        mediaComments: [],
      };
    case CLEAR_MEDIA_COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
      };

    default:
      return state;
  }
};
export const getMediaCommentDetailsReducer = (
  state = {loading: false, error: '', commentsDetails: {}},
  {type, payload},
) => {
  switch (type) {
    case GET_MEDIA_COMMENT_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MEDIA_COMMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        mediaComments: payload,
      };
    case GET_MEDIA_COMMENT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        mediaComments: {},
      };

    default:
      return state;
  }
};

export const deleteMediaCommentReducer = (
  state = {loading: false, error: '', status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case DELETE_MEDIA_COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MEDIA_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.status,
        message: payload.description,
      };
    case DELETE_MEDIA_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.error,
        status: null,
        message: '',
      };

    default:
      return state;
  }
};

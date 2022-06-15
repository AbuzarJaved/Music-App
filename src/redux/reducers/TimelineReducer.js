import {
  ARTIST_TIMELINE_POST_FAIL,
  ARTIST_TIMELINE_POST_LOADING,
  ARTIST_TIMELINE_POST_SUCCESS,
  CLEAR_ERROR,
  GET_TIMELINE_POST_FAIL,
  GET_TIMELINE_POST_LOADING,
  GET_TIMELINE_POST_SUCCESS,
  STORE_ACTIVE_POST,
} from '../constants/index';

export const getTimelinePostReducer = (
  state = {loading: false, error: '', post: []},
  {type, payload},
) => {
  switch (type) {
    case GET_TIMELINE_POST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_TIMELINE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        post: payload.content,
      };
    case GET_TIMELINE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        post: [],
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
      };

    default:
      return state;
  }
};
export const timelinePostReducer = (
  state = {loading: false, error: '', message: ''},
  {type, payload},
) => {
  switch (type) {
    case ARTIST_TIMELINE_POST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case ARTIST_TIMELINE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: payload.responseDescription,
      };
    case ARTIST_TIMELINE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: '',
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
        message: '',
      };

    default:
      return state;
  }
};

export const storeActivePostReducer = (state = {post: {}}, {type, payload}) => {
  switch (type) {
    case STORE_ACTIVE_POST:
      return {
        ...state,
        post: payload,
      };

    default:
      return state;
  }
};

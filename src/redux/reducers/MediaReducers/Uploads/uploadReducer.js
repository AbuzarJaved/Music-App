import {
  MEDIA_UPLOAD_FAIL,
  MEDIA_UPLOAD_LOADING,
  MEDIA_UPLOAD_SUCCESS,
  MEDIA_ART_UPLOAD_FAIL,
  MEDIA_ART_UPLOAD_LOADING,
  MEDIA_ART_UPLOAD_SUCCESS,
  TRIM_MEDIA_UPLOAD_FAIL,
  TRIM_MEDIA_UPLOAD_SUCCESS,
  TRIM_MEDIA_UPLOAD_LOADING,
  CLEAR_UPLOAD_DATA,
} from '../../../constants/index';

export const uploadMediaReducer = (
  state = {loading: false, error: '', name: '', path: '', type: ''},
  {type, payload},
) => {
  switch (type) {
    case MEDIA_UPLOAD_LOADING:
      return {
        loading: true,
      };
    case MEDIA_UPLOAD_SUCCESS:
      return {
        loading: false,
        error: '',
        name: payload.name,
        path: payload.uri,
        type: payload.type,
      };
    case MEDIA_UPLOAD_FAIL:
      return {
        loading: false,
        name: '',
        path: '',
        error: payload,
        type: '',
      };
    case CLEAR_UPLOAD_DATA:
      return {
        name: '',
        path: '',
        type: '',
      };

    default:
      return state;
  }
};

export const uploadMediaArtReducer = (
  state = {loading: false, error: '', name: '', path: '', type: ''},
  {type, payload},
) => {
  switch (type) {
    case MEDIA_ART_UPLOAD_LOADING:
      return {
        loading: true,
      };
    case MEDIA_ART_UPLOAD_SUCCESS:
      return {
        loading: false,
        name: payload.name,
        path: payload.uri,
        error: '',
        type: payload.type,
      };
    case MEDIA_ART_UPLOAD_FAIL:
      return {
        loading: false,
        name: '',
        path: '',
        error: payload,
        type: '',
      };
    case CLEAR_UPLOAD_DATA:
      return {
        name: '',
        path: '',
        type: '',
      };

    default:
      return state;
  }
};
export const uploadTrimMediaReducer = (
  state = {loading: false, error: '', name: '', path: '', type: ''},
  {type, payload},
) => {
  switch (type) {
    case TRIM_MEDIA_UPLOAD_LOADING:
      return {
        loading: true,
      };
    case TRIM_MEDIA_UPLOAD_SUCCESS:
      return {
        loading: false,
        name: payload.name,
        path: payload.uri,
        error: '',
        type: payload.type,
      };
    case TRIM_MEDIA_UPLOAD_FAIL:
      return {
        loading: false,
        name: '',
        path: '',
        error: payload,
        type: '',
      };
    case CLEAR_UPLOAD_DATA:
      return {
        name: '',
        path: '',
        type: '',
      };

    default:
      return state;
  }
};

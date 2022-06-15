 import {
  CLEAR_UPLOAD_PROGRESS,
  MEDIA_UPLOAD_TO_API_FAIL,
  MEDIA_UPLOAD_TO_API_LOADING,
  MEDIA_UPLOAD_TO_API_SUCCESS,
  UPLOAD_PROGRESS,
  CLEAR_UPLOAD_DATA,
} from '../../../constants/index';

export const mediaUploadToApiReudcer = (
  state = {loading: false, error: '', status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case MEDIA_UPLOAD_TO_API_LOADING:
      return {
        loading: true,
        error: '',
        status: null,
        message: '',
      };
    case MEDIA_UPLOAD_TO_API_SUCCESS:
      return {
        loading: false,
        status: payload.responseStatus,
        message: payload.responseDescription,
        error: '',
      };
    case MEDIA_UPLOAD_TO_API_FAIL:
      return {
        loading: false,
        status: null,
        message: '',
        error: payload,
      };
    case CLEAR_UPLOAD_DATA:
      return {
        ...state,
        status: null,
        message: '',
        error: '',
      };

    default:
      return state;
  }
};
export const uploadProgressReducer = (
  state = {progress: ''},
  {type, payload},
) => {
  switch (type) {
    case UPLOAD_PROGRESS:
      return {
        progress: payload,
      };
    case CLEAR_UPLOAD_PROGRESS:
      return {
        progress: '',
      };
    default:
      return state;
  }
};

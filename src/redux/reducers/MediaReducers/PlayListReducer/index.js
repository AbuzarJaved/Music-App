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
  GET_PLAYLIST_DETAILS_FAIL,
  GET_PLAYLIST_DETAILS_LOADING,
  GET_PLAYLIST_DETAILS_SUCCESS,
  GET_ALL_PLAYLIST_FAIL,
  GET_ALL_PLAYLIST_LOADING,
  GET_ALL_PLAYLIST_SUCCESS,
  GET_ALL_USER_PLAYLIST_FAIL,
  GET_ALL_USER_PLAYLIST_LOADING,
  GET_ALL_USER_PLAYLIST_SUCCESS,
  CLEAR_PLAYLIST_FORM,
  CLEAR_PLAYLIST_ERROR,
  OPEN_MEDIA_PLAYLIST_MODAL,
  OPEN_MEDIA_PLAYLIST_MODAL_FORM,
  CLOSE_MEDIA_PLAYLIST_MODAL,
  CLOSE_MEDIA_PLAYLIST_MODAL_FORM,
  CLEAR_ADD_MEDIA_TO_PLAYLIST,
  CLEAR_UPDATE_PLAYLIST_DETAILS,
  CREATE_PLAYLIST_FROM_MODAL_FAIL,
  CREATE_PLAYLIST_FROM_MODAL_LOADING,
  CREATE_PLAYLIST_FROM_MODAL_SUCCESS,
  CLEAR_PLAYLIST_FROM_MODAL_FORM,
  STORE_ACTIVE_PLAYLIST_DETAILS,
  CLEAR_ALL_PLAYLIST_ON_LOGOUT,
  CLEAR_ALL_USER_PLAYLIST_ON_LOGOUT,
  CLEAR_PLAYLIST_STATE,
} from '../../../constants/index';

export const createPlaylistReducer = (
  state = {loading: false, error: '', status: false, message: ''},
  {type, payload},
) => {
  switch (type) {
    case CREATE_PLAYLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case CREATE_PLAYLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };
    case CLEAR_PLAYLIST_FORM:
      return {
        ...state,
        error: '',
        status: false,
        message: '',
        loading: false,
      };
    case CLEAR_PLAYLIST_STATE:
      return {
        ...state,
        error: '',
        loading: false,
      };

    default:
      return state;
  }
};
export const createPlaylistFromModalReducer = (
  state = {loading: false, error: '', status: false, message: ''},
  {type, payload},
) => {
  switch (type) {
    case CREATE_PLAYLIST_FROM_MODAL_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case CREATE_PLAYLIST_FROM_MODAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case CREATE_PLAYLIST_FROM_MODAL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };
    case CLEAR_PLAYLIST_FROM_MODAL_FORM:
      return {
        ...state,
        error: '',
        status: false,
        message: '',
      };

    default:
      return state;
  }
};
export const updatePlaylistDetailsReducer = (
  state = {loading: false, error: '', status: false, message: ''},
  {type, payload},
) => {
  switch (type) {
    case UPDATE_PLAYLIST_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case UPDATE_PLAYLIST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case UPDATE_PLAYLIST_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.error,
        status: false,
        message: '',
      };
    case CLEAR_UPDATE_PLAYLIST_DETAILS:
      return {
        ...state,
        status: false,
        message: '',
        error: '',
      };

    default:
      return state;
  }
};
export const deletePlaylistReducer = (
  state = {loading: false, error: '', status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case DELETE_PLAYLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case DELETE_PLAYLIST_FAIL:
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
export const addMediaToPlaylistReducer = (
  state = {loading: false, error: '', status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case ADD_MEDIA_TO_PLAYLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case ADD_MEDIA_TO_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case ADD_MEDIA_TO_PLAYLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: null,
        message: '',
      };
    case CLEAR_ADD_MEDIA_TO_PLAYLIST:
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
export const deleteMediaFromPlaylistReducer = (
  state = {loading: false, error: '', status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case DELETE_MEDIA_FROM_PLAYLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case DELETE_MEDIA_FROM_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case DELETE_MEDIA_FROM_PLAYLIST_FAIL:
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
export const getPlaylistDetailsReducer = (
  state = {loading: false, error: '', data: {}},
  {type, payload},
) => {
  switch (type) {
    case GET_PLAYLIST_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: {},
      };
    case GET_PLAYLIST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload.responseBody,
      };
    case GET_PLAYLIST_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.error,
        data: {},
      };

    default:
      return state;
  }
};
export const getAllPlaylistReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_ALL_PLAYLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_ALL_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_ALL_PLAYLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    case CLEAR_PLAYLIST_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case CLEAR_ALL_PLAYLIST_ON_LOGOUT:
      return {
        ...state,
        loading: false,
        error: '',
        data: [],
      };

    default:
      return state;
  }
};
export const getAllUserPlaylistReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_ALL_USER_PLAYLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_ALL_USER_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_ALL_USER_PLAYLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    case CLEAR_ALL_USER_PLAYLIST_ON_LOGOUT:
      return {
        ...state,
        loading: false,
        error: '',
        data: [],
      };

    default:
      return state;
  }
};

export const openMediaPlaylistModalReducer = (
  state = {isMediaPlaylistModalOpen: false},
  {type},
) => {
  switch (type) {
    case OPEN_MEDIA_PLAYLIST_MODAL:
      return {
        ...state,
        isMediaPlaylistModalOpen: true,
      };

    case CLOSE_MEDIA_PLAYLIST_MODAL:
      return {
        ...state,
        isMediaPlaylistModalOpen: false,
      };

    default:
      return state;
  }
};
export const openMediaPlaylistModalFormReducer = (
  state = {isMediaPlaylistModalFormOpen: false},
  {type},
) => {
  switch (type) {
    case OPEN_MEDIA_PLAYLIST_MODAL_FORM:
      return {
        ...state,
        isMediaPlaylistModalFormOpen: true,
      };

    case CLOSE_MEDIA_PLAYLIST_MODAL_FORM:
      return {
        ...state,
        isMediaPlaylistModalFormOpen: false,
      };

    default:
      return state;
  }
};

export const storeActivePlaylistDetailsReducer = (
  state = {name: '', description: '', url: '', id: '', media: []},
  {type, payload},
) => {
  switch (type) {
    case STORE_ACTIVE_PLAYLIST_DETAILS:
      return {
        ...state,
        name: payload.name,
        description: payload.description,
        url: payload.url,
        id: payload.id,
        media: payload.media,
      };

    default:
      return state;
  }
};

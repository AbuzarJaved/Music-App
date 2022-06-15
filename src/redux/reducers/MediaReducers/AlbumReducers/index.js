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
  CLEAR_DATA,
  // CLEAR_ERR
} from '../../../constants/index';

export const createAlbumReducer = (
  state = {loading: false, error: '', status: false, message: ''},
  {type, payload},
) => {
  switch (type) {
    case CREATE_ALBUM_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case CREATE_ALBUM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case CREATE_ALBUM_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };
    case CLEAR_ALBUM_FORM:
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

export const updateAlbumDetailsReducer = (
  state = {loading: false, error: '', status: false, message: ''},
  {type, payload},
) => {
  switch (type) {
    case UPDATE_ALBUM_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case UPDATE_ALBUM_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case UPDATE_ALBUM_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.error,
        status: false,
        message: '',
      };
    case CLEAR_UPDATE_ALBUM_DETAILS:
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

export const deleteAlbumReducer = (
  state = {loading: false, error: '', status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case DELETE_ALBUM_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case DELETE_ALBUM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case DELETE_ALBUM_FAIL:
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
export const addSongToAlbumReducer = (
  state = {loading: false, error: '', status: false, message: ''},
  {type, payload},
) => {
  switch (type) {
    case ADD_SONG_TO_ALBUM_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
        status: false,
      };
    case ADD_SONG_TO_ALBUM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case ADD_SONG_TO_ALBUM_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.error,
        status: false,
        message: '',
      };
    case CLEAR_ALBUM_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
        status: false,
        message: '',
      };

    default:
      return state;
  }
};

export const getAlbumDetailsReducer = (
  state = {loading: false, error: '', data: {}},
  {type, payload},
) => {
  switch (type) {
    case GET_ALBUM_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: {},
      };
    case GET_ALBUM_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload.responseBody,
      };
    case GET_ALBUM_DETAILS_FAIL:
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

export const getAllUserAlbumReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_ALL_USER_ALBUM_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_ALL_USER_ALBUM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_ALL_USER_ALBUM_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    case CLEAR_ALL_USER_ALBUM_ON_LOGOUT:
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

export const storeActiveAlbumDetailsReducer = (
  state = {
    name: '',
    description: '',
    year: '',
    id: '',
    owner: '',
    url: '',
  },
  {type, payload},
) => {
  switch (type) {
    case STORE_ACTIVE_ALBUM_DETAILS:
      return {
        ...state,
        name: payload.name,
        description: payload.description,
        year: payload.year,
        id: payload.id,
        owner: payload.owner,
        url: payload.url,
      };

    default:
      return state;
  }
};

export const getUserLikedAlbumsReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_USER_LIKED_ALBUMS_LOADING:
      return {
        ...state,
        laoding: true,
        error: '',
      };
    case GET_USER_LIKED_ALBUMS_SUCCESS:
      return {
        ...state,
        laoding: false,
        error: '',
        data: payload,
      };
    case GET_USER_LIKED_ALBUMS_FAIL:
      return {
        ...state,
        laoding: false,
        error: payload,
        data: [],
      };
    case CLEAR_DATA:
      return {
        ...state,
        laoding: false,
        error: '',
        data: [],
      };

    default:
      return state;
  }
};

export const LikeAlbumReducer = (
  state = {loading: false, error: null, status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case LIKE_ALBUM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LIKE_ALBUM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case LIKE_ALBUM_FAIL:
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

export const UnLikeAlbumReducer = (
  state = {loading: false, error: null, status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case UN_LIKE_ALBUM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UN_LIKE_ALBUM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseMessage,
      };
    case UN_LIKE_ALBUM_FAIL:
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

export const storeUserLikedAlbumReducer = (
  state = {albumList: []},
  {type, payload},
) => {
  switch (type) {
    case STORE_USER_LIKED_ALBUM:
      return {
        ...state,
        albumList: [...payload],
      };
    case ADD_ALBUM_TO_LIKED_LIST:
      const mediaId = payload;
      let newList = [];
      newList = [...state.albumList, mediaId];
      return {
        ...state,
        albumList: newList,
      };

    case REMOVE_ALBUM_FROM_LIKED_LIST:
      const unLikeId = payload;
      let newunLikedList = [];
      if (state.albumList.includes(unLikeId)) {
        newunLikedList = state.albumList.filter(x => x !== unLikeId);
      }
      return {
        ...state,
        albumList: newunLikedList,
      };

    default:
      return state;
  }
};

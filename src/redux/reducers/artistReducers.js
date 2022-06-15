import {
  ARTIST_PROFILE_FAIL,
  ARTIST_PROFILE_REQUEST,
  ARTIST_PROFILE_SUCCESS,
  ARTIST_REGISTER_FAIL,
  ARTIST_REGISTER_REQUEST,
  ARTIST_REGISTER_SUCCESS,
  CLEAR_ARTIST_REGISTER_DATA,
  CLEAR_ARTIST_PROFILE,
  UPDATE_ARTIST_PROFILE_REQUEST,
  UPDATE_ARTIST_PROFILE_FAIL,
  UPDATE_ARTIST_PROFILE_SUCCESS,
  UPDATE_ARTIST_PROFILE_PICS_FAIL,
  UPDATE_ARTIST_PROFILE_PICS_REQUEST,
  UPDATE_ARTIST_PROFILE_PICS_SUCCESS,
  GET_ALL_ARTISTS_FAIL,
  GET_ALL_ARTISTS_LOADING,
  GET_ALL_ARTISTS_SUCCESS,
  CLEAR_UPDATE_ARTIST_PROFILE_STATE,
} from '../constants/index';

export const artistRegisterReducer = (
  state = {status: false, message: '', loading: false, error: null},
  {type, payload},
) => {
  switch (type) {
    case ARTIST_REGISTER_REQUEST:
      return {
        loading: true,
        error: '',
        message: '',
      };

    case ARTIST_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.data.status,
        message: payload.data.description,
        error: null,
      };
    case ARTIST_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,

        status: false,
        message: '',
      };
    case CLEAR_ARTIST_REGISTER_DATA:
      return {
        ...state,
        status: false,
        message: '',
        loading: false,
      };

    default:
      return state;
  }
};

export const getArtistProfileReducer = (
  state = {loading: false, error: '', artistProfile: {}},
  {type, payload},
) => {
  switch (type) {
    case ARTIST_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        artistProfile: {},
      };
    case ARTIST_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        artistProfile: payload,
        error: '',
      };
    case ARTIST_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        artistProfile: {},
        error: payload,
      };
    case CLEAR_ARTIST_PROFILE:
      return {
        ...state,
        artistProfile: {},
      };
    default:
      return state;
  }
};

export const updateArtistProfileReducer = (
  state = {
    loading: false,
    error: '',
    status: null,
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case UPDATE_ARTIST_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ARTIST_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.status,
        error: '',
        message: payload.description,
      };
    case UPDATE_ARTIST_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        status: null,
        error: payload,
        message: '',
      };
    case CLEAR_UPDATE_ARTIST_PROFILE_STATE:
      return {
        ...state,
        loading: false,
        status: null,
        error: '',
        message: '',
      };

    default:
      return state;
  }
};

export const updateArtistProfilePicsReducer = (
  state = {
    loading: false,
    error: '',
    status: null,
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case UPDATE_ARTIST_PROFILE_PICS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ARTIST_PROFILE_PICS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.status,
        error: '',
        message: payload.description,
      };
    case UPDATE_ARTIST_PROFILE_PICS_FAIL:
      return {
        ...state,
        loading: false,
        status: null,
        error: payload,
        message: '',
      };

    default:
      return state;
  }
};

export const getAllArtistsReducer = (
  state = {
    loading: false,
    error: null,
    artists: [],
    totalElements: null,
    totalPages: null,
  },
  {type, payload},
) => {
  switch (type) {
    case GET_ALL_ARTISTS_LOADING:
      return {
        loading: true,
      };
    case GET_ALL_ARTISTS_SUCCESS:
      // const oldArtist = payload.content;

      return {
        ...state,
        loading: false,
        error: null,
        artists: payload.content,
        totalElements: payload.totalElements,
        totalPages: payload.totalPages,
      };
    case GET_ALL_ARTISTS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        artists: [],
        totalElements: null,
        totalPages: null,
      };

    default:
      return state;
  }
};

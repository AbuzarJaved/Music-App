import {
  MEDIA_SEARCH_FAIL,
  MEDIA_SEARCH_LOADING,
  MEDIA_SEARCH_SUCCESS,
  ALBUM_SEARCH_FAIL,
  ALBUM_SEARCH_LOADING,
  ALBUM_SEARCH_SUCCESS,
  ARTIST_SEARCH_FAIL,
  ARTIST_SEARCH_LOADING,
  ARTIST_SEARCH_SUCCESS,
  PLAYLIST_SEARCH_FAIL,
  PLAYLIST_SEARCH_LOADING,
  PLAYLIST_SEARCH_SUCCESS,
  SEARCH_SCREEN_MEDIA_FAIL,
  SEARCH_SCREEN_MEDIA_LOADING,
  SEARCH_SCREEN_MEDIA_SUCCESS,
  GENRE_SEARCH_FAIL,
  GENRE_SEARCH_LOADING,
  GENRE_SEARCH_SUCCESS,
  STORE_USER_SEARCH_VALUE,
  DELETE_USER_SEARCH_VALUE,
} from '../../../constants/index';
import {v4 as uuidv4} from 'uuid';

export const getMediaSearchReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case MEDIA_SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case MEDIA_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case MEDIA_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};
export const getAlbumSearchReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case ALBUM_SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case ALBUM_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case ALBUM_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};
export const getArtistSearchReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case ARTIST_SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case ARTIST_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case ARTIST_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};
export const getPlaylistSearchReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case PLAYLIST_SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case PLAYLIST_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case PLAYLIST_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};
export const getGenreSearchReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GENRE_SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GENRE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GENRE_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};
export const getNewReleasesReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case SEARCH_SCREEN_MEDIA_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case SEARCH_SCREEN_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case SEARCH_SCREEN_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};

export const storeUserSearchValueReducer = (
  state = {data: []},
  {type, payload},
) => {
  switch (type) {
    case STORE_USER_SEARCH_VALUE:
      const newPayload = payload;
      const newData = {
        title: newPayload,
        id: uuidv4(),
      };
      return {
        data: [...state.data, newData],
      };

    case DELETE_USER_SEARCH_VALUE:
      const newId = payload;
      const newDatas = state.data.filter((x) => x.id !== newId);
      return {
        data: newDatas,
      };

    default:
      return state;
  }
};

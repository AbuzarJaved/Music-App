import {
  GENRE_LIST_FAIL,
  GENRE_LIST_LOADING,
  GENRE_LIST_SUCCESS,
  CUSTOMER_TYPE,
} from '../constants/index';

export const getGenreListReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GENRE_LIST_LOADING:
      return {
        loading: true,
        error: '',
        data: [],
      };

    case GENRE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: '',
      };
    case GENRE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: payload,
      };

    default:
      return state;
  }
};

export const customerTypeReducer = (state = {isArtist: false}, {type}) => {
  switch (type) {
    case CUSTOMER_TYPE:
      return {
        isArtist: true,
      };
    default:
      return state;
  }
};

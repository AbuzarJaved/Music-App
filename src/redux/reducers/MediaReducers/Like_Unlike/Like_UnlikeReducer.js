import {
  LIKE_MEDIA_FAIL,
  LIKE_MEDIA_SUCCESS,
  LIKE_MEDIA_lOADING,
  UNLIKE_MEDIA_FAIL,
  UNLIKE_MEDIA_SUCCESS,
  UNLIKE_MEDIA_lOADING,
  ADD_MEDIA_TO_LIKED_LIST,
  REMOVE_MEDIA_FROM_LIKED_LIST,
  STORE_USER_LIKED_LIST,
} from '../../../constants/index';

let initialState = {
  likedList: [],
};

export const LikeMediaReducer = (
  state = {loading: false, error: null, status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case LIKE_MEDIA_lOADING:
      return {
        ...state,
        loading: true,
      };
    case LIKE_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case LIKE_MEDIA_FAIL:
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

export const UnLikeMediaReducer = (
  state = {loading: false, error: null, status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case UNLIKE_MEDIA_lOADING:
      return {
        ...state,
        loading: true,
      };
    case UNLIKE_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseMessage,
      };
    case UNLIKE_MEDIA_FAIL:
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

export const storeUserLikedListReducer = (
  state = initialState,
  {type, payload},
) => {
  switch (type) {
    case STORE_USER_LIKED_LIST:
      return {
        ...state,
        likedList: [...payload],
      };
    case ADD_MEDIA_TO_LIKED_LIST:
      const mediaId = payload;
      let newList = [];
      newList = [...state.likedList, mediaId];
      return {
        ...state,
        likedList: newList,
      };

    case REMOVE_MEDIA_FROM_LIKED_LIST:
      const unLikeId = payload;
      let newunLikedList = [];
      if (state.likedList.includes(unLikeId)) {
        newunLikedList = state.likedList.filter(x => x !== unLikeId);
      }
      return {
        ...state,
        likedList: newunLikedList,
      };

    default:
      return state;
  }
};

export const userMediaLikedListReducer = (
  state = initialState,
  {type, payload},
) => {
  switch (type) {
    case ADD_MEDIA_TO_LIKED_LIST:
      const id = payload;
      let newList = [];
      newList = [...state.likedList, id];
      return {
        ...state,
        likedList: newList,
      };

    case REMOVE_MEDIA_FROM_LIKED_LIST:
      const unLikeId = payload;
      let newunLikedList = [];
      if (state.likedList.includes(unLikeId)) {
        newunLikedList = state.likedList.filter(x => x !== unLikeId);
      }
      return {
        ...state,
        likedList: newunLikedList,
      };

    default:
      return state;
  }
};

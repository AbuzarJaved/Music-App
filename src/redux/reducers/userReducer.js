import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  CLEAR_REGISTER_DATA,
  GET_ACCESS_TOKEN,
  GET_ACCESS_TOKEN_FAIL,
  GET_ACCESS_TOKEN_LOADING,
  CLEAR_ACCESS_TOKEN,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  CLEAR_USER_PROFILE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_PICS_REQUEST,
  UPDATE_USER_PROFILE_PICS_SUCCESS,
  UPDATE_USER_PROFILE_PICS_FAIL,
  FOLLOW_ARTIST_FAIL,
  FOLLOW_ARTIST_LOADING,
  FOLLOW_ARTIST_SUCCESS,
  UNFOLLOW_ARTIST_FAIL,
  UNFOLLOW_ARTIST_LOADING,
  UNFOLLOW_ARTIST_SUCCESS,
  CLEAR_USER_LOGIN_ERROR,
  CLEAR_REGISTER_ERROR,
  STORE_USER_REGISTER_DATA,
  USER_PROFILE_WITH_ID_FAIL,
  USER_PROFILE_WITH_ID_REQUEST,
  USER_PROFILE_WITH_ID_SUCCESS,
  CLEAR_UPDATE_USER_PROFILE_STATE,
  CLEAR_UPDATE_USER_PROFILE_PICS_STATE,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_SUCCESS,
  STORE_USER_LOCATION,
  LOGOUT_USER_WHEN_TOKEN_EXPIRES,
  CLEAR_LOGOUT_TOKEN_MESSAGE,
  STORE_USER_COORDINATES,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_FAIL,
  UPDATE_USER_PASSWORD_SUCCESS,
  CLEAR_UPDATE_USER_PASSWORD_STATE,
  UPDATE_USER_USERNAME_FAIL,
  UPDATE_USER_USERNAME_REQUEST,
  UPDATE_USER_USERNAME_SUCCESS,
  CLEAR_UPDATE_USER_USERNAME_STATE,
  UPGRADE_USER_ACCOUNT_FAIL,
  UPGRADE_USER_ACCOUNT_REQUEST,
  UPGRADE_USER_ACCOUNT_SUCCESS,
  CLEAR_UPGRADE_USER_ACCOUNT_STATE,
  STORE_ACTIVE_USER_DETAILS,
  OPEN_SINGLE_USER_PROFILE_MODAL,
  CLOSE_SINGLE_USER_PROFILE_MODAL,
  ADD_USER_TO_FOLLOWED_LIST,
  REMOVE_USER_FROM_FOLLOWED_LIST,
  LOCATION_PERMISSION_GRANTED,
  GET_USER_ACTIVITIES_FAIL,
  GET_USER_ACTIVITIES_LOADING,
  GET_USER_ACTIVITIES_SUCCESS,
  SHOW_NOT_ACTIVE_ACCOUNT_MODAL,
  HIDE_NOT_ACTIVE_ACCOUNT_MODAL,
  CLOSE_MODAL,
  GET_USER_NOTIFICATIONS_FAIL,
  GET_USER_NOTIFICATIONS_LOADING,
  GET_USER_NOTIFICATIONS_SUCCESS,
  GET_USER_FOLLOWER_LIST_FAIL,
  GET_USER_FOLLOWER_LIST_LOADING,
  GET_USER_FOLLOWER_LIST_SUCCESS,
  STORE_USER_FOLLOWER_LIST,
  CLEAR_DATA,
} from '../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {State} from 'react-native-gesture-handler';

const initialState = {
  token: '',
  loading: false,
  error: null,
  isLoggedIn: false,
  type: '',
};
const profileState = {
  loading: false,
  error: '',
  userProfile: {},
};

export const userLoginReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        token: '',
        loading: true,
        error: null,
        type: '',
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        type: payload.accessType,
        token: payload.accessToken,
        isLoggedIn: true,
        error: null,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        token: '',
        type: '',
      };
    case USER_LOGIN_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        isLoggedIn: true,
        token: '',
        type: '',
      };
    case CLEAR_USER_LOGIN_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};

export const notActiveAccountReducer = (
  state = {showModal: false},
  {type, payload},
) => {
  switch (type) {
    case SHOW_NOT_ACTIVE_ACCOUNT_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case HIDE_NOT_ACTIVE_ACCOUNT_MODAL:
      return {
        ...state,
        showModal: false,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
      };

    default:
      return state;
  }
};
export const userRegisterReducer = (
  state = {status: false, message: '', loading: false, error: null},
  {type, payload},
) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.responseStatus,
        message: payload.responseDescription,
        error: null,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,

        status: false,
        message: '',
      };
    case CLEAR_REGISTER_DATA:
      return {
        ...state,
        status: false,
        message: '',
        loading: false,
      };
    case CLEAR_REGISTER_ERROR:
      return {
        ...state,
        error: null,
        message: '',
      };

    default:
      return state;
  }
};
export const storeUserRegisterDataReducer = (
  state = {userEmail: '', userPassword: '', userPhoneNumber: ''},
  {type, payload},
) => {
  switch (type) {
    case STORE_USER_REGISTER_DATA:
      return {
        ...state,
        userEmail: payload.email,
        userPassword: payload.password,
        userPhoneNumber: payload.userPhoneNumber,
      };
    default:
      return state;
  }
};

export const getAccessTokenReducer = (
  state = {accessToken: '', error: '', loading: false, userType: ''},
  {type, payload},
) => {
  switch (type) {
    case GET_ACCESS_TOKEN_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        accessToken: '',
      };
    case GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload.accessToken,
        error: '',
        loading: false,
        userType: payload.accessType,
      };
    case GET_ACCESS_TOKEN_FAIL:
      return {
        ...state,
        error: payload,
        accessToken: '',
        loading: false,
        userType: '',
      };
    case CLEAR_ACCESS_TOKEN:
      return {
        ...state,
        error: '',
        accessToken: '',
        loading: false,
        userType: '',
      };

    default:
      return state;
  }
};
export const getUserProfileReducer = (
  state = {
    loading: false,
    error: '',
    userProfile: {},
    profile: {},
    genres: [],
  },
  {type, payload},
) => {
  switch (type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: payload.responseBody,
        error: '',
        profile: payload.responseBody.profile,
        genres: payload.responseBody.genres,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        userProfile: {},
        error: payload,
        profile: {},
        genres: [],
      };
    case CLEAR_USER_PROFILE:
      return {
        ...state,
        userProfile: {},
        profile: {},
        genres: [],
      };

    default:
      return state;
  }
};

export const getUserProfileWithIdReducer = (
  state = {
    loading: false,
    error: '',
    userProfile: {},
    profile: {},
    genres: [],
  },
  {type, payload},
) => {
  switch (type) {
    case USER_PROFILE_WITH_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case USER_PROFILE_WITH_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: payload.responseBody.userProfile,
        error: '',
        profile: payload.responseBody.profile,
        genres: payload.responseBody.genres,
      };
    case USER_PROFILE_WITH_ID_FAIL:
      return {
        ...state,
        loading: false,
        userProfile: {},
        error: payload,
        profile: {},
        genres: [],
      };

    default:
      return state;
  }
};
export const updateUserProfileReducer = (
  state = {
    loading: false,
    error: '',
    status: false,
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        status: false,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.responseStatus,
        error: '',
        message: payload.responseDescription,
      };
    case UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload,
        message: '',
      };
    case CLEAR_UPDATE_USER_PROFILE_STATE:
      return {
        ...state,
        loading: false,
        status: false,
        error: '',
        message: '',
      };

    default:
      return state;
  }
};
export const updateUserUsernameReducer = (
  state = {
    loading: false,
    error: '',
    status: false,
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case UPDATE_USER_USERNAME_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        status: false,
      };
    case UPDATE_USER_USERNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.responseStatus,
        error: '',
        message: payload.responseDescription,
      };
    case UPDATE_USER_USERNAME_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload,
        message: '',
      };
    case CLEAR_UPDATE_USER_USERNAME_STATE:
      return {
        ...state,
        loading: false,
        status: false,
        error: '',
        message: '',
      };

    default:
      return state;
  }
};
export const updateUserPasswordReducer = (
  state = {
    loading: false,
    error: '',
    status: false,
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case UPDATE_USER_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        status: false,
      };
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.responseStatus,
        error: '',
        message: payload.responseDescription,
      };
    case UPDATE_USER_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload,
        message: '',
      };
    case CLEAR_UPDATE_USER_PASSWORD_STATE:
      return {
        ...state,
        loading: false,
        status: false,
        error: '',
        message: '',
      };

    default:
      return state;
  }
};
export const upgradeUserAccountReducer = (
  state = {
    loading: false,
    error: '',
    status: false,
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case UPGRADE_USER_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        status: false,
        message: '',
      };
    case UPGRADE_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.responseStatus,
        error: '',
        message: payload.responseDescription,
      };
    case UPGRADE_USER_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload,
        message: '',
      };
    case CLEAR_UPGRADE_USER_ACCOUNT_STATE:
      return {
        ...state,
        loading: false,
        status: false,
        error: '',
        message: '',
      };

    default:
      return state;
  }
};
export const updateUserProfilePicsReducer = (
  state = {
    loading: false,
    error: '',
    status: false,
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case UPDATE_USER_PROFILE_PICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        status: false,
      };
    case UPDATE_USER_PROFILE_PICS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.responseStatus,
        error: '',
        message: payload.responseDescription,
      };
    case UPDATE_USER_PROFILE_PICS_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload,
        message: '',
      };
    case CLEAR_UPDATE_USER_PROFILE_PICS_STATE:
      return {
        ...state,
        loading: false,
        status: false,
        error: '',
        message: '',
      };

    default:
      return state;
  }
};

export const getAllUsersReducer = (
  state = {
    loading: false,
    error: '',
    data: [],
  },
  {type, payload},
) => {
  switch (type) {
    case GET_ALL_USERS_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_ALL_USERS_FAIL:
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
export const getAllUsersActivitiesReducer = (
  state = {
    loading: false,
    error: '',
    data: [],
  },
  {type, payload},
) => {
  switch (type) {
    case GET_USER_ACTIVITIES_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        // data: [],
      };
    case GET_USER_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_USER_ACTIVITIES_FAIL:
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
export const getAllUsersNotificationsReducer = (
  state = {
    loading: false,
    error: '',
    data: [],
  },
  {type, payload},
) => {
  switch (type) {
    case GET_USER_NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_USER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_USER_NOTIFICATIONS_FAIL:
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

export const logoutUserWhenTokenExpiresReducer = (
  state = {
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case LOGOUT_USER_WHEN_TOKEN_EXPIRES:
      return {
        message: payload,
      };

    case CLEAR_LOGOUT_TOKEN_MESSAGE:
      return {
        message: '',
      };

    default:
      return state;
  }
};

export const followArtistReducer = (
  state = {
    loading: false,
    error: '',
    status: null,
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case FOLLOW_ARTIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FOLLOW_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.responseStatus,
        error: '',
        message: payload.responseDescription,
      };
    case FOLLOW_ARTIST_FAIL:
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

export const storeUserLocationReducer = (
  state = {city: '', state: '', country: '', countryCode: '', callingCode: ''},
  {type, payload},
) => {
  switch (type) {
    case STORE_USER_LOCATION:
      return {
        city: payload.city,
        state: payload.state,
        country: payload.country,
        countryCode: payload.countryCode,
        callingCode: payload.callingCode,
      };

    default:
      return state;
  }
};
export const storeUserCoordinatesReducer = (
  state = {lat: '', lng: ''},
  {type, payload},
) => {
  switch (type) {
    case STORE_USER_COORDINATES:
      return {
        lat: payload.lat,
        lng: payload.lng,
      };

    default:
      return state;
  }
};

export const unFollowArtistReducer = (
  state = {
    loading: false,
    error: '',
    status: null,
    message: '',
  },
  {type, payload},
) => {
  switch (type) {
    case UNFOLLOW_ARTIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UNFOLLOW_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: payload.responseStatus,
        error: '',
        message: payload.responseDescription,
      };
    case UNFOLLOW_ARTIST_FAIL:
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

export const storeActiveUserDetailsReducer = (
  state = {
    userProfile: {},
  },
  {type, payload},
) => {
  switch (type) {
    case STORE_ACTIVE_USER_DETAILS:
      return {
        ...state,
        userProfile: payload,
      };

    default:
      return state;
  }
};

export const singleUserModalReducer = (
  state = {
    isModalOpen: false,
  },
  {type, payload},
) => {
  switch (type) {
    case OPEN_SINGLE_USER_PROFILE_MODAL:
      return {
        isModalOpen: true,
      };
    case CLOSE_SINGLE_USER_PROFILE_MODAL:
      return {
        isModalOpen: false,
      };

    default:
      return state;
  }
};

export const getUserFollowerListReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_USER_FOLLOWER_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_USER_FOLLOWER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_USER_FOLLOWER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    case CLEAR_DATA:
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

export const storeUserFollowerListReducer = (
  state = {followerList: []},
  {type, payload},
) => {
  switch (type) {
    case STORE_USER_FOLLOWER_LIST:
      return {
        ...state,
        followerList: [...payload],
      };
    case ADD_USER_TO_FOLLOWED_LIST:
      const id = payload;
      let newList = [];
      newList = [...state.followerList, id];
      return {
        ...state,
        followerList: newList,
      };

    case REMOVE_USER_FROM_FOLLOWED_LIST:
      const unLikeId = payload;
      let newunLikedList = [];
      if (state.followerList.includes(unLikeId)) {
        newunLikedList = state.followerList.filter(x => x !== unLikeId);
      }
      return {
        ...state,
        followerList: newunLikedList,
      };
    case CLEAR_DATA:
      return {
        ...state,
        followerList: [],
      };

    default:
      return state;
  }
};

export const userFollowerListReducer = (
  state = {followerList: [], status: false},
  {type, payload},
) => {
  switch (type) {
    case ADD_USER_TO_FOLLOWED_LIST:
      const id = payload;
      let newList = [];
      newList = [...state.followerList, id];
      return {
        ...state,
        followerList: newList,
        status: true,
      };

    case REMOVE_USER_FROM_FOLLOWED_LIST:
      const unLikeId = payload;
      let newunLikedList = [];
      if (state.followerList.includes(unLikeId)) {
        newunLikedList = state.followerList.filter(x => x !== unLikeId);
      }
      return {
        ...state,
        followerList: newunLikedList,
        status: false,
      };
    case CLEAR_DATA:
      return {
        ...state,
        followerList: [],
      };

    default:
      return state;
  }
};

export const grantLocationPermissionReducer = (
  state = {
    isGranted: false,
  },
  {type},
) => {
  switch (type) {
    case LOCATION_PERMISSION_GRANTED:
      return {
        ...state,
        isGranted: true,
      };

    default:
      return state;
  }
};

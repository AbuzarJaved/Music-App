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
  CLEAR_ARTIST_PROFILE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  FOLLOW_ARTIST_FAIL,
  FOLLOW_ARTIST_LOADING,
  FOLLOW_ARTIST_SUCCESS,
  UNFOLLOW_ARTIST_FAIL,
  UNFOLLOW_ARTIST_LOADING,
  UNFOLLOW_ARTIST_SUCCESS,
  STORE_USER_REGISTER_DATA,
  USER_PROFILE_WITH_ID_FAIL,
  USER_PROFILE_WITH_ID_REQUEST,
  USER_PROFILE_WITH_ID_SUCCESS,
  UPDATE_USER_PROFILE_PICS_FAIL,
  UPDATE_USER_PROFILE_PICS_SUCCESS,
  UPDATE_USER_PROFILE_PICS_REQUEST,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_SUCCESS,
  STORE_USER_LOCATION,
  CLEAR_ALL_PLAYLIST_ON_LOGOUT,
  CLEAR_ALL_USER_PLAYLIST_ON_LOGOUT,
  CLEAR_ALL_USER_ALBUM_ON_LOGOUT,
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
  GET_USER_ACTIVITIES_FAIL,
  GET_USER_ACTIVITIES_LOADING,
  GET_USER_ACTIVITIES_SUCCESS,
  GET_USER_NOTIFICATIONS_FAIL,
  GET_USER_NOTIFICATIONS_LOADING,
  GET_USER_NOTIFICATIONS_SUCCESS,
  GET_USER_FOLLOWER_LIST_FAIL,
  GET_USER_FOLLOWER_LIST_LOADING,
  GET_USER_FOLLOWER_LIST_SUCCESS,
  CLEAR_DATA,
} from '../constants/index';
import axios from 'axios';
import {Platform} from 'react-native';
import {
  saveDataToStorage,
  removeDataFromStorage,
  loadDataFromStorage,
  clearDataFromStorage,
} from '../../utils/asyncStorage';
import {BASE_URL, BASE_URL2, ADMIN_USERNAME, ADMIN_PASSWORD} from '@env';
import axiosInstance from '../../utils/axiosInstance';
import base64 from 'react-native-base64';
import RNFetchBlob from 'rn-fetch-blob';
import {logoutUserWhenTokenExpires} from '../../utils/loggedInUserType';

axios.defaults.timeout = 60000;
axios.defaults.timeoutErrorMessage =
  'Could not connect to server.Poor network connection';
export const login =
  (username, password, city, country, latitude, longitude) =>
  async dispatch => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      // const token = base64.encode(`${emailAddress}:${password}`);
      // console.log(emailAddress,password,'userLogin');

      // const config = {
      //   method: 'post',
      //   url: `${BASE_URL}/login`,
      //   // timeout: 5000,
      //   headers: {
      //     // Authorization: `Basic ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      //   data: {city, country, latitude, longitude},
      // };

      const lastKnownLocation = { city,country,latitude,longitude,}
      const data = await axios.post(
        `${BASE_URL}/login`,
        {
          password: password,
          emailAddress: username,
          lastKnownLocation,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.data.responseBody,
      });
      saveDataToStorage('user_token', data.data.responseBody.accessToken);
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.responseDescription
            ? error.response.data.responseDescription
            : error.message,
      });
    }
  };

export const logout = () => dispatch => {
  removeDataFromStorage('user_token');
  removeDataFromStorage('user_Info');
  removeDataFromStorage('userPlaylists');
  removeDataFromStorage('userAlbums');
  // clearDataFromStorage();
  // removeDataFromStorage('token');
  dispatch({
    type: USER_LOGIN_LOGOUT,
  });
  dispatch({
    type: CLEAR_USER_PROFILE,
  });
  dispatch({
    type: CLEAR_ARTIST_PROFILE,
  });
  dispatch({
    type: CLEAR_ALL_PLAYLIST_ON_LOGOUT,
  });
  dispatch({
    type: CLEAR_ALL_USER_PLAYLIST_ON_LOGOUT,
  });
  dispatch({type: CLEAR_ALL_USER_ALBUM_ON_LOGOUT});
  dispatch({type: CLEAR_DATA});
};

export const register =
  (
    firstName,
    lastName,
    emailAddress,
    mobileNumber,
    username,
    password,
    website,
    state,
    countryCode,
    dateOfBirth,
    accessTokens,
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const userDetails = {
        email: emailAddress,
        password,
        userPhoneNumber: mobileNumber,
      };

      // const {
      //   getAccessToken: {accessToken},
      // } = getState();
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // };
     
      const {data} = await axios.post(
        `${BASE_URL}/signUp`,
        {
          firstName,
          lastName,
          emailAddress,
          mobileNumber,
          username,
          password,
          website,
          state,
          countryCode,
          dateOfBirth,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${accessTokens}`,
          },
        },
      );
      // console.log(data, 'user success DATA');
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch(store_User_Register_Data(userDetails));
    } catch (error) {
      // console.log(error, 'ERROR');
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.responseDescription
            ? error.response.data.responseDescription
            : error.message,
      });
    }
  };

export const store_User_Register_Data = data => {
  return {
    type: STORE_USER_REGISTER_DATA,
    payload: data,
  };
};

export const clearData = () => dispatch => {
  // console.log('DATA CLEARED', ADMIN_PASSWORD);
  dispatch({
    type: CLEAR_REGISTER_DATA,
  });
};
export const clearAccessToken = () => dispatch => {
  // console.log('ACCESS TOKEN  CLEARED', ADMIN_PASSWORD);
  dispatch({
    type: CLEAR_ACCESS_TOKEN,
  });
};

export const get_Access_Token = () => async dispatch => {
  try {
    dispatch({
      type: GET_ACCESS_TOKEN_LOADING,
    });

    const username = ADMIN_USERNAME;
    const password = ADMIN_PASSWORD;
    const authentication = `Basic (${username} : ${password})`;
    const token = base64.encode(`${username}:${password}`);
    const config = {
      headers: {
        Authorization: authentication,
        'Content-Type': 'application/json',
      },
    };

    const data = await axios.post(`${BASE_URL2}/login`, null, {
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(data.data.responseBody);
    dispatch({
      type: GET_ACCESS_TOKEN,
      payload: data.data.responseBody,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: GET_ACCESS_TOKEN_FAIL,
      payload:
        error.response && error.response.data.responseDescription
          ? error.response.data.responseDescription
          : error.message,
    });
    // dispatch(logout());
  }
};

// GET USER PROFILE
export const get_User_Profile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    // const {
    //   userLogin: {token},
    // } = getState();
    const token = getState().userLogin.token;

    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.get(`${BASE_URL2}/accountuser`, config);
    console.log('USER PROFILE DATA', data);
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
    saveDataToStorage('user_Info', data.responseBody);
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.responseDescription
          ? error.response.data.responseDescription
          : error.message,
    });
  }
};

export const get_User_Activities =
  (page, size) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_USER_ACTIVITIES_LOADING,
      });

      const token = getState().userLogin.token;

      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
        params: {
          page,
          size,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/activities`, config);
      dispatch({
        type: GET_USER_ACTIVITIES_SUCCESS,
        payload: data.content,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_USER_ACTIVITIES_FAIL);
    }
  };
export const get_User_Notifications =
  (page = 0, size = 100) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_USER_NOTIFICATIONS_LOADING,
      });

      const token = getState().userLogin.token;

      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
        params: {
          page,
          size,
        },
      };

      const {data} = await axios.get(
        `${BASE_URL2}/activity/notifications`,
        config,
      );
      console.log(data, 'NOTIFICATIONS');
      dispatch({
        type: GET_USER_NOTIFICATIONS_SUCCESS,
        payload: data.responseBody.content,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_USER_NOTIFICATIONS_FAIL);
    }
  };

export const get_User_Profile_With_Id = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_WITH_ID_REQUEST,
    });

    // const {
    //   userLogin: {token},
    // } = getState();
    const token = getState().userLogin.token;

    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.get(`${BASE_URL2}/accountuser/${id}`, config);
    console.log('USER PROFILE DATA', data);
    dispatch({
      type: USER_PROFILE_WITH_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, USER_PROFILE_WITH_ID_FAIL);
    // dispatch({
    //   type: USER_PROFILE_WITH_ID_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const update_User_Profile =
  (firstName, lastName, website, state, countryCode) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_USER_PROFILE_REQUEST,
      });

      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;

      const config = {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
      };
      const data = {
        firstName,
        lastName,
        website,
        state,
        countryCode,
      };

      const res = await axios.put(`${BASE_URL2}/accountuser`, data, config);
      console.log(res, 'PROFILE RES');
      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: res.data,
      });
      dispatch(get_User_Profile());
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, UPDATE_USER_PROFILE_FAIL);
      // dispatch({
      //   type: UPDATE_USER_PROFILE_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const update_User_Username_Profile =
  username => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_USER_USERNAME_REQUEST,
      });

      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;

      const config = {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
      };
      const data = {
        username,
      };

      const res = await axios.put(`${BASE_URL2}/accountuser`, data, config);
      dispatch({
        type: UPDATE_USER_USERNAME_SUCCESS,
        payload: res.data,
      });
      dispatch(get_User_Profile());
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, UPDATE_USER_USERNAME_FAIL);
      // dispatch({
      //   type: UPDATE_USER_USERNAME_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };
export const update_User_Password_Profile =
  (credential, confirmCredential) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_USER_PASSWORD_REQUEST,
      });

      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;

      const config = {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
      };
      const data = {
        credential,
        confirmCredential,
      };

      const res = await axios.put(`${BASE_URL2}/password`, data, config);
      console.log(res, 'PROFILE RES');
      dispatch({
        type: UPDATE_USER_PASSWORD_SUCCESS,
        payload: res.data,
      });
      dispatch(get_User_Profile());
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, UPDATE_USER_PASSWORD_FAIL);
      // dispatch({
      //   type: UPDATE_USER_PASSWORD_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };
export const upgrade_User_Account = userType => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPGRADE_USER_ACCOUNT_REQUEST,
    });

    const token = getState().userLogin.token;
    const id = getState().getUserProfile.userProfile.id;
    const authorization = `Bearer ${token}`;

    const config = {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
      params: {
        userType,
      },
    };

    const res = await axios.get(
      `${BASE_URL2}/accountuser/${id}/upgrade`,
      config,
    );
    dispatch({
      type: UPGRADE_USER_ACCOUNT_SUCCESS,
      payload: res.data,
    });
    // dispatch(logout());
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, UPGRADE_USER_ACCOUNT_FAIL);
    // dispatch({
    //   type: UPGRADE_USER_ACCOUNT_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const update_User_Profile_Pics =
  (photo, profilePicType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_USER_PROFILE_PICS_REQUEST,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      let data = new FormData();
      data.append('photo', {
        uri: Platform.OS === 'android' ? `file://${photo}` : photo,

        type: profilePicType,
        name: 'photo',
      });

      const config = {
        method: 'put',
        url: `${BASE_URL2}/accountuser/photo`,
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      // const {res} = await axios.put(
      //   `${BASE_URL2}/accountuser/photo`,
      //   data,
      //   config,
      // );
      // const {res} = await axios(config);

      await axios(config)
        .then(res => {
          dispatch({
            type: UPDATE_USER_PROFILE_PICS_SUCCESS,
            payload: res.data,
          });
          dispatch(get_User_Profile());
        })
        .catch(error => {
          logoutUserWhenTokenExpires(
            dispatch,
            error,
            UPDATE_USER_PROFILE_PICS_FAIL,
          );
          // dispatch({
          //   type: UPDATE_USER_PROFILE_PICS_FAIL,
          //   payload:
          //     error.response && error.response.data.responseDescription
          //       ? error.response.data.responseDescription
          //       : error.message,
          // });
        });

      // dispatch({
      //   type: UPDATE_USER_PROFILE_PICS_SUCCESS,
      //   payload: res.data,
      // });
    } catch (error) {
      logoutUserWhenTokenExpires(
        dispatch,
        error,
        UPDATE_USER_PROFILE_PICS_FAIL,
      );
      // dispatch({
      //   type: UPDATE_USER_PROFILE_PICS_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const get_All_Users = (page, size) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_USERS_LOADING,
    });

    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;

    const config = {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
      params: {
        page,
        size,
      },
    };

    const {res} = await axios.get(`${BASE_URL2}/accountusers`, config);

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: res.responseBody.content,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, GET_ALL_USERS_FAIL);
    // dispatch({
    //   type: GET_ALL_USERS_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const follow_Artist =
  (id, state = true) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: FOLLOW_ARTIST_LOADING,
      });
      const token = getState().userLogin.token;

      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
        params: {
          state,
          id,
        },
      };

      const res = await axios.get(`${BASE_URL2}/accountuser/follow`, config);
      console.log(res.data, 'FOLLOW SUCCESSFUL');
      dispatch({
        type: FOLLOW_ARTIST_SUCCESS,
        payload: res,
      });
      if (res) {
        dispatch(get_User_Follower_List());
      }
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, FOLLOW_ARTIST_FAIL);
      // dispatch({
      //   type: FOLLOW_ARTIST_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };
export const unFollow_Artist =
  (id, state = false) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UNFOLLOW_ARTIST_LOADING,
      });
      const token = getState().userLogin.token;

      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
        params: {
          state,
          id,
        },
      };

      const res = await axios.get(`${BASE_URL2}/accountuser/follow`, config);
      // console.log(res.data, 'UNFOLLOW SUCCESSFUL');

      dispatch({
        type: UNFOLLOW_ARTIST_SUCCESS,
        payload: res,
      });
      if (res) {
        dispatch(get_User_Follower_List());
      }
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, UNFOLLOW_ARTIST_FAIL);
      // dispatch({
      //   type: UNFOLLOW_ARTIST_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const get_User_Follower_List =
  (page = 0, size = 200) =>
  async (dispatch, getState) => {
    try {
      dispatch({type: GET_USER_FOLLOWER_LIST_LOADING});

      const token = getState().userLogin.token;

      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
        params: {
          page,
          size,
        },
      };

      const {data} = await axios.get(
        `${BASE_URL2}/accountuser/followers`,
        config,
      );
      console.log(data, 'USER FOLLOWERS DATA');

      dispatch({
        type: GET_USER_FOLLOWER_LIST_SUCCESS,
        payload: data.responseBody,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_USER_FOLLOWER_LIST_FAIL);
    }
  };

export const store_User_Location = data => {
  return {
    type: STORE_USER_LOCATION,
    payload: data,
  };
};
export const store_User_Coordinates = data => {
  return {
    type: STORE_USER_COORDINATES,
    payload: data,
  };
};
export const store_Active_User_Details = data => {
  return {
    type: STORE_ACTIVE_USER_DETAILS,
    payload: data,
  };
};
export const openSingleUserModal = () => {
  return {
    type: OPEN_SINGLE_USER_PROFILE_MODAL,
  };
};
export const closeSingleUserModal = () => {
  return {
    type: CLOSE_SINGLE_USER_PROFILE_MODAL,
  };
};

export const addToFollowersList = id => {
  return {
    type: ADD_USER_TO_FOLLOWED_LIST,
    payload: id,
  };
};
export const removeFromFollowersList = id => {
  return {
    type: REMOVE_USER_FROM_FOLLOWED_LIST,
    payload: id,
  };
};

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
} from '../../../constants/index';
import {BASE_URL2} from '@env';
import axios from 'axios';
import {logoutUserWhenTokenExpires} from '../../../../utils/loggedInUserType';

axios.defaults.timeout = 20000;
axios.defaults.timeoutErrorMessage =
  'Could not connect to server.Poor network connection';
export const get_Media_Search =
  (title, page = 0, size = 10) =>
  async (dispatch, getState) => {
    try {
      dispatch({type: MEDIA_SEARCH_LOADING});
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
      };

      const res = await axios.post(
        `${BASE_URL2}/media/search`,
        {
          title,
          sortByDate: false,
          page,
          size,
        },
        config,
      );

      dispatch({
        type: MEDIA_SEARCH_SUCCESS,
        payload: res.data.responseBody.content,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, MEDIA_SEARCH_FAIL);
      // dispatch({
      //   type:MEDIA_SEARCH_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //         ? error.response.data.responseDescription
      //         : error.message,
      // })
    }
  };
export const get_New_Releases =
  (page = 0, size = 10) =>
  async (dispatch, getState) => {
    try {
      dispatch({type: SEARCH_SCREEN_MEDIA_LOADING});
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
      };

      const res = await axios.post(
        `${BASE_URL2}/media/search`,
        {sortByDate: true, page, size},
        config,
      );

      dispatch({
        type: SEARCH_SCREEN_MEDIA_SUCCESS,
        payload: res.data.responseBody.content,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, SEARCH_SCREEN_MEDIA_FAIL);
      //   dispatch({
      //   type:SEARCH_SCREEN_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //         ? error.response.data.responseDescription
      //         : error.message,
      // })
    }
  };

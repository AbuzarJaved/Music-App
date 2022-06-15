import {
  GENRE_LIST_FAIL,
  GENRE_LIST_LOADING,
  GENRE_LIST_SUCCESS,
  CUSTOMER_TYPE
} from '../constants/index';
import {BASE_URL2} from '@env';

import axios from 'axios';
import {saveDataToStorage} from '../../utils/asyncStorage';
import {logoutUserWhenTokenExpires} from '../../utils/loggedInUserType'

export const getGenres = (page,size) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GENRE_LIST_LOADING,
    });
    // const accessToken = getState().getAccessToken.accessToken;
    const accessToken = getState().userLogin.token;
    
    const authorization = `Bearer ${accessToken}`;
    const config = {
      headers: {
        Authorization: authorization,
      },
      params: {
        page,
        size
      },
    };
    const {data} = await axios.get(`${BASE_URL2}/genres`, config);

    dispatch({
      type: GENRE_LIST_SUCCESS,
      payload: data.responseBody.content,
    });
    saveDataToStorage('genreList', data.responseBody.content);
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, GENRE_LIST_FAIL);
    // dispatch({
    //   type: GENRE_LIST_FAIL,
    //   payload:
    //     error.response && error.response.data.description
    //       ? error.response.data.description
    //       : error.message,
    // });
  }
};

export const setCustomerType = () =>  {
return{
  type:CUSTOMER_TYPE
}
}
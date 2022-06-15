import {
  MEDIA_UPLOAD_TO_API_FAIL,
  MEDIA_UPLOAD_TO_API_LOADING,
  MEDIA_UPLOAD_TO_API_SUCCESS,
  UPLOAD_PROGRESS,
  CLEAR_UPLOAD_PROGRESS,
  CLEAR_UPLOAD_DATA,
} from '../../../constants/index';
import qs from 'qs';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import axiosInstance from '../../../../utils/axiosInstance';
import {BASE_URL2} from '@env';
import FormData from 'form-data';
import {Platform} from 'react-native';
import {logoutUserWhenTokenExpires} from '../../../../utils/loggedInUserType';


axios.defaults.timeout = 20000;
axios.defaults.timeoutErrorMessage =
  'Could not connect to server.Poor network connection';
export const upload_Media =
  (
    mediaFile,
    trailerFile,
    photoFile,
    mediaName,
    mediaTrimName,
    mediaArtName,
    mediaType,
    mediaTrimType,
    mediaArtType,
    title,
    description,
    genreId,
    featuredArtists,
    albumId,
  ) =>
  async (dispatch, getState) => {
    console.log(albumId, 'EMPTY ALBUM');
    if (albumId === '' || albumId === undefined) {
      try {
        dispatch({
          type: MEDIA_UPLOAD_TO_API_LOADING,
        });

        const token = getState().userLogin.token;
        const authorization = `Bearer ${token}`;
        console.log(albumId, 'EMPTY ALBUM LOADING');

        let res = await RNFetchBlob.fetch(
          'POST',
          `${BASE_URL2}/media?genreId=${genreId}&title=${title}&description=${description}&featuredArtists=${featuredArtists}`,
          {
            Authorization: authorization,
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'mediaFile',
              filename: mediaName,
              data: RNFetchBlob.wrap(mediaFile),
              type: mediaType,
            },
            {
              name: 'trailerFile',
              filename: mediaTrimName,
              data: RNFetchBlob.wrap(trailerFile),
              type: mediaTrimType,
            },
            {
              name: 'photoFile',
              filename: mediaArtName,
              data: RNFetchBlob.wrap(photoFile),
              type: mediaArtType,
            },
          ],
        ).uploadProgress((written, total) => {
          console.log('uploaded', (written / total) * 100);
          const progress = (written / total).toFixed(2) * 100;
          dispatch({
            type: UPLOAD_PROGRESS,
            payload: progress,
          });
        });
        let responseJson = await res.json();
        console.log(responseJson, 'JSON');
        if (responseJson.responseStatus === true) {
          dispatch({
            type: MEDIA_UPLOAD_TO_API_SUCCESS,
            payload: responseJson,
          });
          dispatch({
            type: CLEAR_UPLOAD_PROGRESS,
          });
          // dispatch({
          //   type: CLEAR_UPLOAD_DATA,
          // });
        } else {
          logoutUserWhenTokenExpires(
            dispatch,
            responseJson.responseDescription,
            MEDIA_UPLOAD_TO_API_FAIL,
          );
          // dispatch({
          //   type: MEDIA_UPLOAD_TO_API_FAIL,
          //   payload: responseJson.responseDescription,
          // });
          dispatch({
            type: CLEAR_UPLOAD_PROGRESS,
          });
        }
      } catch (error) {
        logoutUserWhenTokenExpires(
          dispatch,
          responseJson.responseDescription,
          MEDIA_UPLOAD_TO_API_FAIL,
        );
        // dispatch({
        //   type: MEDIA_UPLOAD_TO_API_FAIL,
        //   payload:
        //     error.response && error.response.data.responseDescription
        //       ? error.response.data.responseDescription
        //       : error.message,
        // });
        dispatch({
          type: CLEAR_UPLOAD_PROGRESS,
        });
      }
    } else {
      try {
        dispatch({
          type: MEDIA_UPLOAD_TO_API_LOADING,
        });

        const token = getState().userLogin.token;
        const authorization = `Bearer ${token}`;

        let res = await RNFetchBlob.fetch(
          'POST',
          `${BASE_URL2}/media?genreId=${genreId}&title=${title}&description=${description}&featuredArtists=${featuredArtists}&albumId=${albumId}`,
          {
            Authorization: authorization,
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'mediaFile',
              filename: mediaName,
              data: RNFetchBlob.wrap(mediaFile),
              type: mediaType,
            },
            {
              name: 'trailerFile',
              filename: mediaTrimName,
              data: RNFetchBlob.wrap(trailerFile),
              type: mediaTrimType,
            },
            {
              name: 'photoFile',
              filename: mediaArtName,
              data: RNFetchBlob.wrap(photoFile),
              type: mediaArtType,
            },
          ],
        ).uploadProgress((written, total) => {
          console.log('uploaded', (written / total) * 100);
          const progress = (written / total).toFixed(2) * 100;
          dispatch({
            type: UPLOAD_PROGRESS,
            payload: progress,
          });
        });
        let responseJson = await res.json();
        console.log(responseJson, 'JSON');
        if (responseJson.responseStatus === true) {
          dispatch({
            type: MEDIA_UPLOAD_TO_API_SUCCESS,
            payload: responseJson.responseDescription,
          });
          dispatch({
            type: CLEAR_UPLOAD_PROGRESS,
          });
          // dispatch({
          //   type: CLEAR_UPLOAD_DATA,
          // });
        } else {
          logoutUserWhenTokenExpires(
            dispatch,
            responseJson.responseDescription,
            MEDIA_UPLOAD_TO_API_FAIL,
          );
          // dispatch({
          //   type: MEDIA_UPLOAD_TO_API_FAIL,
          //   payload: responseJson.responseDescription,
          // });
          dispatch({
            type: CLEAR_UPLOAD_PROGRESS,
          });
        }
      } catch (error) {
        logoutUserWhenTokenExpires(
          dispatch,
          responseJson.responseDescription,
          MEDIA_UPLOAD_TO_API_FAIL,
        );
        // dispatch({
        //   type: MEDIA_UPLOAD_TO_API_FAIL,
        //   payload:
        //     error.response && error.response.data.responseDescription
        //       ? error.response.data.responseDescription
        //       : error.message,
        // });
        dispatch({
          type: CLEAR_UPLOAD_PROGRESS,
        });
      }
    }
  };

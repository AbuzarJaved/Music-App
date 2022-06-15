import {
  MEDIA_UPLOAD_FAIL,
  MEDIA_UPLOAD_LOADING,
  MEDIA_UPLOAD_SUCCESS,
  MEDIA_ART_UPLOAD_FAIL,
  MEDIA_ART_UPLOAD_LOADING,
  MEDIA_ART_UPLOAD_SUCCESS,
  TRIM_MEDIA_UPLOAD_FAIL,
  TRIM_MEDIA_UPLOAD_SUCCESS,
  TRIM_MEDIA_UPLOAD_LOADING,
} from '../../../constants/index';

import {pickSinglePicture, pickSingleSong} from '../../../../utils/FilePicker';
import {addTrimTrackDetails} from '../../trimTrackActions';

export const chooseMedia = () => async dispatch => {
  try {
    dispatch({
      type: MEDIA_UPLOAD_LOADING,
    });

    const result = await pickSingleSong();
    if (result) {
      dispatch({
        type: MEDIA_UPLOAD_SUCCESS,
        payload: result,
      });
      dispatch(addTrimTrackDetails(result));
    }
  } catch (error) {
    dispatch({
      type: MEDIA_UPLOAD_FAIL,
      payload: error,
    });
  }
};
export const chooseTrimMedia = () => async dispatch => {
  try {
    dispatch({
      type: TRIM_MEDIA_UPLOAD_LOADING,
    });

    const result = await pickSingleSong();
    if (result) {
      dispatch({
        type: TRIM_MEDIA_UPLOAD_SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    dispatch({
      type: TRIM_MEDIA_UPLOAD_FAIL,
      payload: error,
    });
  }
};

export const chooseMediaArt = () => async dispatch => {
  try {
    dispatch({
      type: MEDIA_ART_UPLOAD_LOADING,
    });

    const result = await pickSinglePicture();
    if (result) {
      dispatch({
        type: MEDIA_ART_UPLOAD_SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    dispatch({
      type: MEDIA_ART_UPLOAD_FAIL,
      payload: error,
    });
  }
};

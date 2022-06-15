import {ADD_TRIM_TRACK_DATA} from '../constants/index';

export const addTrimTrackDetails = (data) => {
  console.log('Track Added');

  return {
    type: ADD_TRIM_TRACK_DATA,
    payload: data,
  };
};

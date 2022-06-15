import {ADD_TRIM_TRACK_DATA, CLEAR_TRIM_TRACK_DATA} from '../constants/index';

export const addTrimTrackReducer = (
  state = {name: '', url: '', type: '', size: null},
  {type, payload},
) => {
  switch (type) {
    case ADD_TRIM_TRACK_DATA:
      return {
        name: payload.name,
        type: payload.type,
        url: payload.uri,
        size: payload.size,
      };
    case CLEAR_TRIM_TRACK_DATA:
      return {
        name: '',
        type: '',
        url: '',
        size: '',
      };

    default:
      return state;
  }
};

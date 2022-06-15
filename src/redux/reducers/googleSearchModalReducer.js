import {
  OPEN_GOOGLE_SEARCH_MODAL,
  CLOSE_GOOGLE_SEARCH_MODAL,
} from '../constants/index';

export const openGoogleSearchReducer = (
  state = {isGoogleSearchModalOpen: false},
  {type},
) => {
  switch (type) {
    case OPEN_GOOGLE_SEARCH_MODAL:
      return {
        isGoogleSearchModalOpen: true,
      };

    case CLOSE_GOOGLE_SEARCH_MODAL:
      return {
        ...state,
        isGoogleSearchModalOpen: false,
      };

    default:
      return state;
  }
};

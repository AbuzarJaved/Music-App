import {
  OPEN_GOOGLE_SEARCH_MODAL,
  CLOSE_GOOGLE_SEARCH_MODAL,
} from '../constants/index';

export const openGoogleSearchModal = () => {
  console.log('Modal Open');
  return {
    type: OPEN_GOOGLE_SEARCH_MODAL,
  };
};
export const closeGoogleSearchModal = () => {
  console.log('Modal Open');
  return {
    type: CLOSE_GOOGLE_SEARCH_MODAL,
  };
};

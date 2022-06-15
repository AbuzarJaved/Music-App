import {
  OPEN_COMMENT_MODAL,
  CLOSE_COMMENT_MODAL,
  OPEN_MEDIA_COMMENT_MODAL,
  CLOSE_MEDIA_COMMENT_MODAL,
} from '../constants/index';

export const openCommentModal = (data) => {
  return {
    type: OPEN_COMMENT_MODAL,
    payload: data,
  };
};
export const closeCommentModal = () => {
  return {
    type: CLOSE_COMMENT_MODAL,
  };
};
export const open_Media_Comment_Modal = (data) => {
  return {
    type: OPEN_MEDIA_COMMENT_MODAL,
    payload: data,
  };
};
export const closeMediaCommentModal = () => {
  return {
    type: CLOSE_MEDIA_COMMENT_MODAL,
  };
};

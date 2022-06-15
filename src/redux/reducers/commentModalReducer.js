import {
  OPEN_COMMENT_MODAL,
  CLOSE_COMMENT_MODAL,
  OPEN_MEDIA_COMMENT_MODAL,
  CLOSE_MEDIA_COMMENT_MODAL,
} from '../constants/index';

export const openCommentModalReducer = (
  state = {isCommentModalOpen: false, commentDetails: {}},
  {type, payload},
) => {
  switch (type) {
    case OPEN_COMMENT_MODAL:
      return {
        isCommentModalOpen: true,
        commentDetails: payload,
      };

    case CLOSE_COMMENT_MODAL:
      return {
        ...state,
        isCommentModalOpen: false,
        
      };

    default:
      return state;
  }
};
export const openMediaCommentModalReducer = (
  state = {isMediaCommentModalOpen: false, mediaCommentDetails: {}},
  {type, payload},
) => {
  switch (type) {
    case OPEN_MEDIA_COMMENT_MODAL:
      return {
        isMediaCommentModalOpen: true,
        mediaCommentDetails: payload,
      };

    case CLOSE_MEDIA_COMMENT_MODAL:
      return {
        ...state,
        isMediaCommentModalOpen: false,
      };

    default:
      return state;
  }
};

import {
  OPEN_NOTIFICATION_FILTER_MODAL,
  CLOSE_NOTIFICATION_FILTER_MODAL,
} from '../constants/index';

export const openNotificationFilterReducer = (
  state = {isNotificationFilterOpen: false},
  {type},
) => {
  switch (type) {
    case OPEN_NOTIFICATION_FILTER_MODAL:
      return {
        isNotificationFilterOpen: true,
      };
    case CLOSE_NOTIFICATION_FILTER_MODAL:
      return {
        ...state,
        isNotificationFilterOpen: false,
      };

    default:
      return state;
  }
};

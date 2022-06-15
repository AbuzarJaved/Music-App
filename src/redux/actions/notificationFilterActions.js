import {
  OPEN_NOTIFICATION_FILTER_MODAL,
  CLOSE_NOTIFICATION_FILTER_MODAL,
} from '../constants/index';

export const openNotificationFilterModal = () => {
  console.log('Notification filter Opened');

  return {
    type: OPEN_NOTIFICATION_FILTER_MODAL,
  };
};
export const closeNotificationFilterModal = () => {
  console.log('Notification filter Closed');
  return {
    type: CLOSE_NOTIFICATION_FILTER_MODAL,
  };
};

import {
  OPEN_SONG_BOTTOM_SHEET,
  CLOSE_SONG_BOTTOM_SHEET,
  OPEN_SINGLE_ARTIST_MODAL,
  OPEN_LISTEN_SONG_ELSEWHERE_MODAL,
  OPEN_SINGLE_LISTENER_MODAL,
  CLOSE_LISTEN_SONG_ELSEWHERE_MODAL,
  CLOSE_SINGLE_ARTIST_MODAL,
  CLOSE_SINGLE_LISTENER_MODAL,
} from '../constants/index';

export const openSongBottomSheetView = data => {
  console.log('BottomSheet Opened');

  return {
    type: OPEN_SONG_BOTTOM_SHEET,
    payload: data,
  };
};
export const closeSongBottomSheetView = () => {
  console.log('BottomSheet Closed');
  return {
    type: CLOSE_SONG_BOTTOM_SHEET,
  };
};

export const openListenElsewhereModal = () => {
  return {
    type: OPEN_LISTEN_SONG_ELSEWHERE_MODAL,
  };
};
export const closeListenElsewhereModal = () => {
  return {
    type: CLOSE_LISTEN_SONG_ELSEWHERE_MODAL,
  };
};
export const openSingleArtistModal = data => {
  return {
    type: OPEN_SINGLE_ARTIST_MODAL,
    payload: data,
  };
};
export const closeSingleArtistModal = () => {
  return {
    type: CLOSE_SINGLE_ARTIST_MODAL,
  };
};
export const openSingleListenerModal = data => {
  return {
    type: OPEN_SINGLE_LISTENER_MODAL,
    payload: data,
  };
};
export const closeSingleListenerModal = () => {
  return {
    type: CLOSE_SINGLE_LISTENER_MODAL,
  };
};

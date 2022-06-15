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
import React, {useRef} from 'react';

export const openSongBottomSheetReducer = (
  state = {isSongBottomSheetOpen: false, songDetails: {}, artistDetails: {}},
  {type, payload},
) => {
  switch (type) {
    case OPEN_SONG_BOTTOM_SHEET:
      return {
        isSongBottomSheetOpen: true,
        songDetails: payload,
        artistDetails: payload.ownerAccountUser,
      };
    case CLOSE_SONG_BOTTOM_SHEET:
      return {
        ...state,
        isSongBottomSheetOpen: false,
      };

    default:
      return state;
  }
};

export const listenElsewhereModalReducer = (
  state = {isListenElsewhereModalOpen: false},
  {type, payload},
) => {
  switch (type) {
    case OPEN_LISTEN_SONG_ELSEWHERE_MODAL:
      return {
        ...state,
        isListenElsewhereModalOpen: true,
      };
    case CLOSE_LISTEN_SONG_ELSEWHERE_MODAL:
      return {
        ...state,
        isListenElsewhereModalOpen: false,
      };

    default:
      return state;
  }
};
export const singleArtistModalReducer = (
  state = {isSingleArtistModalOpen: false, artistProfile: {}},
  {type, payload},
) => {
  switch (type) {
    case OPEN_SINGLE_ARTIST_MODAL:
      return {
        ...state,
        isSingleArtistModalOpen: true,
        artistProfile: payload,
      };
    case CLOSE_SINGLE_ARTIST_MODAL:
      return {
        ...state,
        isSingleArtistModalOpen: false,
        artistProfile: {},
      };

    default:
      return state;
  }
};
export const singleListenerModalReducer = (
  state = {isSingleListenerModalOpen: false, listenerProfile: {}},
  {type, payload},
) => {
  switch (type) {
    case OPEN_SINGLE_LISTENER_MODAL:
      return {
        ...state,
        isSingleListenerModalOpen: true,
        listenerProfile: payload,
      };
    case CLOSE_SINGLE_LISTENER_MODAL:
      return {
        ...state,
        isSingleListenerModalOpen: false,
        listenerProfile: {},
      };

    default:
      return state;
  }
};

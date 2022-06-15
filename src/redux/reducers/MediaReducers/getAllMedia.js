import {
  GET_MEDIA_FAIL,
  GET_MEDIA_LOADING,
  GET_MEDIA_SUCCESS,
  GET_TRAILER_MEDIA_FAIL,
  GET_TRAILER_MEDIA_LOADING,
  GET_TRAILER_MEDIA_SUCCESS,
  GET_ALL_ARTIST_SONGS_FAIL,
  GET_ALL_ARTIST_SONGS_LOADING,
  GET_ALL_ARTIST_SONGS_SUCCESS,
  CHOOSE_POST_SONG,
  CLEAR_POST_SONG,
  PLAY_MEDIA_FAIL,
  PLAY_MEDIA_LOADING,
  PLAY_MEDIA_SUCCESS,
  GET_TRENDING_MEDIA_FAIL,
  GET_TRENDING_MEDIA_LOADING,
  GET_TRENDING_MEDIA_SUCCESS,
  GET_ARTIST_TRENDING_MEDIA_FAIL,
  GET_ARTIST_TRENDING_MEDIA_LOADING,
  GET_ARTIST_TRENDING_MEDIA_SUCCESS,
  GET_USER_MEDIA_LISTENING_HISTORY_FAIL,
  GET_USER_MEDIA_LISTENING_HISTORY_LOADING,
  GET_USER_MEDIA_LISTENING_HISTORY_SUCCESS,
  ADD_MEDIA_TO_DISCOVER_PAGE_FAIL,
  ADD_MEDIA_TO_DISCOVER_PAGE_LOADING,
  ADD_MEDIA_TO_DISCOVER_PAGE_SUCCESS,
  CLEAR_TRENDING_MEDIA_ERROR,
  LIKE_A_DISCOVER_SONG_FAIL,
  LIKE_A_DISCOVER_SONG_LOADING,
  LIKE_A_DISCOVER_SONG_SUCCESS,
  GET_ALL_USER_DISCOVERED_SONG_FAIL,
  GET_ALL_USER_DISCOVERED_SONG_LOADING,
  GET_ALL_USER_DISCOVERED_SONG_SUCCESS,
  MARK_SONG_AS_DISCOVERED_FAIL,
  MARK_SONG_AS_DISCOVERED_LOADING,
  MARK_SONG_AS_DISCOVERED_SUCCESS,
  DISCOVER_SCREEN_CURRENT_PAGE,
  DISCOVER_SCREEN_CURRENT_SIZE,
  CLEAR_TRAILER_MEDIA_ERROR,
  GET_SINGLE_ARTIST_MEDIA_BY_ID_FAIL,
  GET_SINGLE_ARTIST_MEDIA_BY_ID_LOADING,
  GET_SINGLE_ARTIST_MEDIA_BY_ID_SUCCESS,
  GET_USER_MEDIA_HISTORY_BY_ID_FAIL,
  GET_USER_MEDIA_HISTORY_BY_ID_LOADING,
  GET_USER_MEDIA_HISTORY_BY_ID_SUCCESS,
  RESET_PAGE,
  GET_LISTENER_LIKED_SONGS_FAIL,
  GET_LISTENER_LIKED_SONGS_LOADING,
  GET_LISTENER_LIKED_SONGS_SUCCESS,
  GET_SINGLE_LISTENER_LIKED_SONGS_FAIL,
  GET_SINGLE_LISTENER_LIKED_SONGS_LOADING,
  GET_SINGLE_LISTENER_LIKED_SONGS_SUCCESS,
} from '../../constants/index';

export const getMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_MEDIA_LOADING:
      return {
        loading: true,
        error: '',
        data: [],
      };

    case GET_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: '',
      };
    case GET_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: payload,
      };

    default:
      return state;
  }
};
export const getTrailerMediaReducer = (
  state = {loading: false, error: '', data: [], totalPage: null},
  {type, payload},
) => {
  switch (type) {
    case GET_TRAILER_MEDIA_LOADING:
      return {
        loading: true,
        error: '',
        data: [],
        totalPage: null,
      };

    case GET_TRAILER_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.content,
        totalPage: payload.totalPages,
        error: '',
      };
    case GET_TRAILER_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: payload,
        totalPage: null,
      };
    case CLEAR_TRAILER_MEDIA_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
      };

    default:
      return state;
  }
};
export const getArtistMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_ALL_ARTIST_SONGS_LOADING:
      return {
        loading: true,
        error: '',
        data: [],
      };

    case GET_ALL_ARTIST_SONGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: '',
      };
    case GET_ALL_ARTIST_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: payload,
      };

    default:
      return state;
  }
};

export const playMediaReducer = (
  state = {loading: false, error: '', message: '', status: false},
  {type, payload},
) => {
  switch (type) {
    case PLAY_MEDIA_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
        status: false,
      };
    case PLAY_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: payload.responseDescription,
        status: payload.responseStatus,
      };
    case PLAY_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: '',
        status: '',
      };

    default:
      return state;
  }
};

export const getTrendingMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_TRENDING_MEDIA_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_TRENDING_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_TRENDING_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    default:
      return state;
  }
};
export const getArtistTrendingMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_ARTIST_TRENDING_MEDIA_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_ARTIST_TRENDING_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_ARTIST_TRENDING_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    default:
      return state;
  }
};
export const getUserMediaListeningHistoryReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_USER_MEDIA_LISTENING_HISTORY_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_USER_MEDIA_LISTENING_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_USER_MEDIA_LISTENING_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    default:
      return state;
  }
};

export const addMediaToDiscoverPageReducer = (
  state = {loading: false, error: '', status: false, message: ''},
  {type, payload},
) => {
  switch (type) {
    case ADD_MEDIA_TO_DISCOVER_PAGE_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        status: false,
        message: '',
      };
    case ADD_MEDIA_TO_DISCOVER_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case ADD_MEDIA_TO_DISCOVER_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };

    default:
      return state;
  }
};

export const choosePostSongReducer = (
  state = {
    title: '',
    id: '',
    likeCount: null,
    hitCount: null,
    image: '',
    artist: '',
  },
  {type, payload},
) => {
  switch (type) {
    case CHOOSE_POST_SONG:
      return {
        title: payload.title,
        id: payload.id,
        likeCount: payload.likes,
        hitCount: payload.hits,
        image: payload.image,
        artist: payload.artist,
      };

    case CLEAR_POST_SONG:
      return {
        title: '',
        id: '',
        likeCount: null,
        hitCount: null,
        image: '',
        artist: '',
      };

    default:
      return state;
  }
};

export const getUserDiscoveredMediaReducer = (
  state = {
    discoveredMedia: [],
    loading: false,
    error: '',
  },
  {type, payload},
) => {
  switch (type) {
    case GET_ALL_USER_DISCOVERED_SONG_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_ALL_USER_DISCOVERED_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_ALL_USER_DISCOVERED_SONG_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};

export const likeADiscoverMediaReducer = (
  state = {loading: false, error: '', status: false, message: ''},
  {type, payload},
) => {
  switch (type) {
    case LIKE_A_DISCOVER_SONG_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        status: false,
        message: '',
      };
    case LIKE_A_DISCOVER_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case LIKE_A_DISCOVER_SONG_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };

    default:
      return state;
  }
};

export const increaseCurrentDiscoverPageReducer = (
  state = {page: 0},
  {type},
) => {
  switch (type) {
    case DISCOVER_SCREEN_CURRENT_PAGE:
      const newPage = state.page + 1;
      return {
        page: newPage,
      };
    case RESET_PAGE:
      return {
        page: 0,
      };

    default:
      return state;
  }
};
export const increaseCurrentDiscoverSizeReducer = (
  state = {size: 30},
  {type},
) => {
  switch (type) {
    case DISCOVER_SCREEN_CURRENT_SIZE:
      const newSize = state.size + 30;
      return {
        size: newSize,
      };

    default:
      return state;
  }
};

export const getSingleArtistMediasReducer = (
  state = {
    medias: [],
    loading: false,
    error: '',
  },
  {type, payload},
) => {
  switch (type) {
    case GET_SINGLE_ARTIST_MEDIA_BY_ID_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        medias: [],
      };
    case GET_SINGLE_ARTIST_MEDIA_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        medias: payload,
      };
    case GET_SINGLE_ARTIST_MEDIA_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        medias: [],
      };

    default:
      return state;
  }
};
export const getSingleUserMediasHistoryReducer = (
  state = {
    medias: [],
    loading: false,
    error: '',
  },
  {type, payload},
) => {
  switch (type) {
    case GET_USER_MEDIA_HISTORY_BY_ID_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        medias: [],
      };
    case GET_USER_MEDIA_HISTORY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        medias: payload,
      };
    case GET_USER_MEDIA_HISTORY_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        medias: [],
      };

    default:
      return state;
  }
};

export const getListenerLikedMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_LISTENER_LIKED_SONGS_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        // data: [],
      };
    case GET_LISTENER_LIKED_SONGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_LISTENER_LIKED_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};
export const getSingleListenerLikedMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_SINGLE_LISTENER_LIKED_SONGS_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_SINGLE_LISTENER_LIKED_SONGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_SINGLE_LISTENER_LIKED_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};

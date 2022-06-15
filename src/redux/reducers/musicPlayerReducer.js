import {
  OPEN_MUSIC_PLAYER,
  CLOSE_MUSIC_PLAYER,
  OPEN_MUSIC_FROM_MINI_PLAYER,
  OPEN_MUSIC_PLAYER_LOADING as OPEN_MUSIC_PLAYER_RESET,
  SHUFFLE_MEDIA_SONGS,
  UN_SHUFFLE_MEDIA_SONGS,
} from '../constants/index';
import {shuffleSong} from '../../utils/shuffleSongs';

export const openMusicPlayerReducer = (
  state = {
    isMusicPlayerOpen: false,
    data: [],
    currentPlayerTrack: {title: '', image: '', url: '', id: ''},
    shuffledData: false,
  },
  {type, payload},
) => {
  switch (type) {
    // case OPEN_MUSIC_PLAYER_RESET:
    //   return {
    //     ...state,
    //     data: [],
    //     currentPlayerTrack: {title: '', image: '', url: '', id: ''},
    //   };
    case OPEN_MUSIC_PLAYER:
      // const datas = payload.mediaSongs?.forEach(function (obj) {
      //   obj.id = obj.mediaIdentity;
      //   obj.url = obj.mediaUrl;
      //   obj.title = obj.mediaTitle;
      //   obj.image = obj.photoUrl;
      //   obj.artists = obj && obj.artist && obj.artist.stageName;
      //   obj.artwork = obj.photoUrl;
      //   delete obj.genre;
      //   Object.preventExtensions(obj);
      // });
      // console.log(datas, 'DATA BEFORE SHUFFLE');
      return {
        isMusicPlayerOpen: true,
        currentPlayerTrack: payload.currentTrack,
        data: payload.mediaSongs,
      };
    case OPEN_MUSIC_FROM_MINI_PLAYER:
      return {
        ...state,
        isMusicPlayerOpen: true,
      };
    case SHUFFLE_MEDIA_SONGS:
      // const shuffledData = shuffleSong(payload);
      // console.log(shuffledData, 'DATA AFTER SHUFFLE');
      return {
        ...state,
        shuffledData: true,
      };
    case UN_SHUFFLE_MEDIA_SONGS:
      // const shuffledData = shuffleSong(state.data);
      console.log(state.data, 'DATA AFTER SHUFFLE AND UNSHUFFLED');
      return {
        ...state,
        data: state.data,
      };
    case CLOSE_MUSIC_PLAYER:
      return {
        ...state,
        isMusicPlayerOpen: false,
      };

    default:
      return state;
  }
};

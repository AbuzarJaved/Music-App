import {
  OPEN_MUSIC_PLAYER,
  CLOSE_MUSIC_PLAYER,
  OPEN_MUSIC_FROM_MINI_PLAYER,
  OPEN_MUSIC_PLAYER_RESET,
  SHUFFLE_MEDIA_SONGS,
  UN_SHUFFLE_MEDIA_SONGS,
} from '../constants/index';
import TrackPlayer from 'react-native-track-player';
import {shuffleSong} from '../../utils/shuffleSongs';
// export const musicDetails = () => {
//   console.log('MUSIC DETAILS RESET');
//   return {
//     type: OPEN_MUSIC_PLAYER_RESET,
//   };
// };

export const openModalPlayer = (data) => {
  console.log('Modal Open, sOong added', data);

  return {
    type: OPEN_MUSIC_PLAYER,
    payload: data,
  };
};

export const openModalPlayerFromMiniPlayer = () => {
  console.log('Modal Open');
  return {
    type: OPEN_MUSIC_FROM_MINI_PLAYER,
  };
};
export const closeModalPlayer = () => {
  console.log('Modal Closed');
  return {
    type: CLOSE_MUSIC_PLAYER,
  };
};

export const shuffleSongs = () => async () => {
  const tracks = await TrackPlayer.getQueue();
  console.log(tracks, 'DATA BEFORE SHUFFLE');
  const shuffledData = shuffleSong(tracks);
  if (shuffledData) {
    TrackPlayer.removeUpcomingTracks();
  }
  await TrackPlayer.add([...shuffledData]);
  console.log(shuffledData, 'DATA AFTER SHUFFLE');
  return {
    type: SHUFFLE_MEDIA_SONGS,
    // payload: data,
  };
};
export const unShuffleSongs = () => {
  return {
    type: UN_SHUFFLE_MEDIA_SONGS,
  };
};

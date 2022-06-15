import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  get_Media,
  get_Trailer_Media,
  increase_Discover_Media_Page,
  increase_Discover_Media_Size,
} from '../../redux/actions/MediaActions/getMediaActions';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  RepeatMode,
} from 'react-native-track-player';
import Data from 'city-state-country';
import {CLEAR_TRAILER_MEDIA_ERROR, RESET_PAGE} from '../../redux/constants';

const FocusEffect = ({page, size, unLike, chooseState, countryCode}) => {
  const [currentTrack, setCurrentTrack] = useState('');
  const dispatch = useDispatch();
  const {
    play,
    resetCurrentTrack,
    resetTrack,
    currentDiscoveryTrack,
    currentMusicTrack,
  } = usePlayerContext();
  const getTrailerMedia = useSelector(state => state.getTrailerMedia);
  const increaseCurrentDiscoverPage = useSelector(
    state => state.increaseCurrentDiscoverPage,
  );
  const {page: currentPage} = increaseCurrentDiscoverPage;
  const increaseCurrentDiscoverSize = useSelector(
    state => state.increaseCurrentDiscoverSize,
  );
  const {size: currentSize} = increaseCurrentDiscoverSize;

  const {data, loading, error, totalPages} = getTrailerMedia;

  // React.useEffect(() => {
  //   const Listener = TrackPlayer.addEventListener(
  //     'playback-track-changed',
  //     async ({track, position, nextTrack}) => {
  //       setCurrentTrack(nextTrack);
  //       if (currentTrack !== '') {
  //         if (currentTrack !== nextTrack) {
  //         }
  //       }
  //     },
  //   );
  //   return () => {
  //     Listener.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   dispatch(get_Trailer_Media(currentPage, currentSize));
  //   if (data && data.length > 0 && loading === false) {
  //     const newData = data.every(item => {
  //       item.url = item.trailer;
  //     });
  //     play(newData);
  //   }
  // }, []);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        if (!currentMusicTrack && currentDiscoveryTrack) {
          TrackPlayer.setRepeatMode(RepeatMode.Track);
        }
      }
      if (event.type === Event.PlaybackQueueEnded && event.nextTrack == null) {
        if (currentPage < totalPages) {
          dispatch(increase_Discover_Media_Page());
        } else if (currentPage > totalPages) {
          dispatch({
            type: RESET_PAGE,
          });
        }
        // dispatch(get_Trailer_Media(currentPage, currentSize));
        // if (data && data.length > 0 && loading === false) {
        //   const newData = data.every(item => {
        //     item.url = item.trailer;
        //   });
        //   play(newData);
        // }
      }
    },
  );

  // useEffect(() => {
  //   dispatch(get_Trailer_Media(currentPage, currentSize));
  //   const songData = [];
  //   console.log('USEFFCT1');
  //   if (data && data.length > 0 && loading === false) {
  //     data.forEach(item =>
  //       songData.push({
  //         ...item,
  //         url: item.trailer,
  //         artist: item.ownerAccountUser.username,
  //       }),
  //     );
  //     play(songData);
  //   }
  // }, []);
  // useTrackPlayerEvents([])

  // dispatch(increase_Discover_Media_Page());
  // useEffect(() => {
  //   console.log('USEFFCT2');
  //   dispatch(get_Trailer_Media(currentPage, currentSize));
  //   if (data && data.length <= 0 && loading === false) {
  //     console.log('USEFFCT1');
  //     dispatch(get_Trailer_Media(currentPage, currentSize));
  //     const songData2 = [];
  //     data.forEach(item =>
  //       songData2.push({
  //         ...item,
  //         url: item.trailer,
  //         artist: item.ownerAccountUser.username,
  //       }),
  //     );
  //     play(songData2);
  //   }
  // }, [data]);
  const trackReset = () => {
    resetTrack();
    resetCurrentTrack();
  };

  useFocusEffect(
    React.useCallback(() => {
      // resetTrack();
      resetCurrentTrack();
      // dispatch({type: CLEAR_TRAILER_MEDIA_ERROR});
      const songData1 = [];
      // if (data && data.length <= 0 && loading === false) {
      //   dispatch(get_Trailer_Media(currentPage, currentSize));
      //   if (data) {
      //     data.forEach(item =>
      //       songData1.push({
      //         ...item,
      //         url: item.trailer,
      //         artist: item.ownerAccountUser.username,
      //       }),
      //     );
      //     play(songData1);
      //   }
      // }

      const songData = [];
      if (data && data.length > 0 && loading !== true) {
        data.forEach(item =>
          songData.push({
            ...item,
            url: item.trailer,
            artist: item.ownerAccountUser.username,
          }),
        );
        play(songData);
      }

      return async () => trackReset();
    }, [data]),
  );
  return null;
};

export default FocusEffect;

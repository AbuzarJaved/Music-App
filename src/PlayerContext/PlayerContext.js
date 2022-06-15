import React, {useContext, useCallback, useRef} from 'react';
import {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import TrackPlayer, {
  Track,
  useTrackPlayerProgress,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  State,
  RepeatMode,
  Capability,
  Event,
} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {shuffleSongs} from '../redux/actions/musicPlayerActions';
import {play_Media} from '../redux/actions/MediaActions/getMediaActions';

// const {} = useTrackPlayerProgress

const PlayerContext = React.createContext({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isEmpty: false,
  isBuffering: false,
  currentTrack: null,
  isMusicPlaying: false,
  istrimTrackPlaying: false,
  isMusicPaused: false,
  istrimTrackPaused: false,
  isMusicEmpty: false,
  istrimTrackEmpty: false,
  isMusicStopped: false,
  istrimTrackStopped: false,
  isMusicBuffering: false,
  istrimTrackBuffering: false,
  currentMusicTrack: null,
  currentIndex: 0,
  play: () => null,
  pause: () => null,
  setPlayerStateReady: () => null,
  skip: () => null,
  toggleMusicPlay: () => null,
  isPlayerReady: false,
  trimPlay: () => null,
  playMusic: () => null,
  skipToNextMusic: () => null,
  skipToPreviousMusic: () => null,
  musicPause: () => null,
  musicPlay: () => null,
  bottomRef: null,
  getSongs: () => null,
  currentTrackId: '',
  currentTrackDetails: {},
  currentDiscoveryTrack: {},
  resetTrack: () => null,
  toggleShuffle: () => null,
  changeToOrder: () => null,
  shuffleState: false,
  changeToRepeatOff: () => null,
  changeToRepeatOn: () => null,
  repeatState: 'off',
  repeatIcon: () => null,
  changeRepeatMode: () => null,
  repeatQueue: () => null,
  resetCurrentTrack: () => null,
});

export const PlayerContextProvider = ({children}) => {
  const [playerState, setPlayerState] = useState(null);
  const [musicPlayerState, setMusicPlayerState] = useState(null);
  const [trimTrackState, setTrimTrackState] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrimTrack, setCurrentTrimTrack] = useState(null);
  const [currentQueue, setCurrentQueue] = useState([]);
  const [currentDiscoveryTrackId, setDiscoveryTrackId] = useState('');
  const [currentDiscoveryTrack, setCurrentDiscoveryTrack] = useState({});
  const [currentMusicTrack, setCurrentMusicTrack] = useState(null);
  const [isPlayerReady, setPlayerReady] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState('');
  const [currentTrackDetails, setCurrentTrackDetails] = useState({});
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatState, setRepeatState] = useState('off');

  const bottomRef = useRef(null);
  const dispatch = useDispatch();
  const openMusicPlayer = useSelector(state => state.openMusicPlayer);
  const {data} = openMusicPlayer;
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;
  const mainPlayerState = usePlaybackState();

  // console.log(mainPlayerState, 'PLAYER STATE');

  useEffect(() => {
    // setPlayerState(mainPlayerState);
    // setMusicPlayerState(mainPlayerState);
    // setTrimTrackState(mainPlayerState);
    // const Listener1 = TrackPlayer.addEventListener(
    //   'playback-state',
    //   ({state}) => {
    //     setPlayerState(state),
    //       setMusicPlayerState(state),
    //       setTrimTrackState(state);
    //   },
    // );
    // return () => {
    //   Listener1.remove();
    // };
  }, []);
  // useEffect(() => {
  //   const Listener2 = TrackPlayer.addEventListener(
  //     'playback-state',
  //     ({state}) => setMusicPlayerState(state),
  //     console.log('listner1'),
  //   );

  //   return () => {
  //     Listener2.remove();
  //   };
  // }, []);
  // useEffect(() => {
  //   const Listener3 = TrackPlayer.addEventListener(
  //     'playback-state',
  //     ({state}) => setTrimTrackState(state),
  //     console.log('Trim Track listner'),
  //   );

  //   return () => {
  //     Listener3.remove();
  //   };
  // }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const trackObject = await TrackPlayer.getTrack(event.nextTrack);
      const trackQueue = await TrackPlayer.getQueue();
      console.log(event, 'PAYBACK eVENT');
      // const trackObject = await TrackPlayer.getTrack(event.nextTrack);

      if (trackObject) {
        if (trackObject.ownerAccountUser) {
          const newObject = {
            ...trackObject,
            artist: trackObject.ownerAccountUser.username,
          };
          // console.log('trackObject', newObject);
          setCurrentMusicTrack(event.nextTrack);
          setCurrentTrackDetails(newObject);
        } else {
          // console.log('trackObject', trackObject);
          // dispatch(play_Media(city, state, country, trackObject.id));
          setCurrentMusicTrack(event.nextTrack);
          setCurrentTrackDetails(trackObject);
        }
      }
      if (currentMusicTrack && !currentDiscoveryTrack) {
        dispatch(play_Media(city, state, country, trackObject.id));
      }
      if (trackQueue) {
        setCurrentQueue(trackQueue);
        await TrackPlayer.play();
      }
    }
  });

  useEffect(() => {
    // const Listener = TrackPlayer.addEventListener(
    //   'playback-track-changed',
    //   async ({track, position, nextTrack}) => {
    //     const trackObject = await TrackPlayer.getTrack(nextTrack);
    //     const trackQueue = await TrackPlayer.getQueue();
    //     if (trackObject) {
    //       if (trackObject.ownerAccountUser) {
    //         const newObject = {
    //           ...trackObject,
    //           artist: trackObject.ownerAccountUser.username,
    //         };
    //         console.log('trackObject', newObject);
    //         dispatch(play_Media(city, state, country, trackObject.id));
    //         setCurrentMusicTrack(newObject);
    //         setCurrentTrackDetails(newObject);
    //       } else {
    //         console.log('trackObject', trackObject);
    //         dispatch(play_Media(city, state, country, trackObject.id));
    //         setCurrentMusicTrack(trackObject);
    //         setCurrentTrackDetails(trackObject);
    //       }
    //     }
    //     if (trackQueue) {
    //       setCurrentQueue(trackQueue);
    //       await TrackPlayer.play();
    //     }
    //   },
    // );
    // return () => {
    //   Listener.remove();
    // };
  }, []);
  // const shuffleTrack = async () => {
  //   // const getQueue = await TrackPlayer.getQueue();
  //   dispatch(shuffleSongs(currentQueue));
  //   if (shuffleState === 'Shuffle mode') {
  //     console.log(currentQueue, 'SHUFFLE MODE queue');

  //     TrackPlayer.removeUpcomingTracks();
  //     console.log(data, 'DATA FROM SHUFFLINGgggggg');
  //     if (data !== []) {
  //       setCurrentQueue(data);
  //       await TrackPlayer.add(data);
  //       // await TrackPlayer.play();
  //       // setCurrentTrackDetails(data[0]);
  //     }
  //     // musicPlay(newSong);
  //   }
  // };

  // useEffect(() => {
  //   shuffleTrack();
  //   const Listener = TrackPlayer.addEventListener(
  //     'playback-queue-ended',
  //     async ({track, position, nextTrack}) => {
  //       console.log(nextTrack, 'TRACK ENDED');

  //       if (shuffleState === 'Shuffle mode' && currentQueue !== []) {
  //         playMusic(currentQueue);
  //       }
  //       return () => {
  //         Listener.remove();
  //       };
  //     },
  //   );
  // }, [shuffleState]);

  const play = useCallback(async track => {
    await TrackPlayer.reset();
    setCurrentMusicTrack(null);
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    if (track) {
      await TrackPlayer.add([...track]);
      if (currentTrackId) {
        const trackObject = await TrackPlayer.getTrack(currentTrackId);
        // setCurrentMusicTrack(trackObject);
        setCurrentTrackDetails(trackObject);
        // setCurrentDiscoveryTrack(trackObject);
        // setCurrentDiscoveryTrackId(currentTrackId);
        await TrackPlayer.play();
      }
    }
    // await TrackPlayer.reset();
    // setCurrentMusicTrack(null);
    // if (!track) {
    //   if (currentTrack) {
    //     await TrackPlayer.play();
    //   }
    //   return;
    // }
    // if (track.id && currentTrack) {
    //   if (track.id && currentTrack !== currentTrack.id) {
    //     await TrackPlayer.reset();
    //   }
    // }
    // setCurrentTrack(track);
    // await TrackPlayer.add([...track]);
    // if (currentTrack) {
    //   await TrackPlayer.play();
    // }
    // setCurrentDiscoveryTrack(track);
  }, []);

  const playMusic = useCallback(
    async (track, index) => {
      await TrackPlayer.reset();
      // setCurrentDiscoveryTrack({});
      // const currentTrackId = await TrackPlayer.getCurrentTrack();
      // if (track) {
      //   await TrackPlayer.add(track);
      //   // await TrackPlayer.add(track, index);

      //   if (currentTrackId != null) {
      //     setCurrentMusicTrack(...track);
      //     // setCurrentMusicTrack(index);
      //     const trackObject = await TrackPlayer.getTrack(currentTrackId);
      //     setCurrentTrackDetails(trackObject);
      //     // setCurrentTrackId(currentTrackId);
      //     await TrackPlayer.play();
      //   }
      // }
      if (!track) {
        if (currentMusicTrack) {
          await TrackPlayer.play();
        }
        return;
      }
      if (track.id && currentMusicTrack) {
        if (track.id && currentMusicTrack !== currentMusicTrack.id) {
          await TrackPlayer.reset();
        }
      }
      await TrackPlayer.add([...track]);
      setCurrentMusicTrack(...track);
      if (currentMusicTrack) {
        await TrackPlayer.play();
      }
      const trackId = await TrackPlayer.getCurrentTrack();
      if (trackId) {
        const trackObject = await TrackPlayer.getTrack(trackId);
        setCurrentTrackDetails(trackObject);
        setCurrentTrackId(trackId);
      }
    },
    [currentMusicTrack],
  );

  const toggleMusicPlay = async () => {
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    if (currentTrackId !== null) {
      if (mainPlayerState === State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const trimPlay = useCallback(async track => {
    await TrackPlayer.reset();
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    if (track) {
      await TrackPlayer.add([track]);
      if (currentTrackId) {
        setCurrentTrimTrack(currentTrackId);
        const trackObject = await TrackPlayer.getTrack(currentTrackId);
        setCurrentTrimTrackDetails(trackObject);
        await TrackPlayer.play();
      }
    }

    // if (!track) {
    //   if (currentTrimTrack) {
    //     await TrackPlayer.play();
    //   }
    //   return;
    // }
    // if (track.id && currentTrimTrack) {
    //   if (track.id && currentTrimTrack !== currentTrimTrack.id) {
    //     await TrackPlayer.reset();
    //   }
    // }
    // if (Platform.OS === 'ios') {

    //   const data = [track];
    //   data.forEach((i) => {
    //     i.artist = i.artists;
    //     i.url = `${i.url}.mp3`;
    //   });

    //   await TrackPlayer.add([...data]);
    // } else {
    //   await TrackPlayer.add([track]);
    // }
    // await TrackPlayer.add([track]);
    // setCurrentTrimTrack(track);
    // if (currentTrack) {
    //   await TrackPlayer.play();
    // }
    // setCurrentTrimTrackDetails(track);
  }, []);
  const pause = async () => {
    await TrackPlayer.pause();
  };
  const musicPlay = async () => {
    await TrackPlayer.play();
  };
  const musicPause = async () => {
    await TrackPlayer.pause();
  };
  const resetCurrentTrack = () => {
    setCurrentMusicTrack(null);
    setCurrentTrackDetails({});
  };
  const skip = async id => {
    await TrackPlayer.skip(id);
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    if (currentTrackId !== null) {
      // setCurrentMusicTrack(currentTrackId);
      const trackObject = await TrackPlayer.getTrack(currentTrackId);
      setCurrentTrackDetails(trackObject);
      setCurrentTrackId(currentTrackId);
    }
    // setCurrentMusicTrack(id);
  };
  const skipToNextMusic = async () => {
    await TrackPlayer.skipToNext();
    const trackId = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackId);
    setCurrentTrackDetails(trackObject);
    setCurrentTrackId(trackId);
  };
  const skipToPreviousMusic = async () => {
    await TrackPlayer.skipToPrevious();
    const trackId = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackId);
    setCurrentTrackDetails(trackObject);
    // setCurrentTrackId(trackId);
  };
  const repeatIcon = () => {
    if (repeatState === 'off') {
      return 'repeat-off';
    }
    if (repeatState === 'track') {
      return 'repeat-once';
    }
    if (repeatState === 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatState === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatState('track');
    }
    if (repeatState === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatState('repeat');
    }
    if (repeatState === 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatState('off');
    }
  };
  const repeatQueue = () => {
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
    // setRepeatState(RepeatMode.Queue);
  };

  const setPlayerStateReady = () => {
    setPlayerReady(true);
  };
  const toggleShuffle = () => {
    setShuffleState(!shuffleState);
  };
  const changeToOrder = () => {
    setShuffleState('Order mode');
  };
  const changeToRepeatOff = () => {
    setRepeatState('Repeat On');
  };
  const changeToRepeatOn = () => {
    setRepeatState('Repeat Off');
  };

  const getSongs = async () => {
    const tracks = await TrackPlayer.getQueue();
    return tracks;
  };
  const resetTrack = async () => {
    await TrackPlayer.reset();
  };

  const value = {
    isPlaying: mainPlayerState === State.Playing,
    isPaused: mainPlayerState === State.Paused,
    isEmpty: mainPlayerState === State.None,
    isStopped: mainPlayerState === State.Stopped,
    isBuffering: mainPlayerState === State.Buffering,
    currentTrack,
    isPlayerReady,
    currentMusicTrack,
    isMusicPlaying: mainPlayerState === State.Playing,
    isMusicPaused: mainPlayerState === State.Paused,
    isMusicEmpty: mainPlayerState === State.None,
    isMusicStopped: mainPlayerState === State.Stopped,
    isMusicBuffering: mainPlayerState === State.Buffering,
    isTrimTrackPlaying: mainPlayerState === State.Playing,
    isTrimTrackPaused: mainPlayerState === State.Paused,
    isTrimTrackEmpty: mainPlayerState === State.None,
    isTrimTrackStopped: mainPlayerState === State.Stopped,
    isTrimTrackBuffering: mainPlayerState === State.Buffering,
    play,
    pause,
    musicPause,
    setPlayerStateReady,
    skip,
    trimPlay,
    playMusic,
    skipToPreviousMusic,
    skipToNextMusic,
    bottomRef,
    getSongs,
    currentTrackId,
    currentTrackDetails,
    musicPlay,
    currentDiscoveryTrack,
    trimTrackState,
    resetTrack,
    changeToOrder,
    shuffleState,
    toggleShuffle,
    changeToRepeatOn,
    changeToRepeatOff,
    repeatState,
    toggleMusicPlay,
    changeRepeatMode,
    repeatIcon,
    repeatQueue,
    resetCurrentTrack,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

// export function useProgress(updateInterval) {
//   const [states, setStates] = useState({position: 0, duration: 0, buffered: 0});
//   const playerState = usePlaybackState();

//   const getProgress = async () => {
//     const [position, duration, buffered] = await Promise.all([
//       TrackPlayer.getPosition(),
//       TrackPlayer.getDuration(),
//       TrackPlayer.getBufferedPosition(),
//     ]);

//     setStates({position, duration, buffered});
//   };

//   useEffect(() => {
//     if (playerState !== State.Playing && playerState !== State.Buffering)
//       return;
//     const poll = setInterval(getProgress, updateInterval || 1000);
//     return () => clearInterval(poll);
//   }, [playerState]);

//   return states;
// }

export function useMusicProgress(updateInterval) {
  const [musicStates, setMusicStates] = useState({
    position: 0,
    duration: 0,
    buffered: 0,
  });
  const musicPlayerState = usePlaybackState();
  const getMusicProgress = async () => {
    const [position, duration, buffered] = await Promise.all([
      TrackPlayer.getPosition(),
      TrackPlayer.getDuration(),
      TrackPlayer.getBufferedPosition(),
    ]);

    setMusicStates({position, duration, buffered});
  };

  useEffect(() => {
    if (
      musicPlayerState !== State.Playing &&
      musicPlayerState !== State.Buffering
    ) {
      return;
    }
    const poll = setInterval(getMusicProgress, updateInterval || 1000);
    return () => clearInterval(poll);
  }, [musicPlayerState]);

  return musicStates;
}

export const usePlayerContext = () => useContext(PlayerContext);
export const PlayerConsumer = PlayerContext.Consumer;
export default PlayerContext;

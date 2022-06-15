import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  //  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

  await TrackPlayer.addEventListener('remote-next', () =>
    TrackPlayer.skipToNext(),
  );

  await TrackPlayer.addEventListener('remote-previous', () =>
    TrackPlayer.skipToPrevious(),
  );
};

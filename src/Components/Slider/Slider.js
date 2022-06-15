import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useTrackPlayerProgress} from 'react-native-track-player';
import {useProgress,useMusicProgress} from '../../PlayerContext/PlayerContext';

const formatTime = (secs) => {
  let minutes = Math.floor(secs / 60);
  let seconds = Math.floor(secs - minutes * 60);

  if (seconds < 10) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
};

const Sliders = ({color, showTime}) => {
  
  const {position, duration} = useMusicProgress(1000);
  //   console.log({duration, position});
  const handleChange = async(val) => {
   await TrackPlayer.seekTo(val);
  };
  // const positions = formatTime(position)
  // const durations = formatTime(duration)

  return (
    <>
      <Slider
        thumbTintColor="#f68128"
        style={{width: '100%'}}
        minimumValue={0}
        value={position}
        maximumValue={duration}
        minimumTrackTintColor="#f68128"
        maximumTrackTintColor={color}
        onSlidingComplete={handleChange}
      />
      {showTime && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <Text style={{color: '#eee', fontSize: 12}}>
            {formatTime(position)}
          </Text>
          <Text style={{color: '#eee', fontSize: 12}}>
            {formatTime(duration - position)}
          </Text>
        </View>
      )}
    </>
  );
};

export default Sliders;

const styles = StyleSheet.create({});

import React from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';

import data3 from '../../../data3';
import SongDetail from './Component/SongDetail';
import {usePlayerContext} from '../../../PlayerContext/PlayerContext';
import PlayListContainer from '../../Playlist/component/PlaylistContainer';

const {width, height} = Dimensions.get('window');
const Playlist_Screen = () => {
  const {isEmpty, currentMusicTrack} = usePlayerContext();
  return (
    <View
      style={[
        {
          backgroundColor: '#000',
          width,
          height,
          flex: 1,
          // paddingHorizontal: 10,
          // paddingVertical: 10,
        },
        isEmpty || !currentMusicTrack
          ? {paddingBottom: 60}
          : {paddingBottom: 120},
      ]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 20,
          width: '100%',
          paddingLeft: 20,
        }}
        numColumns={2}
        data={data3}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <SongDetail {...item} />}
      />
    </View>
  );
};

export default Playlist_Screen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#000',
    // paddingBottom: !isEmpty? 100 : 0,
  },
});

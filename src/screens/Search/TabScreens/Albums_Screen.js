import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import data3 from '../../../data3';
import SongDetail from './Component/SongDetail';
import {usePlayerContext} from '../../../PlayerContext/PlayerContext';

const Albums_Screen = () => {
  const {isEmpty, currentMusicTrack} = usePlayerContext();
  return (
    <View
      style={[
        {backgroundColor: '#000', flex: 1},
        isEmpty || !currentMusicTrack
          ? {paddingBottom: 60}
          : {paddingBottom: 120},
      ]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
          paddingVertical: 20,
          width: '100%',
          paddingLeft: 20,
        }}
        data={data3}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <SongDetail {...item} />}
      />
    </View>
  );
};

export default Albums_Screen;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#000',
  //   paddingBottom: 100,
  // },
});

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import data from '../../../data';
import SongDetail from './Component/SongDetail';
import {usePlayerContext} from '../../../PlayerContext/PlayerContext';
import GenreSongs from './Component/GenreSongs';
import {genreList} from '../../../data5';

const {width, height} = Dimensions.get('window');
const Genre_Screen = () => {
  const {isEmpty, currentMusicTrack} = usePlayerContext();

  const genreView = genreList.map((item, index) => {
    <GenreSongs key={index} {...item} />;
  });

  return (
    <View
      style={[
        {backgroundColor: '#000', width, height, flex: 1},
        isEmpty || !currentMusicTrack
          ? {paddingBottom: 60}
          : {paddingBottom: 120},
      ]}>
      {/* <ScrollView
        contentContainerStyle={{
          width,
        }}
        bounces={false}> */}
      <View style={{width, paddingHorizontal: 5, paddingVertical: 10}}>
        {/* {genreView} */}
        <FlatList
          numColumns={2}
          contentContainerStyle={{
            paddingVertical: 20,
            width: '100%',
            paddingLeft: 20,
          }}
          data={genreList}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <GenreSongs {...item} />}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default Genre_Screen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#000',
    // paddingBottom: 100,
  },
  likes: {
    position: 'absolute',
    left: 10,
    bottom: 60,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

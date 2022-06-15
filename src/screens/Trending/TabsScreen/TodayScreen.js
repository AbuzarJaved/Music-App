import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import WhatsHotSongs from '../../../Components/LibrarySongs/WhatsHotSongs';
import GeneralSongs from '../../../Components/LibrarySongs/GeneralSong';

import data from '../../../data';

const {width, height} = Dimensions.get('window');

const TodayScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={{color: '#eee'}}>Today</Text>
        {/* <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <GeneralSongs indexes index={index} {...item} />
           
          )}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default TodayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    padding: 10,
    paddingTop: 20,
  },
});

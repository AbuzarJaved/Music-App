import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CustomHeader from '../../../Notifications/component/CustomHeader';

const {width, height} = Dimensions.get('window');

const MorePlaylist = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View style={styles.container}>
          <CustomHeader title="Create Playlist" />
          <View style={styles.content}>
            <Text style={{color: '#fff'}}>More Playlist</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MorePlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#000',
  },
  content: {
    width,
    marginTop: 70,
  },
});

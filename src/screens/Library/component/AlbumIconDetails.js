import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AlbumIconDetails = () => {
  return (
    <View style={styles.container}>
      {/* SINGLE ICON */}
      <View style={{marginHorizontal: 10, marginVertical: 20}}>
        <Icon name="heart" size={24} color="#ddd" />
        <Text style={{color: '#ddd', fontSize: 13}}>15K</Text>
      </View>
      {/* SINGLE ICON */}
      <View style={{marginHorizontal: 10, marginVertical: 20}}>
        <Icon name="play" size={24} color="#ddd" />
        <Text style={{color: '#ddd', fontSize: 13}}>10K</Text>
      </View>
      {/* SINGLE ICON */}
      <View style={{marginHorizontal: 10, marginVertical: 20}}>
        <Icon name="chatbubble" size={24} color="#ddd" />
        <Text style={{color: '#ddd', fontSize: 13}}>5K</Text>
      </View>
      {/* SINGLE ICON */}
      {/* <View style={{marginHorizontal: 10, marginVertical: 20}}>
        <Icon name="arrow-redo" size={24} color="#ddd" />
        <Text style={{color: '#ddd', fontSize: 13}}>11K</Text>
      </View> */}
    </View>
  );
};

export default AlbumIconDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

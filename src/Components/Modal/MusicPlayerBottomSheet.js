import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Divider from '../Divider/Divider';
import NextSong from '../LibrarySongs/NextSong';
import {useDispatch, useSelector} from 'react-redux';

const MusicPlayerBottomSheet = ({onPress, image, toggleBottomSheet, icon}) => {
  const openMusicPlayer = useSelector((state) => state.openMusicPlayer);
  const {data} = openMusicPlayer;
  return (
    <ImageBackground
      source={{uri: image}}
      blurRadius={90}
      style={[
        {
          // height,
          // backgroundColor: '#1A1A1A',
          zIndex: 200,
          paddingBottom: 20,
        },
      ]}
      style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.8,
          zIndex: 100,
        }}
      />
      {/* <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={{right: 20, left: 20, bottom: 20, top: 20}}
        onPress={() => toggleBottomSheet()}
        style={styles.nextBtn}>
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{right: 20, left: 20, bottom: 20, top: 20}}
          onPress={() => toggleBottomSheet()}>
          <Text style={{color: '#fff', textAlign: 'center', fontSize: 18}}>
            Up Next
          </Text>
        </TouchableOpacity>
        {!icon ? (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{right: 20, left: 20, bottom: 20, top: 20}}
            onPress={() => toggleBottomSheet()}>
            <Icon name="chevron-up" color="#f68126" size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{right: 20, left: 20, bottom: 20, top: 20}}
            onPress={() => toggleBottomSheet()}>
            <Icon name="chevron-down" color="#f68126" size={30} />
          </TouchableOpacity>
        )}
      </TouchableOpacity> */}
      <Divider mb={10} bc="#999" />
      <View style={styles.content}>
        {/* <NextSong /> */}
        <FlatList
          data={data}
          contentContainerStyle={{paddingBottom: 40}}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => <NextSong {...item} index={index} />}
        />
      </View>
    </ImageBackground>
  );
};

export default MusicPlayerBottomSheet;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#1A1A1A',
    zIndex: 200,
    // paddingHorizontal: 20,
  },
  nextBtn: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 13,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 300,
  },
  content: {
    zIndex: 300,
    // marginTop: 10,
  },
});

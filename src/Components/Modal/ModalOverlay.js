import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const ModalOverlay = () => {
  const [show, setShow] = useState(false);
  const openMusicPlayer = useSelector((state) => state.openMusicPlayer);
  const {isMusicPlayerOpen} = openMusicPlayer;
  const openSongBottomSheet = useSelector((state) => state.openSongBottomSheet);
  const {isSongBottomSheetOpen} = openSongBottomSheet;
  const openNotificationFilter = useSelector(
    (state) => state.openNotificationFilter,
  );
  const {isNotificationFilterOpen} = openNotificationFilter;

  // let views;
  // if (isSongBottomSheetOpen) {
  //   views = <View style={styles.container}></View>;
  //   return views;
  // }
  // if (!isNotificationFilterOpen) {
  //   views = <View></View>;
  //   return views;
  // }
  return <View ></View>;
  // return ;
};

export default ModalOverlay;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    zIndex: 200,
    backgroundColor: '#000',
    opacity: 0.7,
  },
});

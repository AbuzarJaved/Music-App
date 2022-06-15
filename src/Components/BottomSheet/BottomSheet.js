import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheetContent from '../../screens/AlbumScreen/component/AlbumBottomSheet/BottomSheet';

const BottomSheets = () => {
  
  if (!isSongBottomSheetOpen) {
    return null;
  }
  const openSongBottomSheet = useSelector((state) => state.openSongBottomSheet);
  const {ref,isSongBottomSheetOpen} = openSongBottomSheet;
  // REF FRO BOTTOM SHEET
  const Bs = ref;

  const fall = new Animated.Value(1);


  const renderView = <BottomSheetContent onPress={Bs} />;

  return (
    <BottomSheet
      ref={Bs}
      snapPoints={[350, 0]}
      initialSnap={1}
      callbackNode={fall}
      enabledGestureInteraction={true}
      borderRadius={10}
      renderContent={renderView}
    />
  );
};

export default BottomSheets;

const styles = StyleSheet.create({});

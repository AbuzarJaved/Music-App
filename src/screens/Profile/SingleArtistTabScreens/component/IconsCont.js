import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShareIcon from '../../../../Components/Icons/ShareIcon';
import {openSongBottomSheetView} from '../../../../redux/actions/songBottomSheetAction';
import {useDispatch, useSelector} from 'react-redux';

const IconsCont = () => {
  const dispatch = useDispatch();
  const title = 'Shine on you crazy Diamond ft Bassey Judith';
  const openBottomSheet = () => {
    dispatch(openSongBottomSheetView({title}));
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   width: '100%',
        }}>
        {/* SINGLE ICON */}
        <TouchableOpacity activeOpacity={0.6} style={{marginRight: 20}}>
          <Icon name="heart" size={20} color="#999" />
          {/* <Text style={{color: '#ddd', fontSize: 13}}>15K</Text> */}
        </TouchableOpacity>

        {/* SINGLE ICON */}
        <TouchableOpacity activeOpacity={0.6} style={{marginRight: 20}}>
          <Icon name="chatbubble" size={20} color="#999" />
          {/* <Text style={{color: '#ddd', fontSize: 13}}>5K</Text> */}
        </TouchableOpacity>
        {/* SINGLE ICON */}
        <TouchableOpacity activeOpacity={0.6} style={{marginRight: 20}}>
          <ShareIcon color="#999" width={20} height={24} />
          {/* <Text style={{color: '#ddd', fontSize: 13}}>10K</Text> */}
        </TouchableOpacity>
      </View>
      {/* SINGLE ICON */}
      <TouchableOpacity
        onPress={() => openBottomSheet()}
        activeOpacity={0.6}
        style={{}}>
        <Icon name="md-ellipsis-horizontal" size={24} color="#999" />
        {/* <Text style={{color: '#ddd', fontSize: 13}}>11K</Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default IconsCont;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

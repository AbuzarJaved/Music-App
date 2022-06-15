import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, ScaledSheet} from 'react-native-size-matters';

const MainMusicPlayerHeader = props => {
  const closeModal = () => {
    console.log('MODAL CLOSED');
    props.closeModalPlayer();
  };
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
        position: 'absolute',
        top: scale(30),
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        onPress={() => {
          closeModal();
        }}>
        <Icon name="chevron-down" size={scale(24)} color="#F68128" />
      </TouchableOpacity>
      <View style={{marginTop: 5}}>
        <Text
          numberOfLines={1}
          style={{
            color: '#F68128',
            fontSize: scale(10),
            alignSelf: 'center',
            fontFamily: 'Helvetica-ExtraBold',
          }}>
          {props.title}&nbsp;
          {props.featured && <Text>{`ft (${props.featured})`}</Text>}
        </Text>
        <Text
          style={{
            color: '#FFF',
            fontSize: scale(8),
            alignSelf: 'center',
            fontFamily: 'Helvetica-ExtraBold',
            marginTop: -5,
          }}>
          {props.artist}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => props.openBottomModal()}
        activeOpacity={0.8}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
        <Icon name="ellipsis-vertical" size={scale(24)} color="#F68128" />
      </TouchableOpacity>
    </View>
  );
};

export default MainMusicPlayerHeader;

const styles = StyleSheet.create({});

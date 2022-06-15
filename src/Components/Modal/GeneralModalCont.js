import React from 'react';
import {StyleSheet, Text, View, Modal as MyModal} from 'react-native';
import Modal from 'react-native-modal';

const GeneralModalCont = (props) => {
  if (props.animate) {
    return (
      <Modal
        animationType="slide"
        swipeDirection="down"
        transparent={true}
        isVisible={props.visible}
        style={{
          flex: 1,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0,
        }}
        onRequestClose={() => props.closeModal()}
        onSwipeComplete={() => props.closeModal()}>
        <View
          style={[
            styles.modalView,
            props.bg
              ? {backgroundColor: props.bg}
              : {backgroundColor: '#1A1A1A'},
          ]}>
          {props.children}
        </View>
      </Modal>
    );
  } else {
    return (
      <MyModal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        style={{
          flex: 1,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0,
        }}
        onRequestClose={() => props.closeModal()}>
        <View
          style={[
            styles.modalView,
            props.bg
              ? {backgroundColor: props.bg}
              : {backgroundColor: '#1A1A1A'},
          ]}>
          {props.children}
        </View>
      </MyModal>
    );
  }
};

export default GeneralModalCont;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',

    height: '100%',
    // top: 0,
    // right: 0,
    // left: 0,
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    // zIndex: 500,
    // padding: 15,
    // flex: 1,
  },
});

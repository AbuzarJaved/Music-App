import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';

const SmallSuccessPopUpModal = props => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (props.succcessState !== '') {
      setShowModal(true);
    }
    setTimeout(() => {
      setShowModal(false);
      if (props.clearClientsSuccess) {
        props.clearClientsErr();
      } else if (props.clearMessage) {
        props.clearMessage();
      }
    }, 1000);
    return () => clearTimeout(() => {}, 1000);
  }, [props.succcessState]);

  if (!showModal) {
    return null;
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}>
      <View style={styles.modalView}>
        <Text style={{color: '#eee', fontSize: 12}}>{props.children}</Text>
      </View>
    </Modal>
  );
};

export default SmallSuccessPopUpModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    top: '5%',
    width: '90%',
    backgroundColor: '#4BB543',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5%',
    borderRadius: 20,
  },
});

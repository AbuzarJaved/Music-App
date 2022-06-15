import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';

const SmallPopUpModal = props => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true);
    console.log('onnnnnnnn');
    setTimeout(() => {
      setShowModal(false);
      console.log('offffffff');
    }, 500);
    return () => clearTimeout(() => {}, 500);
  }, []);

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
        <Text style={{color: '#eee', fontSize: 10}}>{props.children}</Text>
      </View>
    </Modal>
  );
};

export default SmallPopUpModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: '10%',
    width: '25%',
    backgroundColor: '#F68128',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4%',
    borderRadius: 20,
    zIndex: 1000,
  },
});

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';

const SmallErrorPopUpModal = props => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(false);
    if (props.errorState !== '' || props.errorState !== null) {
      setShowModal(true);
    }
    let timer = setTimeout(
      () => {
        if (props.clearError) {
          setShowModal(false);
          props.clearError();
        }
        setShowModal(false);
      },
      props.clearTime ? props.clearTime : 500,
    );
    return () => clearTimeout(timer);
  }, [props.errorState]);

  if (props.errorState === '' || props.errorState === null) {
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

export default SmallErrorPopUpModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    top: '7%',
    width: '90%',
    backgroundColor: '#ff3333',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '7%',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 500,
  },
});

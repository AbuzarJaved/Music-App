import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';

const SmallSuccessPopUpModal = props => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(false);
    if (props.successState !== '' || props.successState !== null) {
      setShowModal(true);
    }
    let timer = setTimeout(
      () => {
        // setShowModal(false);
        // if (props.clearClientsErr) {
        //   props.clearClientsErr();
        //   setShowModal(false);
        // } else
        if (props.clearSuccess) {
          setShowModal(false);
          props.clearSuccess();
        }
        setShowModal(false);
      },
      props.clearTime ? props.clearTime : 500,
    );
    return () => clearTimeout(timer);
  }, [props.successState]);

  if (props.successState === '' || props.successState === null) {
    return null;
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}>
      <View style={styles.modalView}>
        <Text
          style={{color: '#eee', fontSize: 12, fontFamily: 'Helvetica-Medium'}}>
          {props.children}
        </Text>
      </View>
    </Modal>
  );
};

export default SmallSuccessPopUpModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    top: '7%',
    width: '90%',
    backgroundColor: '#4BB543',
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

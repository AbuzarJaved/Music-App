import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';

const SaveModal = (props) => {
  const cancelFunc = () => {
    props.closeModal();
  };
  const discardFunc = () => {
    props.closeModal();
    props.discard();
  };

  const btn = [
    {title: 'CANCEL', onPress: () => cancelFunc(), id: '1'},
    {title: 'DISCARD', onPress: () => discardFunc(), id: '2'},
  ];
  const btnView = btn.map((item) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => item.onPress()}
      key={item.id}>
      <Text style={styles.singleBtn}>{item.title}</Text>
    </TouchableOpacity>
  ));
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={() => props.closeModal()}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Edit profile</Text>
        <Text style={styles.title2}>Discard Changes?</Text>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
          {btnView}
        </View>
      </View>
    </Modal>
  );
};

export default SaveModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: '50%',
    width: '70%',
    backgroundColor: '#1A1A1A',
    height: '25%',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 20,
  },
  title: {
    color: '#F68128',
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'Helvetica-Bold',
  },
  title2: {
    color: '#fff',
    fontSize: 20,
    textTransform: 'capitalize',
    marginTop: 5,
    fontFamily: 'Helvetica-Bold',
  },
  singleBtn: {
    color: '#fff',
    fontSize: 16,
    marginRight: 20,
    marginTop: 50,
    fontFamily: 'Helvetica-Medium',
  },
});

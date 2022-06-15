import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import UploadIcon from '../../Components/Icons/UploadIcon';
import EditUserIcon from '../../Components/Icons/EditUserIcon';
import {useNavigation} from '@react-navigation/native';

const ProfileModal = ({closeModal, onPress, bottomModal}) => {
  const navigation = useNavigation();
  // UPLOAD NAVIGATION
  const func = () => {
    navigation.navigate('Upload');
    closeModal();
  };

  const func2 = () => {
    navigation.navigate('Edit_Profile');
    closeModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={bottomModal}
      onRequestClose={() => closeModal()}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={() => closeModal()}>
          <View style={styles.bar}></View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => func()}>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <UploadIcon color="#99999F" />
            <Text
              style={{
                marginLeft: 15,
                alignSelf: 'center',
                color: '#99999F',
                fontSize: 15,
                fontFamily: 'Gilory-Bold',
              }}>
              Upload Song
            </Text>
          </View>
        </TouchableOpacity>
        {/* EDIT USER PROFILE */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => func2()}>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <EditUserIcon color="#99999F" width={20} height={20} />
            <Text
              style={{
                marginLeft: 15,
                alignSelf: 'center',
                color: '#99999F',
                fontSize: 15,
                fontFamily: 'Gilory-Bold',
              }}>
              Edit Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  bar: {
    width: 100,
    height: 8,
    backgroundColor: '#f68128',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor: '#000',
    height: '20%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    zIndex: 500,
    backgroundColor: '#1A1A1A',

    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// ICONS
import Icon from 'react-native-vector-icons/Ionicons';

const LanguageModal = ({
  language,
  closeModal,
  openModal,
  changeLanguage,
  languageModal,
}) => {
  const arr2 = [
    {title: 'English'},
    {title: 'French'},
    {title: 'German'},
    {title: 'Spanish'},
    {
      title: 'Mandarin',
    },
  ];

  const userLanguageChange = (val) => {
    changeLanguage(val);
    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={languageModal}
      onRequestClose={() => closeModal()}>
      <View style={styles.modalView}>
        <View
          style={{
            //   backgroundColor: '#1A1A1A',
            height: '100%',
            paddingHorizontal: 20,
            paddingTop: 20,
            position: 'relative',
          }}>
          <TouchableOpacity
            onPress={() => closeModal()}
            hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}>
            <View style={styles.bar}></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => closeModal()}
            style={styles.closeModalIcon}
            hitSlop={{top: 30, right: 30, left: 30, bottom: 30}}>
            <Icon name="close-circle-outline" size={36} color="#f68128" />
          </TouchableOpacity>
          <View style={{marginTop: 10}}>
            <FlatList
              data={arr2}
              keyExtractor={(item) => item.title}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => userLanguageChange(item.title)}>
                    <Text
                      style={{
                        color: '#ddd',
                        marginTop: 3,
                        marginLeft: 10,
                        fontSize: 15,
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '40%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bar: {
    width: 100,
    height: 8,
    backgroundColor: '#f68128',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
  closeModalIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  filterText: {
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
    color: '#f68128',
    marginBottom: 10,
  },
});

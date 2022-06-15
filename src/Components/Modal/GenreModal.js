import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginBtn from '../Button/LoginBtn';
import CustomCheckBox from '../Checkbox/CustomCheckBox';
import Divider from '../Divider/Divider';
import {useDispatch, useSelector} from 'react-redux';

import LoadingAnime from '../Animations/Small_LoadingAnime';

const GenreModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.genreModal}
      onRequestClose={() => props.closeGenreModal()}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <View></View>
          <Text style={styles.text}>Select your State</Text>
          <TouchableOpacity
            onPress={() => props.closeGenreModal()}
            activeOpacity={0.8}>
            <Icon name="close" color="#f68128" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}>
          <Divider />
        </View>
        <View style={styles.genreCont}>
          {props.data && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={props.data}
              keyExtractor={item => item.name}
              renderItem={({item, index}) => (
                <CustomCheckBox
                  {...item}
                  key={item.name}
                  artistState={props.artistState}
                  chooseState={val => props.chooseState(val)}
                  closeModal={props.closeGenreModal}
                />
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default GenreModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '100%',
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  text: {
    color: '#f68128',
    fontSize: 18,
    textAlign: 'center',
  },
  divider: {
    marginTop: 10,
  },
  genreCont: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  loading: {
    width: '100%',
    alignItems: 'center',
  },
});

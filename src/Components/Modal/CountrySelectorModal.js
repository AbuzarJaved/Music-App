import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {callingCodes} from '../../data5';
import Icon from 'react-native-vector-icons/Ionicons';
import SingleCountry from './components/CountrySelectorComp';

const CountrySelectorModal = props => {
  const [searchValue, setSearchValue] = useState('');

  const filterCountryData = val => {
    if (val !== '') {
      const filtered = callingCodes.filter(
        item => item.name?.toLowerCase().indexOf(val.toLowerCase()) >= 0,
      );
      return filtered;
    } else {
      return callingCodes;
    }
  };

  const chooseData = (val, val1, val2) => {
    props.chooseCountry(val);
    props.chooseCallingCode(val1);
    props.chooseCountryShortCode(val2);
    props.closeCountryModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.countryModal}
      onRequestClose={() => props.closeCountryModal()}>
      <View style={styles.modalView}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <TouchableOpacity
            onPress={() => props.closeCountryModal()}
            activeOpacity={0.8}>
            <Icon name="close" color="#ddd" size={28} />
          </TouchableOpacity>
          <TextInput
            style={{
              backgroundColor: 'transparent',
              color: '#ddd',
              width: '80%',
              paddingLeft: 15,
            }}
            placeholder="Enter your country name"
            placeholderTextColor="#ddd"
            value={searchValue}
            onChangeText={val => setSearchValue(val)}
          />
        </View>
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          data={filterCountryData(searchValue)}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <SingleCountry
              onPress={() => chooseData(item.name, item.dial_code, item.code)}
              {...item}
            />
          )}
        />
      </View>
    </Modal>
  );
};

export default CountrySelectorModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MyDarkView = (props) => {
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [countryCode, setCountryCode] = useState(String(props.userCountry));
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [myCallingCode, setMyCallingCode] = useState('1');

  const selectCallingCode = (val) => {
    setMyCallingCode(val);
  };

  const onSelect = (country) => {
    // console.log(country.callingCode[0], 'Calling code');
    // props.changeCountryCode(country.callingCode[0]);
    // props.changeCountryShortCode(country.cca2);
    props.changeCountry(country.cca2);
    selectCallingCode(country.callingCode[0]);
    setCountryCode(country.cca2);
    setCountry(country);
    props.chooseCountry(country.name)
    // props.changeCountry(country.name);
    console.log(country, 'COUNTRY');
  };
  const {userCountry} = props;
  const phoneRef = useRef('phone');
  //   const countryRef = useRef('countryPicker');
  //   console.log(countryRef);
  return (
    <View
      style={{
        position: 'relative',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 20,
        }}>
        <TextInput
          placeholder="country"
          placeholderTextColor="#484848"
          value={props.userCountry}
          onChangeText={(val) => props.onChangeText(val)}
          style={{color: '#fff', width: '70%'}}
        />
        <CountryPicker
          theme={DARK_THEME}
          {...{
            countryCode,
            withFilter,
            withFlag,
            withCountryNameButton,
            withAlphaFilter,
            withCallingCode,
            withEmoji,
            onSelect,
          }}
          visible={props.showCountryModal}
        />
      </View>
    </View>
  );
};

export default MyDarkView;

const styles = StyleSheet.create({
  inputIcon: {
    position: 'absolute',
    // top: 5,
    right: 0,
    color: '#f68126',
  },
});

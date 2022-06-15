import React, {useState, useRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {set} from 'react-native-reanimated';

const MyDarkView = props => {
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [myCallingCode, setMyCallingCode] = useState(props.userCallingCode);

  const selectCallingCode = val => {
    setMyCallingCode(val);
  };
  const onSelect = country => {
    props.changeCountryCode(country.callingCode[0]);
    props.changeCountryShortCode(country.cca2);
    selectCallingCode(country.callingCode[0]);
    setCountryCode(country.cca2);
    setCountry(country);
    props.changeCountry(country.name);
    setShowCountryModal(false);
  };

  const phoneRef = useRef('phone');
  let callingView = null;
  if (props.userCallingCode) {
    callingView = (
      <Text style={{color: '#f68128', fontSize: 13}}>
        {props.userCallingCode}
      </Text>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => setShowCountryModal(!showCountryModal)}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CountryPicker
        theme={DARK_THEME}
        {...{
          countryCode: props.countryShortCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible={showCountryModal}
      />
      {callingView}
    </TouchableOpacity>
  );
};

export default MyDarkView;

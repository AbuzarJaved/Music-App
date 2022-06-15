import React, {useState, useRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

const MyDarkView = props => {
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [countryCode, setCountryCode] = useState(props.countryValue);
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [myCallingCode, setMyCallingCode] = useState('1');

  const storeUserLocation = useSelector(state => state.storeUserLocation);

  // const {
  //   city,
  //   state,
  //   country: userCountry,
  //   countryCode: userCountryCode,
  // } = storeUserLocation;
  // console.log(props.userArea.country,'FROM SELECTOR');

  const selectCallingCode = val => {
    setMyCallingCode(val);
  };
  const onSelect = country => {
    props.changeCountryCode(country.cca2);
    props.changeCountry(country.name);
    selectCallingCode(country.callingCode[0]);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const phoneRef = useRef('phone');
  //   const countryRef = useRef('countryPicker');
  //   console.log(countryRef);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => setShowCountryModal(!showCountryModal)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 40,
      }}>
      <CountryPicker
        theme={DARK_THEME}
        {...{
          countryCode: props.countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          //   withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible={showCountryModal}
      />
      {props.countryCode && (
        <Text style={{color: '#999', fontSize: 15}}>{props.countryValue}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MyDarkView;

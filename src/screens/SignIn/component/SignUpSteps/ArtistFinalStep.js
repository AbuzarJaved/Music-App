import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyDarkView from '../countrySelector';
import LoginBtn from '../../../../Components/Button/LoginBtn';

import {useNavigation, useFocusEffect} from '@react-navigation/native';

const ArtsitFinalStep = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation();

  const togglePassword = () => {
    setVisible(!visible);
    setShowPassword(!showPassword);
  };

  const otp = () => {
    navigation.navigate('EmailVerification');
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inputFlex}>
          {/* ADDRESS */}
          <TouchableOpacity
            onPress={() => props.openCountryModal()}
            activeOpacity={0.8}
            style={
              props.address === 'United States'
                ? {width: '48%'}
                : {width: '100%'}
            }>
            <Text style={styles.label}>Country:</Text>
            <View style={styles.textInput}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#fff',
                  fontSize: 12,
                  paddingLeft: 4,
                }}>
                {props.address}
              </Text>
              <Icon
                name="chevron-down"
                size={18}
                style={[styles.inputIcon, {color: '#999'}]}
              />
            </View>
          </TouchableOpacity>

          {/* CITY */}
          {props.address === 'United States' && (
            <TouchableOpacity
              onPress={() => props.openGenreModal()}
              activeOpacity={0.8}
              style={{width: '48%'}}>
              <Text style={styles.label}>State:</Text>
              <View style={styles.textInput}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#fff',
                    fontSize: 12,
                    paddingLeft: 4,
                  }}>
                  {props.city}
                </Text>
                <Icon
                  name="chevron-down"
                  size={18}
                  style={[styles.inputIcon, {color: '#999'}]}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{width: '100%'}}>
          <Text style={styles.label}>Phone Number:</Text>
          <View style={styles.textInput}>
            <View style={styles.countryStyle}>
              <MyDarkView
                changeCountryCode={val => props.changeCountryCode(val)}
                countryShortCode={props.countryShortCode}
                userCallingCode={props.countryCode}
                changeCountryShortCode={val =>
                  props.changeCountryShortCode(val)
                }
                changeCountry={val => props.onChangeAddress(val)}
              />
            </View>
            <TextInput
              placeholder="phoneNumber"
              placeholderTextColor="#484848"
              value={props.bookingNumber}
              onChangeText={props.onChangeBookingNumber}
              style={{color: '#fff', width: '100%'}}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* PASSWORD INPUT */}
        <View style={{width: '100%'}}>
          <Text style={styles.label}>Password:</Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="password"
              secureTextEntry={visible}
              placeholderTextColor="#484848"
              value={props.password}
              onChangeText={props.onChangePassword}
              textContentType={!showPassword ? 'name' : 'password'}
              style={{color: '#fff', width: '100%'}}
            />
            {!showPassword ? (
              <Icon
                name="eye-slash"
                size={18}
                style={styles.inputIcon}
                onPress={togglePassword}
              />
            ) : (
              <Icon
                name="eye"
                size={18}
                style={styles.inputIcon}
                onPress={togglePassword}
              />
            )}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <LoginBtn
            title="Back"
            height={40}
            width="30%"
            textSize={12}
            onPress={props.changePage}
          />
          <LoginBtn
            title="Sign Up"
            height={42}
            width="30%"
            textSize={12}
            // onPress={() => otp()}
            onPress={props.submitForm}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ArtsitFinalStep;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputFlex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderColor: '#161616',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    paddingLeft: 5,
    fontFamily: 'Gilroy-light',
    backgroundColor: '#161616',
    textTransform: 'uppercase',
    position: 'relative',
    height: 50,
    marginBottom: 10,
  },
  label: {
    color: '#D3D3D3',
    paddingHorizontal: 5,
    marginVertical: 5,
    fontFamily: 'Gilroy-light',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  inputIcon: {
    position: 'absolute',
    top: 14,
    right: 20,
    color: '#f68126',
  },
  countryStyle: {
    justifyContent: 'center',
    marginRight: 10,
  },
  or: {
    color: '#fff',
    marginTop: '2%',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: '3%',
  },
  icons: {
    width: '100%',
    alignItems: 'center',
  },
  otherContent: {
    width: '100%',
    // bottom: 20,
  },
  inputFlex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

// {
//   props.address === 'United States' && (
//     <TouchableOpacity
//       onPress={props.openGenreModal}
//       activeOpacity={0.8}
//       style={{width: '48%'}}>
//       <Text style={styles.label}>State:</Text>
//       <View style={styles.textInput}>
//         <Text
//           style={{
//             alignSelf: 'center',
//             color: '#fff',
//             fontSize: 13,
//             paddingLeft: 4,
//           }}>
//           {props.city}
//         </Text>
//         <Icon
//           name="chevron-down"
//           size={18}
//           style={[styles.inputIcon, {color: '#999'}]}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// }

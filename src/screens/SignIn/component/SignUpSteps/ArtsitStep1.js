import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LoginBtn from '../../../../Components/Button/LoginBtn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from '../../../../Components/IconsContainer/Icons';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import DatePicker from '../../component/DatePickerModal';

const ArtsitStep1 = (props) => {
  const customerType = useSelector((state) => state.customerType);
  const {isArtist} = customerType;

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inputFlex}>
          {/* FIRST NAME */}
          <View style={{width: '48%'}}>
            <Text style={styles.label}>First Name:</Text>
            <View style={styles.textInput}>
              <TextInput
                placeholder="firstname"
                placeholderTextColor="#484848"
                value={props.firstName}
                onChangeText={props.onChangeFirstName}
                style={{width: '100%', color: '#fff'}}
              />
            </View>
          </View>
          {/* LAST NAME */}
          <View style={{width: '48%'}}>
            <Text style={styles.label}>Last Name:</Text>
            <View style={styles.textInput}>
              <TextInput
                placeholder="lastname"
                placeholderTextColor="#484848"
                value={props.lastName}
                onChangeText={props.onChangeLastName}
                style={{width: '100%', color: '#fff'}}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputFlex}>
          {/* STAGE NAME */}
          <View style={{width: '48%'}}>
            <Text style={styles.label}>
              Username
            </Text>
            <View style={styles.textInput}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#484848"
                value={props.stageName}
                onChangeText={props.onChangeStageName}
                style={{width: '100%', color: '#fff'}}
              />
            </View>
          </View>
          {/* GENRE SELECTION */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.openModal()}
            style={{width: '48%'}}>
            <Text style={styles.label}>Date of birth:</Text>
            <DatePicker
              visible={props.visible}
              closeModal={props.closeModal}
              chooseDateOfBirth={(val) => props.chooseDateOfBirth(val)}
              dob={props.dob}
              openModal={props.openModal}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%'}}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="emailAddress"
              placeholderTextColor="#484848"
              value={props.emailAddress}
              keyboardType="email-address"
              onChangeText={props.onChangeEmailAddress}
              style={{width: '100%', color: '#fff'}}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            marginTop: 10,
          }}>
          <LoginBtn
            title="Next"
            height={42}
            width="30%"
            onPress={() => props.changePage()}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ArtsitStep1;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    alignItems: 'center',
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
  inputFlex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputIcon: {
    position: 'absolute',
    top: 14,
    right: 20,
    color: '#f68126',
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
    bottom: 0,
  },
});

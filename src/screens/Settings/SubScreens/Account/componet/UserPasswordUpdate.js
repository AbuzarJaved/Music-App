import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import CommonHeader from '../../../../../Components/CustomHeader/CommonHeader';
import LoginBtn from '../../../../../Components/Button/LoginBtn';
import MainErrorPopUp from '../../../../../Components/Modal/MainErrorPopUp';
import MainSuccessPopUp from '../../../../../Components/Modal/MainSuccessPopUp';
import {useDispatch, useSelector} from 'react-redux';
import {CLEAR_UPDATE_USER_PASSWORD_STATE} from '../../../../../redux/constants/index';
import {update_User_Password_Profile} from '../../../../../redux/actions/userActions';
import LoadingAnime from '../../../../../Components/Loading/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';

const UserPasswordUpdate = (props) => {
  const dispatch = useDispatch();
  const updateUserPassword = useSelector(state => state.updateUserPassword);
  const {loading, error, message, status} = updateUserPassword;
  const [credential, setCredential] = useState('');
  const [confirmCredentail, setConfirmCredential] = useState();
  const [showCredentials, setShowCredentials] = useState(false);
  const [clientPasswordErr, setClientPasswordErr] = useState('');
  const [showConfirmCredentials, setShowConfirmCredentials] = useState(false);
  const [visible, setVisible] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(true);
  const togglePassword = () => {
    setVisible(!visible);
    setShowCredentials(!showCredentials);
  };
  const toggleConfirmPassword = () => {
    setConfirmVisible(!confirmVisible);
    setShowConfirmCredentials(!showConfirmCredentials);
  };

  const submit = () => {
    if (credential === '' || confirmCredentail === '') {
      setClientPasswordErr('Both password field are required');
    } else if (credential !== confirmCredentail) {
      setClientPasswordErr('One of the passwords is incorrect. Please check');
    } else {
      dispatch(update_User_Password_Profile(credential, confirmCredentail));
      setConfirmCredential('');
      setCredential('');
      setClientPasswordErr('');
    }
  };

  useEffect(() => {
    if (status && status === true)
      //   setTimeout(() => {
      props.closeModal();
    //   }, 2000);
  }, [status]);
  return (
    <View style={styles.container}>
      <CommonHeader title="Update Username" func={() => props.closeModal()} />
      {loading && <LoadingAnime width={60} height={60} />}
      <MainErrorPopUp
        clearTime={1500}
        errorState={clientPasswordErr}
        clearError={() => setClientPasswordErr('')}>
        {clientPasswordErr}
      </MainErrorPopUp>
      <MainErrorPopUp
        clearTime={2000}
        errorState={error}
        clearError={() => dispatch({type: CLEAR_UPDATE_USER_PASSWORD_STATE})}>
        {error}
      </MainErrorPopUp>
      <MainSuccessPopUp
        clearSuccess={() => dispatch({type: CLEAR_UPDATE_USER_PASSWORD_STATE})}
        successState={message}
        clearTime={1500}>
        {message}
      </MainSuccessPopUp>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        <View style={{width: '100%', marginBottom: 10}}>
          <Text style={styles.label}>New Password:</Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="New password"
              secureTextEntry={visible}
              placeholderTextColor="#484848"
              onFocus={() => setClientPasswordErr('')}
              value={credential}
              onChangeText={val => setCredential(val)}
              textContentType={!showCredentials ? 'name' : 'password'}
              style={{color: '#fff', width: '100%'}}
            />
            {!showCredentials ? (
              <Icon
                name="eye-slash"
                size={20}
                style={styles.inputIcon}
                onPress={togglePassword}
              />
            ) : (
              <Icon
                name="eye"
                size={20}
                style={styles.inputIcon}
                onPress={togglePassword}
              />
            )}
          </View>
        </View>
        {/* CONFIRN PASSWORD */}
        <View style={{width: '100%', marginBottom: scale(30)}}>
          <Text style={styles.label}>Confirm Password:</Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Confirm password"
              secureTextEntry={confirmVisible}
              placeholderTextColor="#484848"
              onFocus={() => setClientPasswordErr('')}
              value={confirmCredentail}
              onChangeText={val => setConfirmCredential(val)}
              textContentType={!showConfirmCredentials ? 'name' : 'password'}
              style={{color: '#fff', width: '100%'}}
            />
            {!showConfirmCredentials ? (
              <Icon
                name="eye-slash"
                size={20}
                style={styles.inputIcon}
                onPress={toggleConfirmPassword}
              />
            ) : (
              <Icon
                name="eye"
                size={20}
                style={styles.inputIcon}
                onPress={toggleConfirmPassword}
              />
            )}
          </View>
        </View>
        <LoginBtn title="Update" onPress={() => submit()} />
      </View>
    </View>
  );
};

export default UserPasswordUpdate;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  textInput: {
    borderColor: '#161616',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    padding: 5,
    fontFamily: 'Helvetica-Medium',
    backgroundColor: '#161616',
    position: 'relative',
    height: 50,
    marginBottom: 10,
  },
  label: {
    color: '#D3D3D3',
    paddingHorizontal: 5,
    marginVertical: 5,
    fontFamily: 'Helvetica-Medium',
    alignSelf: 'flex-start',
    fontSize: '15@s',
    letterSpacing: 0.5,
  },
  inputIcon: {
    position: 'absolute',
    top: 14,
    right: 20,
    color: '#f68126',
  },
});

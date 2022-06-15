import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import CommonHeader from '../../../../../Components/CustomHeader/CommonHeader';
import LoginBtn from '../../../../../Components/Button/LoginBtn';
import MainErrorPopUp from '../../../../../Components/Modal/MainErrorPopUp';
import MainSuccessPopUp from '../../../../../Components/Modal/MainSuccessPopUp';
import {useDispatch, useSelector} from 'react-redux';
import {CLEAR_UPDATE_USER_USERNAME_STATE} from '../../../../../redux/constants/index';
import {
  update_User_Profile,
  update_User_Username_Profile,
} from '../../../../../redux/actions/userActions';
import LoadingAnime from '../../../../../Components/Loading/Loading';

const UsernameUpdateCont = props => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [clientErr, setClientErr] = useState('');
  const updateUserUsername = useSelector(state => state.updateUserUsername);
  const {loading, error, message, status} = updateUserUsername;
  const submit = () => {
    if (username === '') {
      setClientErr('Username field is required ');
    } else {
      dispatch(update_User_Username_Profile(username));
      setUsername('');
      setClientErr('');
    }
  };

  useEffect(() => {
    if (status && status === true)
      //   setTimeout(() => {
      props.closeUsernameModal();
    //   }, 2000);
  }, [status]);

  return (
    <View style={styles.container}>
      <CommonHeader
        title="Update Username"
        func={() => props.closeUsernameModal()}
      />
      {loading && <LoadingAnime width={60} height={60} />}
      <MainErrorPopUp
        clearTime={1500}
        errorState={clientErr}
        clearError={() => setClientErr('')}>
        {clientErr}
      </MainErrorPopUp>
      <MainErrorPopUp
        clearTime={2000}
        errorState={error}
        clearError={() => dispatch({type: CLEAR_UPDATE_USER_USERNAME_STATE})}>
        {error}
      </MainErrorPopUp>
      <MainSuccessPopUp
        clearSuccess={() => dispatch({type: CLEAR_UPDATE_USER_USERNAME_STATE})}
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
        <View style={{width: '100%', marginBottom: scale(30)}}>
          <Text style={styles.label}>New username</Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="New username"
              placeholderTextColor="#484848"
              value={username}
              onChangeText={val => setUsername(val)}
              onFocus={() => setClientErr('')}
              style={{color: '#fff', width: '100%'}}
            />
          </View>
        </View>
        <LoginBtn title="Update" onPress={() => submit()} />
      </View>
    </View>
  );
};

export default UsernameUpdateCont;

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
});

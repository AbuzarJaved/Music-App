import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import CommonHeader from '../../Profile/component/ProfileHeader';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {reset_Forget_Password} from '../../../redux/actions/OtpActions/index';
import LoadingAnime from '../../../Components/Loading/Loading';
import {useSelector, useDispatch} from 'react-redux';
import LoginBtn from '../../../Components/Button/LoginBtn';
import {get_Access_Token} from '../../../redux/actions/userActions';
import MainErrorPopUp from '../../../Components/Modal/MainErrorPopUp';
import MainSuccessPopUp from '../../../Components/Modal/MainSuccessPopUp';
import {CLEAR_ACCESS_TOKEN, CLEAR_ERROR} from '../../../redux/constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');

const ResetPassword = ({navigation}) => {
  const inputLength = 6;
  const dispatch = useDispatch();
  let textInput = useRef(null);
  const [otp, setOtp] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);
  const onChangeOtp = val => {
    setOtp(val);
  };
  useEffect(() => {
    textInput.current.focus();
  }, []);
  useEffect(() => {
    dispatch({type: CLEAR_ERROR});
  }, []);
  const getAccessToken = useSelector(state => state.getAccessToken);
  const {
    loading: accessTokenLoading,
    error: accessTokenError,
    accessToken,
  } = getAccessToken;

  const resetForgetPassword = useSelector(state => state.resetForgetPassword);
  const {loading, error, status, message} = resetForgetPassword;

  useEffect(() => {
    if (accessToken && accessToken !== '') {
      dispatch(
        reset_Forget_Password(
          otp,
          newPassword,
          confirmPassword,
          oldPassword,
          accessToken,
        ),
      );
    }
  }, [accessToken]);
  useEffect(() => {
    if (status && status === true) {
      setOtp('');
      setConfirmPassword('');
      setOldPassword('');
      setNewPassword('');
      dispatch({type: CLEAR_ACCESS_TOKEN});
      setTimeout(() => {
        navigation.navigate('Login');
      }, 4000);
    }
    return () => clearTimeout();
  }, [status]);

  const resetPassword = () => {
    if (confirmPassword === '' || newPassword === '' || oldPassword === '') {
      setPasswordErr('All password field are required');
    } else if (otp.length <= 0) {
      setPasswordErr('Please input the recovery code sent your mail.');
    } else if (oldPassword === newPassword) {
      setPasswordErr(
        'Please choose a different password from your old password',
      );
    } else if (newPassword !== confirmPassword) {
      setPasswordErr("New password and confirm password doesn't match");
    } else if (newPassword.length <= 7) {
      setPasswordErr('Password should be atleast more than 8 digit');
    } else {
      dispatch(get_Access_Token());
    }
  };
  let mainView = null;

  if (accessTokenLoading || loading) {
    mainView = <LoadingAnime width={60} height={60} />;
  } else if (accessTokenError) {
    mainView = (
      <MainErrorPopUp
        clearError={() => dispatch({type: CLEAR_ACCESS_TOKEN})}
        clearTime={3000}
        errorState={accessTokenError}>
        {accessTokenError}
      </MainErrorPopUp>
    );
  } else if (error) {
    mainView = (
      <MainErrorPopUp
        clearError={() => dispatch({type: CLEAR_ERROR})}
        clearTime={3000}
        errorState={error}>
        {error}
      </MainErrorPopUp>
    );
  } else if (message) {
    mainView = (
      <MainSuccessPopUp
        clearSuccess={() => dispatch({type: CLEAR_ERROR})}
        clearTime={3000}
        successState={message}>
        {message}
      </MainSuccessPopUp>
    );
  } else if (passwordErr) {
    mainView = (
      <MainErrorPopUp
        clearError={() => setPasswordErr('')}
        clearTime={3000}
        errorState={passwordErr}>
        {passwordErr}
      </MainErrorPopUp>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View style={styles.container}>
        {mainView}
        <CommonHeader title="Reset Password" />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.headerText}>
              Enter your recovery code and reset your password
            </Text>
            <View style={styles.content}>
              <TextInput
                ref={textInput}
                keyboardType="numeric"
                style={[
                  styles.input,
                  focusedInput === true
                    ? {
                        borderBottomColor: '#F68128',
                      }
                    : {borderBottomColor: '#999'},
                ]}
                onFocus={() => setFocusedInput(true)}
                secureTextEntry={false}
                maxLength={inputLength}
                value={otp}
                onChangeText={val => onChangeOtp(val)}
                returnKeyType="done"
              />
              {/* OLD PASSWORD */}
              <View style={{width: '100%', marginBottom: scale(20)}}>
                <Text style={styles.label}>Old Password</Text>
                <View style={styles.textInput}>
                  <TextInput
                    placeholder="Old Password"
                    placeholderTextColor="#484848"
                    value={oldPassword}
                    onChangeText={val => setOldPassword(val)}
                    //   onFocus={() => setClientErr('')}
                    style={{color: '#fff', width: '100%'}}
                  />
                </View>
              </View>
              {/* NEW PASSWORD */}
              <View style={{width: '100%', marginBottom: scale(20)}}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.textInput}>
                  <TextInput
                    placeholder="New Password"
                    placeholderTextColor="#484848"
                    value={newPassword}
                    onChangeText={val => setNewPassword(val)}
                    //   onFocus={() => setClientErr('')}
                    style={{color: '#fff', width: '100%'}}
                  />
                </View>
              </View>
              {/* CONFIRM NEW PASSWORD */}
              <View style={{width: '100%', marginBottom: scale(20)}}>
                <Text style={styles.label}>Confirm new Password</Text>
                <View style={styles.textInput}>
                  <TextInput
                    placeholder="Confirm new Password"
                    placeholderTextColor="#484848"
                    value={confirmPassword}
                    onChangeText={val => setConfirmPassword(val)}
                    //   onFocus={() => setClientErr('')}
                    style={{color: '#fff', width: '100%'}}
                  />
                </View>
              </View>

              <View style={{width: '100%', marginTop: scale(20)}}>
                <LoginBtn
                  title="Reset password"
                  onPress={() => resetPassword()}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: '30@s',
    paddingHorizontal: '10@s',
  },
  headerText: {
    fontSize: '13@s',
    textAlign: 'center',
    color: '#ddd',
    fontFamily: 'Helvetica-Bold',
  },
  input: {
    width: '100%',
    color: '#fff',
    fontFamily: 'Helvetica-Medium',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    marginBottom: 20,
    // paddingHorizontal: 10,
    // borderBottomColor: '#f',
  },
  textInput: {
    borderColor: '#161616',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    padding: 5,
    fontFamily: 'Helvetica-Regular',
    backgroundColor: '#161616',
    // textTransform: 'uppercase',
    position: 'relative',
    height: 50,
    marginBottom: 10,
  },
  label: {
    color: '#D3D3D3',
    paddingHorizontal: 5,
    marginVertical: 5,
    fontFamily: 'Helvetica-Regular',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

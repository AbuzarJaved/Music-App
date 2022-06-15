import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  verify_Email,
  resend_Email_Otp,
} from '../../redux/actions/OtpActions/index';
import {login, get_Access_Token} from '../../redux/actions/userActions';
import {
  CLEAR_ACCESS_TOKEN,
  CLEAR_OTP_STATUSES,
  CLEAR_OTP_STATUSES_1,
  CLEAR_OTP_STATUSES_2,
  CLEAR_OTP_STATUSES_3,
} from '../../redux/constants/index';
import {useSelector, useDispatch} from 'react-redux';
import MainSuccessPopUp from '../../Components/Modal/MainSuccessPopUp';
import MainErrorPopUp from '../../Components/Modal/MainErrorPopUp';
import LoadingAnime from '../../Components/Loading/Loading';
import CommonHeader from '../../Components/CustomHeader/CommonHeader';
import Button from '../../Components/Button/LoginBtn';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const EmailOTPScreen = () => {
  const navigation = useNavigation();
  let textInput = useRef(null);
  const [fromResend, setFromResend] = useState(false);
  const [fromVerify, setFromVerify] = useState(false);
  const dispatch = useDispatch();
  const storeUserRegisterData = useSelector(
    state => state.storeUserRegisterData,
  );
  const getAccessToken = useSelector(state => state.getAccessToken);
  const {
    loading: accessTokenLoading,
    error: accessTokenError,
    accessToken,
  } = getAccessToken;
  const resendEmailOtp = useSelector(state => state.resendEmailOtp);

  const verifyEmail = useSelector(state => state.verifyEmail);
  const {userEmail, userPassword} = storeUserRegisterData;
  const userLogin = useSelector(state => state.userLogin);
  const {token} = userLogin;
  const {
    loading: verifyLoading,
    error: verifyError,
    message: verifyMessage,
    status: verifyStatus,
  } = verifyEmail;
  // const {userEmail} = storeUserRegisterData;
  const {
    loading: resendLoading,
    error: resendError,
    message: resendMessage,
    status: resendStatus,
  } = resendEmailOtp;
  const inputLength = 6;
  const [otp, setOtp] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);

  // console.log(otp, 'OTP');
  useEffect(() => {
    if (fromResend === true && accessToken && accessToken !== '') {
      dispatch(resend_Email_Otp(userEmail, accessToken));
    } else if (fromVerify === true && accessToken && accessToken !== '') {
      dispatch(verify_Email(userEmail, otp, accessToken));
    }
  }, [accessToken, fromResend, fromVerify]);

  const resendOtpToEmail = () => {
    setOtp('');
    setFromResend(true);
    setFromVerify(false);
    dispatch(get_Access_Token());
  };

  useEffect(() => {
    textInput.current.focus();
    // textInput.focus();
  }, []);

  const onChangeOtp = val => {
    setOtp(val);
  };
  const resenedMail = () => {
    setOtp('');
    textInput.current.focus();
  };

  useEffect(() => {
    if (otp.length === inputLength) {
      // alert('Done');
      Keyboard.dismiss();
      setFromResend(false);
      setFromVerify(true);
      dispatch(get_Access_Token());
      // setOtp('');
    }
  }, [otp]);
  useEffect(() => {
    dispatch({type: CLEAR_OTP_STATUSES});
    dispatch({type: CLEAR_OTP_STATUSES_1});
    dispatch({type: CLEAR_OTP_STATUSES_2});
    dispatch({type: CLEAR_OTP_STATUSES_3});
  }, []);

  useEffect(() => {
    if (verifyStatus && verifyStatus === true) {
      setFromResend(false);
      setFromVerify(false);
      dispatch(login(userEmail, userPassword));
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    }
    return () => clearTimeout(() => {}, 1000);
  }, [verifyStatus]);

  let mainLoadingView = null;
  let verifyLoadingView = null;
  const clearStatus = () => {
    dispatch({type: CLEAR_OTP_STATUSES});
    dispatch({type: CLEAR_ACCESS_TOKEN});
  };

  if (verifyLoading || resendLoading || accessTokenLoading) {
    mainLoadingView = <LoadingAnime width={60} height={60} />;
  }

  return (
    <View style={styles.container}>
      <MainErrorPopUp
        clearTime={4000}
        errorState={resendError}
        clearError={() => dispatch({type: CLEAR_OTP_STATUSES})}>
        {resendError}
      </MainErrorPopUp>
      <MainErrorPopUp
        clearTime={4000}
        errorState={accessTokenError}
        clearError={() => dispatch({type: CLEAR_ACCESS_TOKEN})}>
        {accessTokenError}
      </MainErrorPopUp>
      <MainErrorPopUp
        clearTime={4000}
        errorState={verifyError}
        clearError={() => dispatch({type: CLEAR_OTP_STATUSES})}>
        {verifyError}
      </MainErrorPopUp>
      <MainSuccessPopUp
        clearTime={4000}
        successState={resendMessage}
        clearSuccess={() => clearStatus()}>
        {resendMessage}
      </MainSuccessPopUp>
      <MainSuccessPopUp
        clearTime={4000}
        successState={verifyMessage}
        clearSuccess={() => clearStatus()}>
        {verifyMessage}
      </MainSuccessPopUp>
      <View style={styles.header}>
        <Text
          style={{
            color: '#fff',
            fontSize: 17,
            width: '80%',
            textAlign: 'center',
            fontFamily: 'Helvetica-Medium',
          }}>
          Email Verification
        </Text>
      </View>
      {mainLoadingView}
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.avoidingView}>
        <Text style={styles.title}>Please input the code sent via email </Text>
        <View style={{width: '100%', alignItems: 'center'}}>
          <TextInput
            ref={textInput}
            // ref={(input) => (textInput = input)}
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
            // style={{width: 0, height: 0}}
            secureTextEntry={false}
            maxLength={inputLength}
            value={otp}
            onChangeText={onChangeOtp}
            returnKeyType="done"
          />
          <View style={styles.resendContainer}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.resendText]}>Skip for now </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => resendOtpToEmail()}>
                <Text style={styles.resendText}>Resend code </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={styles.bottomView}>
          <View style={{width: '100%'}}>
            <View style={{width: '50%', alignSelf: 'center'}}>
              <Button title="Verify mail" />
            </View>
          </View>
        </View> */}
        {/* <View style={styles.btnView}>
          <View style={{width: '50%', alignSelf: 'center'}}>
            <Button title="Verify mail" />
          </View>
        </View>
        <View style={styles.resendContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => resenedMail()}>
            <Text style={styles.resendText}>Resend mail </Text>
          </TouchableOpacity>
        </View> */}
      </KeyboardAvoidingView>
    </View>
  );
};

export default EmailOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 60,
    backgroundColor: '#000',
    height,
    width: '100%',
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
    }),
    // paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#1A1A1A',
    borderWidth: 1,
  },
  avoidingView: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // height,
    // justifyContent: 'center',
  },
  title: {
    color: '#eee',
    fontFamily: 'Helvetica-Medium',
    marginTop: '10%',
    marginBottom: '5%',
    fontSize: 17,
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellView: {
    paddingVertical: 8,
    margin: 5,
    alignItems: 'center',
    width: 40,
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    // borderBottomColor: '#F68128',
  },
  cellText: {
    color: '#fff',
    fontFamily: 'Helvetica-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
  resendContainer: {
    width: '100%',
    // alignItems: 'flex-end',
    flexDirection: 'row',
    marginVertical: '10%',
    // alignSelf: 'flex-end',
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#feee3e',
    paddingVertical: 3,
  },
  resendText: {
    color: '#feee3e',
    fontFamily: 'Helvetica-Medium',
    fontSize: 13,
  },
  btnView: {
    width: '100%',
    alignSelf: 'center',
    marginTop: '50%',
    // position: 'absolute',
    // bottom: '30%',
  },
  bottomView: {
    flex: 1,
    marginBottom: '20%',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    color: '#fff',
    fontFamily: 'Helvetica-Medium',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    // paddingHorizontal: 10,
    // borderBottomColor: '#f',
  },
});

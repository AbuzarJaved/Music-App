import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  TextInput,
  Modal as MainModal,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {scale, ScaledSheet} from 'react-native-size-matters';
import CommonHeader from '../CustomHeader/CommonHeader';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  get_Recovery_code,
  resend_Email_Otp,
  verify_Email,
} from '../../redux/actions/OtpActions/index';
import LoadingAnime from '../Loading/Loading';
import LoginBtn from '../../Components/Button/LoginBtn';
import {get_Access_Token} from '../../redux/actions/userActions';
import MainErrorPopUp from './MainErrorPopUp';
import MainSuccessPopUp from './MainSuccessPopUp';
// import {} from ''
import {
  CLEAR_ACCESS_TOKEN,
  CLEAR_ERROR,
  CLEAR_OTP_STATUSES,
  CLEAR_OTP_STATUSES_1,
  CLEAR_OTP_STATUSES_2,
  CLEAR_OTP_STATUSES_3,
} from '../../redux/constants';
import Icon from 'react-native-vector-icons/Ionicons';
// import Main from 'react-native-country-picker-modal';

const {width, height} = Dimensions.get('window');

const NotActiveAccount = props => {
  const dispatch = useDispatch();
  const inputLength = 6;
  let textInput = useRef(null);
  const [focusedInput, setFocusedInput] = useState(false);
  const [changeScreen, setChangeScreen] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [inputErr, setInputErr] = useState('');
  const [fromMail, setFromMail] = useState(false);
  const [fromResend, setFromResend] = useState(false);
  const [fromVerify, setFromVerify] = useState(false);
  const getAccessToken = useSelector(state => state.getAccessToken);
  const {
    loading: accessTokenLoading,
    error: accessTokenError,
    accessToken,
  } = getAccessToken;
  const resendEmailOtp = useSelector(state => state.resendEmailOtp);

  const verifyEmail = useSelector(state => state.verifyEmail);

  const getRecoveryCode = useSelector(state => state.getRecoveryCode);
  const {loading, error, status, message} = getRecoveryCode;
  const {
    loading: verifyLoading,
    error: verifyError,
    message: verifyMessage,
    status: verifyStatus,
  } = verifyEmail;
  const {
    loading: resendLoading,
    error: resendError,
    message: resendMessage,
    status: resendStatus,
  } = resendEmailOtp;

  useEffect(() => {
    dispatch({type: CLEAR_ERROR});
  }, []);
  useEffect(() => {
    dispatch({type: CLEAR_OTP_STATUSES});
    dispatch({type: CLEAR_OTP_STATUSES_1});
    dispatch({type: CLEAR_OTP_STATUSES_2});
    dispatch({type: CLEAR_OTP_STATUSES_3});
  }, []);

  // GETTING ACCESS TOKEN
  const getCode = () => {
    console.log('WORKING', email);
    if (email === '') {
      setInputErr('Please input your registered mail');
    } else {
      setFromMail(true);
      dispatch(get_Access_Token());
    }
  };
  // GETTING ACTIVATION CODE
  useEffect(() => {
    if (fromMail && accessToken && accessToken !== '') {
      dispatch(get_Recovery_code(email, accessToken));
    }
  }, [accessToken, fromMail]);

  // CHANGING SCREEN WHEN SUCCESSFUL
  useEffect(() => {
    if (status && status === true) {
      //   setEmail('');
      dispatch({type: CLEAR_ACCESS_TOKEN});
      setFromMail(false);
      setChangeScreen(1);
    }
  }, [status]);
  useEffect(() => {
    setChangeScreen(0);
  }, []);

  //   ACTIVATING ACCOUNT FLOW WITH CODE
  const onChangeOtp = val => {
    setOtp(val);
  };
  const resendOtpToEmail = () => {
    setOtp('');
    setFromResend(true);
    setFromVerify(false);
    dispatch(get_Access_Token());
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
    if (fromResend === true && accessToken && accessToken !== '') {
      dispatch(resend_Email_Otp(email, accessToken));
    } else if (fromVerify === true && accessToken && accessToken !== '') {
      dispatch(verify_Email(email, otp, accessToken));
    }
  }, [accessToken, fromResend, fromVerify]);

  useEffect(() => {
    if (verifyStatus && verifyStatus === true) {
      setFromResend(false);
      setFromVerify(false);
      setEmail('');
      setChangeScreen(0);
      props.closeModal();
    }
  }, [verifyStatus]);

  let mainView = null;
  if (accessTokenLoading || verifyLoading || loading || resendLoading) {
    mainView = <LoadingAnime width={60} height={60} />;
  } else if (accessTokenError) {
    mainView = (
      <MainErrorPopUp
        clearTime={3000}
        errorState={accessTokenError}
        clearError={() => dispatch({type: CLEAR_ACCESS_TOKEN})}>
        {accessTokenError}
      </MainErrorPopUp>
    );
  } else if (error) {
    mainView = (
      <MainErrorPopUp
        clearTime={3000}
        errorState={error}
        clearError={() => dispatch({type: CLEAR_ERROR})}>
        {error}
      </MainErrorPopUp>
    );
  } else if (inputErr) {
    mainView = (
      <MainErrorPopUp
        clearTime={3000}
        errorState={inputErr}
        clearError={() => setInputErr('')}>
        {inputErr}
      </MainErrorPopUp>
    );
  } else if (verifyError) {
    mainView = (
      <MainErrorPopUp
        clearTime={3000}
        errorState={verifyError}
        clearError={() => dispatch({type: CLEAR_ERROR})}>
        {verifyError}
      </MainErrorPopUp>
    );
  } else if (resendError) {
    mainView = (
      <MainErrorPopUp
        clearTime={3000}
        errorState={resendError}
        clearError={() => dispatch({type: CLEAR_ERROR})}>
        {resendError}
      </MainErrorPopUp>
    );
  } else if (verifyMessage) {
    mainView = (
      <MainSuccessPopUp
        clearTime={3000}
        successState={verifyMessage}
        clearSuccess={() => dispatch({type: CLEAR_ERROR})}>
        {verifyMessage}
      </MainSuccessPopUp>
    );
  } else if (resendMessage) {
    mainView = (
      <MainSuccessPopUp
        clearTime={3000}
        successState={resendMessage}
        clearSuccess={() => dispatch({type: CLEAR_ERROR})}>
        {resendMessage}
      </MainSuccessPopUp>
    );
  } else if (message) {
    mainView = (
      <MainSuccessPopUp
        clearTime={3000}
        successState={message}
        clearSuccess={() => dispatch({type: CLEAR_ERROR})}>
        {message}
      </MainSuccessPopUp>
    );
  }

  return (
    <>
      <Modal
        animationIn="slideInDown"
        isVisible={props.visible}
        onSwipeComplete={() => props.closeModal()}
        onRequestClose={() => props.closeModal()}
        style={{
          flex: 1,
          margin: 0,
        }}>
        {mainView}
        <View style={styles.mainView}>
          <CommonHeader
            func={() => props.closeModal()}
            title="Activate your account"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 20,
              width: '100%',
              paddingHorizontal: 20,
            }}>
            <Icon
              name="md-information-circle"
              size={20}
              color="#ff3333"
              style={{width: '8%'}}
            />
            <Text
              style={{
                color: '#ddd',
                fontSize: scale(10),
                fontFamily: 'Helvetica-Regular',

                textAlign: 'left',
                width: '90%',
                lineHeight: scale(12),
              }}>
              Your account isn't activated.Please do, to have a better
              experience on Napollo.
            </Text>
          </View>

          <View style={styles.subContent}>
            {changeScreen === 0 && (
              <View style={{flex: 1, width: '100%'}}>
                <Text style={styles.headerText}>
                  Enter your registered mail to get an activation code
                </Text>
                <View style={{width: '100%', marginTop: scale(30)}}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.textInput}>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="#484848"
                      value={email}
                      onChangeText={val => setEmail(val)}
                      onFocus={() => setInputErr('')}
                      style={{color: '#fff', width: '100%'}}
                    />
                  </View>
                </View>
                <View style={{width: '100%', marginTop: scale(20)}}>
                  <LoginBtn title="Send" onPress={() => getCode()} />
                </View>
              </View>
            )}
            {changeScreen > 0 && (
              <>
                <Text style={styles.title}>
                  Please input the code sent via email
                </Text>
                <View style={{width: '100%', alignItems: 'center'}}>
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
                    onChangeText={onChangeOtp}
                    returnKeyType="done"
                  />
                  <View style={styles.resendContainer}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => resendOtpToEmail()}>
                      <Text style={styles.resendText}>Resend code </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NotActiveAccount;

const styles = ScaledSheet.create({
  mainView: {
    flex: 1,
    // position: 'absolute',
    bottom: 0,
    backgroundColor: '#000',
    width,
    height,
    paddingTop: '10@s',
    // zIndex: 400,
  },
  subContent: {
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10@s',
    paddingHorizontal: '20@s',
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
  headerText: {
    fontSize: '13@s',
    textAlign: 'center',
    color: '#ddd',
    fontFamily: 'Helvetica-Bold',
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
  },
  resendContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: '10%',
    paddingVertical: 3,
    alignSelf: 'flex-end',
  },
  title: {
    color: '#eee',
    fontFamily: 'Helvetica-Medium',
    marginTop: '10%',
    marginBottom: '5%',
    fontSize: 17,
  },
  resendText: {
    color: '#feee3e',
    fontFamily: 'Helvetica-Medium',
    fontSize: 13,
  },
});

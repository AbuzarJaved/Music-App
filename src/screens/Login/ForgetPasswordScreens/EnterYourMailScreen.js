import React, {useState, useEffect} from 'react';
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
import {get_Recovery_code} from '../../../redux/actions/OtpActions/index';
import LoadingAnime from '../../../Components/Loading/Loading';
import {useSelector, useDispatch} from 'react-redux';
import LoginBtn from '../../../Components/Button/LoginBtn';
import {get_Access_Token} from '../../../redux/actions/userActions';
import MainErrorPopUp from '../../../Components/Modal/MainErrorPopUp';
import MainSuccessPopUp from '../../../Components/Modal/MainSuccessPopUp';
import {CLEAR_ACCESS_TOKEN, CLEAR_ERROR} from '../../../redux/constants';

const {width, height} = Dimensions.get('window');
const EnterYourMailScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [clientErr, setClientErr] = useState('');
  const [fromMail, setFromMail] = useState(false);
  const dispatch = useDispatch();
  const getAccessToken = useSelector(state => state.getAccessToken);
  const {
    loading: accessTokenLoading,
    error: accessTokenError,
    accessToken,
  } = getAccessToken;

  const getRecoveryCode = useSelector(state => state.getRecoveryCode);
  const {loading, error, status, message} = getRecoveryCode;

  useEffect(() => {
    dispatch({type: CLEAR_ERROR});
  }, []);

  useEffect(() => {
    if (fromMail && accessToken && accessToken !== '') {
      dispatch(get_Recovery_code(email, accessToken));
    }
  }, [accessToken]);

  const getCode = () => {
    if (email === '') {
      setClientErr('Please input your registered mail');
    } else {
      setFromMail(true);
      dispatch(get_Access_Token());
    }
  };

  useEffect(() => {
    if (status && status === true) {
      setEmail('');
      dispatch({type: CLEAR_ACCESS_TOKEN});
      setFromMail(false);
      setTimeout(() => {
        navigation.navigate('ResetPassword');
      }, 4000);
    }
  }, [status]);

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
  } else if (clientErr) {
    mainView = (
      <MainErrorPopUp
        clearError={() => setClientErr('')}
        clearTime={3000}
        errorState={clientErr}>
        {clientErr}
      </MainErrorPopUp>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View style={styles.container}>
        {mainView}
        <CommonHeader title="Forgot Password" />
        <View style={styles.content}>
          <Text style={styles.headerText}>
            Enter your registered mail to get a recovery code
          </Text>
          <View style={{width: '100%', marginTop: scale(50)}}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.textInput}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#484848"
                value={email}
                onChangeText={val => setEmail(val)}
                onFocus={() => setClientErr('')}
                style={{color: '#fff', width: '100%'}}
              />
            </View>
          </View>
          <View style={{width: '100%', marginTop: scale(30)}}>
            <LoginBtn title="Send" onPress={() => getCode()} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterYourMailScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: '30@s',
    paddingHorizontal: '20@s',
  },
  headerText: {
    fontSize: '13@s',
    textAlign: 'center',
    color: '#ddd',
    fontFamily: 'Helvetica-Bold',
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

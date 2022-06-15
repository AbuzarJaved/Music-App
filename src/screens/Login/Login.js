import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LoginBtn from '../../Components/Button/LoginBtn';
import Icons from '../../Components/IconsContainer/Icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {login, clearData} from '../../redux/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import LoadingAnime from '../../Components/Loading/Loading';

import Message from '../../Components/Message/Message';

const initialValues = {
  username: '',
  password: '',
};
const validationSchema = Yup.object({
  username: Yup.string().required('Username / Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password should be more than 5 charcaters'),
});

const Login = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const [userData, setUserData] = useState(false);
  const {message, status} = userRegister;

  const {error, loading} = userLogin;
  // console.log(navigation);
  // console.log(route);
  // ACCESS TOKEN
  const getAccessToken = useSelector((state) => state.getAccessToken);
  // console.log(getAccessToken);
  const {error: accessTokenError, accessToken} = getAccessToken;


  const onSubmitValues = (values, actions) => {
    if (values.username || values.password) {
      Keyboard.dismiss;
      dispatch(clearData());
      dispatch(login(values.username, values.password));
      setUserData(false);
      actions.resetForm();
    }
    setUserData(true);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(true);

  const togglePassword = () => {
    setVisible(!visible);
    setShowPassword(!showPassword);
  };
  let successView = null;
  if (message) {
    successView = <Message color="success">{message}</Message>;
  }

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    //   style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
        <StatusBar hidden={true} />
        {/* NAPOLLO IMAGE */}
        <Image
          source={require('../../assests/images/Logo2.png')}
          style={{width: 120, height: 120}}
        />
        {successView}
        {error && <Message color="danger">{error}</Message>}
        {/* {userData && <Message color="danger">All fields are required</Message>} */}
        {loading && <LoadingAnime width={70} height={70} />}
        <View style={{width: '100%', marginBottom: 100, alignSelf: 'center'}}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => onSubmitValues(values, actions)}
            // validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <>
                  {/* EMAIL INPUT */}
                  <View style={{width: '100%'}}>
                    <Text style={styles.label}>Email:</Text>
                    <View style={styles.textInput}>
                      <TextInput
                        placeholder="email"
                        placeholderTextColor="#484848"
                        value={formik.values.username}
                        onChangeText={formik.handleChange('username')}
                        onBlur={formik.handleBlur('username')}
                        style={{color: '#fff', width: '100%'}}
                      />
                    </View>
                    {/* <Text style={styles.errorText}>
                      {formik.touched.name && formik.errors.name}
                    </Text> */}
                  </View>
                  {/* PASSWORD INPUT */}
                  <View style={{width: '100%', marginBottom: 10}}>
                    <Text style={styles.label}>Password:</Text>
                    <View style={styles.textInput}>
                      <TextInput
                        placeholder="password"
                        secureTextEntry={visible}
                        placeholderTextColor="#484848"
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                        textContentType={!showPassword ? 'name' : 'password'}
                        style={{color: '#fff', width: '100%'}}
                      />
                      {!showPassword ? (
                        <Icon
                          name="eye"
                          size={20}
                          style={styles.inputIcon}
                          onPress={togglePassword}
                        />
                      ) : (
                        <Icon
                          name="eye-slash"
                          size={20}
                          style={styles.inputIcon}
                          onPress={togglePassword}
                        />
                      )}
                    </View>
                    {/* <Text style={styles.errorText}>
                      {formik.touched.password && formik.errors.password}
                    </Text> */}
                  </View>

                  {/* LOGIN BTN */}
                  <LoginBtn title="Login" onPress={formik.handleSubmit} />
                </>
              );
            }}
          </Formik>
        </View>
        {/* OTHER CONTENT */}
        <View style={styles.otherContent}>
          <Text style={styles.forgetText}>Forget Password ?</Text>
          <Text
            style={{
              color: '#fff',
              margin: 20,
              textAlign: 'center',
              fontSize: 12,
            }}>
            OR
          </Text>
          {/* SOCIAL ICONS */}
          <Icons />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Gilroy-Bold',
                textAlign: 'center',
                fontSize: 13,
                letterSpacing: 0.5,
              }}>
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.push('SignIn')}>
              <Text
                style={{
                  color: '#f68128',
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 13,
                  letterSpacing: 0.5,
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  otherContent: {
    position: 'absolute',
    bottom: 20,
  },
  textInput: {
    borderColor: '#161616',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    padding: 5,
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
  forgetText: {
    color: '#484848',
    textAlign: 'center',
    fontFamily: 'Gilroy-light',
    fontSize: 13,
  },
  errorText: {
    color: '#900',
    fontSize: 10,
    margin: 3,
    textTransform: 'capitalize',
  },

  inputIcon: {
    position: 'absolute',
    top: 14,
    right: 20,
    color: '#f68126',
  },
});

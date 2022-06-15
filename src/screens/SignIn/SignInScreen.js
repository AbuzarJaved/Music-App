// import React, {useState} from 'react';
// import {
//   StatusBar,
//   StyleSheet,
//   View,
//   TextInput,
//   Image,
//   Text,
//   TouchableWithoutFeedback,
//   Keyboard,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
// } from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import LoginBtn from '../../Components/Button/LoginBtn';
// import Icons from '../../Components/IconsContainer/Icons';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import MyDarkView from './component/countrySelector';
// import Message from '../../Components/Message/Message';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   register,
//   clearData,
//   get_Access_Token,
// } from '../../redux/actions/userActions';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import {useEffect} from 'react';
// import LoadingAnime from '../../Components/Loading/Loading';
// import NetworkError from '../NetworkErrorScreen.js/NetworkError';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';


// const initialValues = {
//   email: '',
//   password: '',
//   phoneNumber: '',
//   name: '',
// };

// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email('Invalid email format')
//     .required('Email is required'),
//   password: Yup.string()
//     .required('Password is required')
//     .min(6, 'Password should be more than 5 charcaters'),
//   phoneNumber: Yup.string()
//     .required('Phone number is required')
//     .max(12, 'Phone number should not exceed 12 caracters'),
//   name: Yup.string().required('Name is required'),
// });

// const SignInScreen = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [visible, setVisible] = useState(true);
//   const [countryCode, setCountryCode] = useState('+1');
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const userRegister = useSelector((state) => state.userRegister);
//   const {error, status, loading, message} = userRegister;


//   const getAccessToken = useSelector((state) => state.getAccessToken);
 
//   const {error: accessTokenError, accessToken} = getAccessToken;

//   const onSubmit = (values, actions) => {
//     const {name, email, password, phoneNumber} = values;
//     if (name || email || password || phoneNumber || accessToken) {
//       actions.resetForm();
//       dispatch(register(name, email, password, phoneNumber, countryCode));
//       console.log(values);
//       console.log(countryCode);
//     }
//   };
//   useEffect(() => {
//     if (status) {
//       navigation.navigate('Login');
//     }
//   }, [status]);
  

//   const togglePassword = () => {
//     setVisible(!visible);
//     setShowPassword(!showPassword);
//   };
//   const changeCountryCode = (val) => {
//     const plus = '+';
//     const result = plus.concat(val);
//     setCountryCode(result);
//   };
//   console.log(countryCode, 'My country code');
 
//   return (
//     <KeyboardAwareScrollView
//       behavior={Platform.OS == 'ios' ? 'height' : 'height'}
//       style={styles.container}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           <View
//             style={{
              
//               flexDirection: 'row',
             
//               justifyContent: 'center',
//               position: 'absolute',
//               top: hp('95%'),
//               alignSelf: 'center',
//             }}>
//             <Text
//               style={{
//                 color: '#fff',
//                 fontFamily: 'Gilroy-Bold',
//                 textAlign: 'center',
//                 fontSize: 13,
//                 letterSpacing: 0.5,
//                 marginRight: 5,
//               }}>
//               Already have an account ?
//             </Text>
//             <TouchableOpacity
//               activeOpacity={0.6}
//               onPress={() => navigation.push('Login')}>
//               <Text
//                 style={{
//                   color: '#f68128',
//                   fontFamily: 'Gilroy-Bold',
//                   fontSize: 13,
//                   letterSpacing: 0.5,
//                 }}>
//                 Login
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.content}>
//             <StatusBar backgroundColor="#000" barStyle="light-content" />
          
//             <Image
//               source={require('../../assests/images/Logo2.png')}
//               style={{width: 110, height: 110}}
//             />
//             {error && <Message color="danger">{error}</Message>}
//             {loading && <LoadingAnime width={70} height={70} />}
//             <Formik
//               initialValues={initialValues}
//               onSubmit={onSubmit}
              
//             >
//               {(formik) => {
//                 return (
//                   <>
//                     <View style={{width: '100%'}}>
//                       <Text style={styles.label}>Name:</Text>
//                       <View style={styles.textInput}>
//                         <TextInput
//                           placeholder="username"
//                           placeholderTextColor="#484848"
//                           value={formik.values.name}
//                           onChangeText={formik.handleChange('name')}
//                           onBlur={formik.handleBlur('name')}
//                           style={{width: '100%', color: '#fff'}}
//                         />
//                       </View>
//                     </View>
                   
//                     <View style={{width: '100%'}}>
//                       <Text style={styles.label}>Email:</Text>
//                       <View style={styles.textInput}>
//                         <TextInput
//                           placeholder="email"
//                           placeholderTextColor="#484848"
//                           value={formik.values.email}
//                           onChangeText={formik.handleChange('email')}
//                           onBlur={formik.handleBlur('email')}
//                           style={{width: '100%', color: '#fff'}}
//                         />
//                       </View>
                     
//                     </View>
                    
//                     <View style={{width: '100%'}}>
//                       <Text style={styles.label}>Phone Number:</Text>
//                       <View style={styles.textInput}>
//                         <View style={styles.countryStyle}>
//                           <MyDarkView
//                             changeCountryCode={(val) => changeCountryCode(val)}
//                           />
//                         </View>
//                         <TextInput
//                           placeholder="phoneNumber"
//                           placeholderTextColor="#484848"
//                           value={formik.values.phoneNumber}
//                           onChangeText={formik.handleChange('phoneNumber')}
//                           onBlur={formik.handleBlur('phoneNumber')}
//                           style={{color: '#fff', width: '100%'}}
//                           keyboardType="phone-pad"
//                         />
//                       </View>
                   
//                     </View>
                    
//                     <View style={{width: '100%'}}>
//                       <Text style={styles.label}>Create Password:</Text>
//                       <View style={styles.textInput}>
//                         <TextInput
//                           placeholder="password"
//                           secureTextEntry={visible}
//                           placeholderTextColor="#484848"
//                           value={formik.values.password}
//                           onChangeText={formik.handleChange('password')}
//                           onBlur={formik.handleBlur('password')}
//                           textContentType={!showPassword ? 'name' : 'password'}
//                           style={{color: '#fff', width: '100%'}}
//                         />
//                         {!showPassword ? (
//                           <Icon
//                             name="eye-slash"
//                             size={20}
//                             style={styles.inputIcon}
//                             onPress={togglePassword}
//                           />
//                         ) : (
//                           <Icon
//                             name="eye"
//                             size={20}
//                             style={styles.inputIcon}
//                             onPress={togglePassword}
//                           />
//                         )}
//                       </View>
                   
//                     </View>
                  
//                     <View style={{width: '100%', marginTop: '5%'}}>
//                       <LoginBtn title="Sign Up" onPress={formik.handleSubmit} />
//                     </View>
//                   </>
//                 );
//               }}
//             </Formik>
//             <View style={styles.otherContent}>
//               <Text style={styles.or}>OR</Text>
              
//               <View style={styles.icons}>
//                 <Icons />
//               </View>
//             </View>
           
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAwareScrollView>
//   );
// };

// export default SignInScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: hp('100%'),
//     width: wp('100%'),
//     backgroundColor: '#000000',
//   },
//   content: {
//     paddingHorizontal: 20,
 
//     width: wp('100%'),
//     height: hp('100%'),
//     paddingBottom: 30,
//     alignItems: 'center',
//     marginTop: '10%',
    
//     flex: 1,
//   },
//   inputContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
//   otherContent: {
//     width: '100%',
    
//   },
//   textInput: {
//     borderColor: '#161616',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     width: '100%',
//     borderRadius: 5,
//     padding: 5,
//     fontFamily: 'Gilroy-light',
//     backgroundColor: '#161616',
//     textTransform: 'uppercase',
//     position: 'relative',
//     height: 50,
//     marginBottom: 10,
//   },
//   label: {
//     color: '#D3D3D3',
//     paddingHorizontal: 5,
//     marginVertical: 5,
//     fontFamily: 'Gilroy-light',
//     alignSelf: 'flex-start',
//     fontSize: 12,
//     letterSpacing: 0.5,
//   },
//   forgetText: {
//     color: '#484848',
//     textAlign: 'center',
//     fontFamily: 'Gilroy-light',
//     fontSize: 15,
//   },
//   errorText: {
//     color: '#900',
//     fontSize: 10,
//     margin: 3,
//     textTransform: 'capitalize',
//   },

//   inputIcon: {
//     position: 'absolute',
//     top: 14,
//     right: 20,
//     color: '#f68126',
//   },
//   countryStyle: {
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   or: {
//     color: '#fff',
//     marginVertical: '3%',
//     textAlign: 'center',
//     fontSize: 12,
//   },
//   icons: {
//     width: '100%',
//     alignItems: 'center',
//   },
// });

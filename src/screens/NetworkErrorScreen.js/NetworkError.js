import React from 'react';
import {StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import LoginBtn from '../../Components/Button/LoginBtn';
import {useSelector, useDispatch} from 'react-redux';
import {get_Access_Token, clearData} from '../../redux/actions/userActions';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const NetworkError = ({onPress, errorTitle, navigation}) => {
  // const navigation = useNavigation()
  const dispatch = useDispatch();
  const tryAgain = () => {
    navigation.navigate('SignIn');
    //clear all error storage later
    dispatch(get_Access_Token());
  };
  const getAccessToken = useSelector((state) => state.getAccessToken);
  const {error, accessToken} = getAccessToken;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Text style={styles.largeText}>OOPS!</Text>
      <Text style={styles.messageText}>
        {/* {error ? error : 'You are not connected to the internet'} */}
        {errorTitle ? errorTitle : 'You are not connected to the internet'}
      </Text>
      <View style={{width: '80%', marginTop: 50}}>
        <LoginBtn
          title="TRY AGAIN"
          onPress={onPress ? () => onPress() : tryAgain}
        />
      </View>
    </View>
  );
};

export default NetworkError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  largeText: {
    color: '#f68128',
    fontSize: 55,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-ExtraBold',
  },
  messageText: {
    color: '#999',
    fontSize: 15,
    textTransform: 'capitalize',
    marginVertical: 20,
    textAlign: 'center',
    fontFamily: 'Helvetica-Regular',
    marginHorizontal: 10,
  },
});

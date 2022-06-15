import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {getLoggedInUserProfile} from '../../../utils/loggedInUserType';
import {useSelector, useDispatch} from 'react-redux';

const UserSettingComponent = () => {
  const userData = getLoggedInUserProfile('LISTENER');
  const userLogin = useSelector((state) => state.userLogin);
  const {type} = userLogin;
  const {
    userProfile: {
      firstName,
      lastName,
      username,
      followerCount,
      followingCount,
      website,
      state,
      country,
      profileUrl,
      emailAddress,
    },
  } = userData;
  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>{`@${username}`}</Text>
      <Text style={styles.userType}>{type}</Text>
    </View>
  );
};

export default UserSettingComponent;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    paddingVertical: '20@s',
    // paddingHorizontal: 20,

    // backgroundColor: 'rgba(255,255,255,0.061)',
  },
  emailText: {
    color: '#999',
    fontFamily: 'Hevletica-Bold',
    fontSize: '16@s',
    textAlign: 'center',
  },
  userType: {
    color: '#F68128',
    fontFamily: 'Helvetica-Bold',
    fontSize: '10@s',
    marginTop: 5,
    textAlign: 'center',
    // paddingHorizontal: 10,
  },
});

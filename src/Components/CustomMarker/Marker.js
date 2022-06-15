import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {getLoggedInUserProfile} from '../../utils/loggedInUserType';

const Marker = ({item}) => {
  const userLogin = useSelector(state => state.userLogin);
  const {type: userType} = userLogin;

  const userData = getLoggedInUserProfile(`${userType}`);
  const {
    userProfile: {firstName, lastName, username},
  } = userData;
  return (
    <TouchableOpacity
      onPress={() => alert('Hello')}
      style={{
        flexDirection: 'column',
        // position: 'absolute',
        // zIndex: 100,
        // top: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="md-pin" color="#f68128" size={40} />
      {item === '' || item === null ? (
        <View style={styles.thumbNail}>
          <Text style={[styles.thumbNailName, {marginRight: 2}]}>
            {firstName ? firstName[0] : null}
          </Text>
          <Text style={styles.thumbNailName}>
            {lastName ? lastName[0] : null}
          </Text>
        </View>
      ) : (
        <Image style={styles.profileImage} source={{uri: item}} />
      )}
      {/* <Image
        source={{uri: item}}
        style={{width: 60, height: 60, borderRadius: 60 / 2}}
      /> */}
    </TouchableOpacity>
  );
};

export default Marker;

const styles = ScaledSheet.create({
  thumbNail: {
    width: '45@s',
    height: '45@s',
    borderRadius: '45@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: wp('3%'),
  },
  thumbNailName: {
    fontSize: '15@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  profileImage: {
    width: '45@s',
    height: '45@s',
    borderRadius: '45@s',
    marginRight: '5@s',
  },
});

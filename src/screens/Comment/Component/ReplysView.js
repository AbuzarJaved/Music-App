import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import LikeBtn from '../../../Components/Button/LikeBtn';
import {scale, ScaledSheet} from 'react-native-size-matters';
const ReplysView = props => {
  const {firstName, lastName, username, countryCode, profileUrl} =
    props.accountUser;
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
        height: 70,
      }}>
      <View style={styles.imageCont}>
        {profileUrl === '' || profileUrl === null ? (
          <View style={styles.thumbNail}>
            <Text style={[styles.thumbNailName, {marginRight: 2}]}>
              {firstName ? firstName[0] : null}
            </Text>
            <Text style={styles.thumbNailName}>
              {lastName ? lastName[0] : null}
            </Text>
          </View>
        ) : (
          <Image style={styles.profileImage} source={{uri: profileUrl}} />
        )}
      </View>
      <View style={styles.singleComment}>
        {/* USER_NAME */}
        <Text style={styles.user_name}>
          {username} &nbsp;
          <Text style={styles.country}>{countryCode}</Text>
        </Text>
        {/* COMMENT */}
        <Text style={styles.user_comment}>
          {props.comment}
          {/* <Text style={{color: '#999', fontSize: 9}}>&nbsp;{props.time}s</Text> */}
        </Text>
      </View>
      {/* <View style={{marginTop: 10}}>
        <LikeBtn col />
      </View> */}
    </View>
  );
};

export default ReplysView;

const styles = ScaledSheet.create({
  imageCont: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
  // user_name: {
  //   fontSize: 15,
  //   color: '#f68128',
  // },
  user_name: {
    fontSize: '13@s',
    color: '#888',
    // marginBottom:5
  },
  user_comment: {
    color: '#eee',
    fontSize: 12,
    textAlign: 'left',
    // flexWrap: 'wrap',
  },
  thumbNail: {
    width: '45@s',
    height: '45@s',
    borderRadius: '45@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
    marginRight: 10,
  },
  country: {
    fontSize: '12@s',
    color: '#888',
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getLoggedInUserProfile} from '../../../../../utils/loggedInUserType';

const Follower = () => {
  const artistData = getLoggedInUserProfile('ARTIST');

  const {
    artistProfile: {
      firstName: artistFullName,
      lastName: artistLastName,
      stageName,
      followCount: artistFollowers,
    },
  } = artistData;
  return (
    <>
      {/* TOP CONTENT */}
      <View style={styles.topContent}>
        {/* SINGLE FOLLOW */}
        <View style={{marginRight: '20%'}}>
          <Text
            style={{
              color: '#eee',
              fontSize: 12,
              fontFamily: 'Helvetica-Bold',
            }}>
            {artistFollowers}
          </Text>
          <Text
            style={{
              color: '#f68128',
              fontSize: 10,
              fontFamily: 'Helvetica-ExtraBold',
            }}>
            Followers
          </Text>
        </View>
        {/* SINGLE FOLLOW */}
        <View style={{marginRight: '20%'}}>
          <Text
            style={{color: '#eee', fontSize: 12, fontFamily: 'Helvetica-Bold'}}>
            300
          </Text>
          <Text
            style={{
              color: '#f68128',
              fontSize: 10,
              fontFamily: 'Helvetica-ExtraBold',
            }}>
            Following
          </Text>
        </View>
        {/* SINGLE FOLLOW */}
        {/* <View style={{marginRight: 12}}>
          <Text style={{color: '#eee', fontSize: 10}}>1.5K</Text>
          <Text style={{color: '#f68128', fontSize: 8}}>Likes</Text>
        </View> */}
      </View>
    </>
  );
};

export default Follower;

const styles = StyleSheet.create({
  topContent: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    // alignSelf: 'flex-end',
    marginTop: 10,
    // justifyContent: 'space-between',
  },
});

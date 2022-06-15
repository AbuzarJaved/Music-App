import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import ImageArt from '../../../../assests/images/caro.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Music from '../../../../assests/images/music-placeholder.png';
import {mainNumberFormat} from '../../../../utils/loggedInUserType';
import moment from 'moment';

const CreatePlaylist = props => {
  const {activityType, activityDateTime, accountUser, creatingAccountUser} =
    props;
  const date = moment(activityDateTime).startOf('hour').fromNow();

  return (
    <View style={styles.container}>
      <View style={styles.iconCont}>
        <Icons name="playlist-music" color="#999" size={scale(13)} />
        <Text style={styles.activityText}>You followed this user</Text>
      </View>
      {/* SONG DETAILS */}
      <View style={styles.songDetails}>
        <View style={styles.artistImage}>
          {accountUser?.profileUrl === undefined ||
          accountUser?.profileUrl === null ? (
            <View style={styles.thumbNail}>
              <Text style={[styles.thumbNailName, {marginRight: 2}]}>
                {accountUser?.firstName ? accountUser?.firstName[0] : null}
              </Text>
              <Text style={styles.thumbNailName}>
                {accountUser?.lastName ? accountUser?.lastName[0] : null}
              </Text>
            </View>
          ) : (
            <Image
              style={styles.image}
              source={{uri: accountUser?.profileUrl}}
            />
          )}
        </View>
        <View style={styles.artistDetails}>
          <View style={styles.nameCont}>
            <View>
              {/* <Text style={styles.artistName}>{accountUser?.title}</Text> */}
              <Text style={styles.userName}>@{accountUser?.username}</Text>
            </View>
            <View>
              <Text style={styles.timeStamp}>{date}</Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              marginTop: scale(2),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginRight: scale(10)}}>
              <Text
                style={{
                  color: '#eee',
                  fontSize: scale(10),
                  fontFamily: 'Helvetica-Bold',
                }}>
                {mainNumberFormat(accountUser?.followerCount)}
              </Text>
              <Text
                style={{
                  color: '#f68128',
                  fontSize: scale(8),
                  fontFamily: 'Helvetica-ExtraBold',
                }}>
                Followers
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: '#eee',
                  fontSize: scale(10),
                  fontFamily: 'Helvetica-Bold',
                }}>
                {mainNumberFormat(accountUser?.followingCount)}
              </Text>
              <Text
                style={{
                  color: '#f68128',
                  fontSize: scale(8),
                  fontFamily: 'Helvetica-ExtraBold',
                }}>
                Following
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreatePlaylist;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    // backgroundColor: 'rgba(0,0,0,0.4)',
    backgroundColor: 'rgba(255,255,255,0.061)',
    borderRadius: '10@s',
    paddingVertical: '20@s',
    paddingHorizontal: '10@s',
    marginBottom: '15@s',
  },
  iconCont: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '35@s',
  },
  activityText: {
    fontFamily: 'Helvetica-ExtraBold',
    fontSize: '10@s',
    color: '#999',
    marginLeft: '10@s',
  },
  songDetails: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10@s',
  },
  artistImage: {
    width: '50@s',
    height: '50@s',
    borderRadius: '50@s',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '50@s',
  },
  artistDetails: {
    width: '80%',
    marginLeft: '13@s',
    paddingRight: '10@s',
  },
  nameCont: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // paddingRight: '10@s',
    marginBottom: '10@s',
  },
  artistName: {
    color: '#ddd',
    fontSize: '14@s',
    fontFamily: 'Helvetica-Bold',
  },
  userName: {
    color: '#F68128',
    fontSize: '13@s',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'lowercase',
  },
  timeStamp: {
    color: '#888',
    fontSize: '12@s',
    fontFamily: 'Helvetica-Bold',
  },
  songData: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%',
    borderRadius: '10@s',
    height: '90@s',
    backgroundColor: 'rgba(255,255,255,0.065)',
  },
  songArt: {
    height: '100%',
    width: '40%',
    borderRadius: '10@s',
  },
  iconCont2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15%',
    // width: '100%',
  },
  singleIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '8%',
  },
  singleIconText: {
    fontSize: '11@s',
    color: '#ddd',
    fontFamily: 'Helvetica-Bold',
    marginLeft: '3@s',
  },
  thumbNail: {
    width: '50@s',
    height: '50@s',
    borderRadius: '50@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: '10@s',
  },
  thumbNailName: {
    fontSize: '13@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
});

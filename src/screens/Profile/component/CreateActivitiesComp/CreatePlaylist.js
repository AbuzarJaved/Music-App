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
  const {activityType, activityDateTime, playlist, album, creatingAccountUser} =
    props;
  const date = moment(activityDateTime).startOf('hour').toNow();

  if (activityType === 'CREATE_PLAYLIST') {
    return (
      <View style={styles.container}>
        <View style={styles.iconCont}>
          <Icons name="playlist-music" color="#999" size={scale(13)} />
          <Text style={styles.activityText}>You created this playlist</Text>
        </View>
        {/* SONG DETAILS */}
        <View style={styles.songDetails}>
          <View style={styles.artistImage}>
            {creatingAccountUser?.profileUrl === undefined ||
            creatingAccountUser?.profileUrl === null ? (
              <View style={styles.thumbNail}>
                <Text style={[styles.thumbNailName, {marginRight: 2}]}>
                  {creatingAccountUser?.firstName
                    ? creatingAccountUser?.firstName[0]
                    : null}
                </Text>
                <Text style={styles.thumbNailName}>
                  {creatingAccountUser?.lastName
                    ? creatingAccountUser?.lastName[0]
                    : null}
                </Text>
              </View>
            ) : (
              <Image
                style={styles.image}
                source={{uri: creatingAccountUser?.profileUrl}}
              />
            )}
            {/* <Image source={ImageArt} style={styles.image} /> */}
          </View>
          <View style={styles.artistDetails}>
            <View style={styles.nameCont}>
              <View>
                {/* <Text style={styles.artistName}>{media?.title}</Text> */}
                <Text style={styles.userName}>
                  @{creatingAccountUser?.username}
                </Text>
              </View>
              <View>
                <Text style={styles.timeStamp}>{date}</Text>
              </View>
            </View>
            {/* SONG */}
            <View style={styles.songData}>
              <Image
                source={
                  playlist?.url === null || playlist?.url === undefined
                    ? Music
                    : {uri: playlist?.url}
                }
                style={styles.songArt}
              />
              <View
                style={{
                  marginLeft: scale(10),
                  paddingTop: scale(10),
                  width: '52%',
                }}>
                <Text
                  numberOfLines={1}
                  style={[styles.artistName, {fontSize: scale(12)}]}>
                  {playlist?.name}
                </Text>
                <Text style={[styles.userName, {fontSize: scale(9)}]}>
                  {playlist?.description}
                </Text>
                <View style={styles.iconCont2}>
                  <View style={styles.singleIcon}>
                    <Icon
                      name="ios-musical-notes"
                      color="#F68128"
                      size={scale(12)}
                    />
                    <Text style={styles.singleIconText}>
                      {mainNumberFormat(`${playlist?.media.length}`)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (activityType === 'CREATE_ALBUM') {
    return (
      <View style={styles.container}>
        <View style={styles.iconCont}>
          <Icon name="albums" color="#999" size={scale(13)} />
          <Text style={styles.activityText}>You created this album</Text>
        </View>
        {/* SONG DETAILS */}
        <View style={styles.songDetails}>
          <View style={styles.artistImage}>
            {creatingAccountUser?.profileUrl === undefined ||
            creatingAccountUser?.profileUrl === null ? (
              <View style={styles.thumbNail}>
                <Text style={[styles.thumbNailName, {marginRight: 2}]}>
                  {creatingAccountUser?.firstName
                    ? creatingAccountUser?.firstName[0]
                    : null}
                </Text>
                <Text style={styles.thumbNailName}>
                  {creatingAccountUser?.lastName
                    ? creatingAccountUser?.lastName[0]
                    : null}
                </Text>
              </View>
            ) : (
              <Image
                style={styles.image}
                source={{uri: creatingAccountUser?.profileUrl}}
              />
            )}
            {/* <Image source={ImageArt} style={styles.image} /> */}
          </View>
          <View style={styles.artistDetails}>
            <View style={styles.nameCont}>
              <View>
                {/* <Text style={styles.artistName}>{media?.title}</Text> */}
                <Text style={styles.userName}>
                  @{creatingAccountUser?.username}
                </Text>
              </View>
              <View>
                <Text style={styles.timeStamp}>{date}</Text>
              </View>
            </View>
            {/* SONG */}
            <View style={styles.songData}>
              <Image
                source={
                  album?.url === null || album?.url === undefined
                    ? Music
                    : {uri: album?.url}
                }
                style={styles.songArt}
              />
              <View
                style={{
                  marginLeft: scale(10),
                  paddingTop: scale(10),
                  width: '52%',
                }}>
                <Text
                  numberOfLines={1}
                  style={[styles.artistName, {fontSize: scale(12)}]}>
                  {album?.name}
                </Text>
                <Text style={[styles.userName, {fontSize: scale(9)}]}>
                  {album?.description}
                </Text>
                {/* <View style={styles.iconCont2}>
                  <View style={styles.singleIcon}>
                    <Icon
                      name="ios-musical-notes"
                      color="#F68128"
                      size={scale(12)}
                    />
                    <Text style={styles.singleIconText}>
                      {mainNumberFormat(`${album?.media.length}`)}
                    </Text>
                  </View>
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
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

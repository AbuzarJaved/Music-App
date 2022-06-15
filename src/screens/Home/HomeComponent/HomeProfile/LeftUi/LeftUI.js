import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getLoggedInUserProfile} from '../../../../../utils/loggedInUserType';
import {DEFAULT_IMAGE_URI} from '../../../../../utils/ImagePicker';

const LeftUI = () => {
  const navigation = useNavigation();

  const userData = getLoggedInUserProfile('LISTENER');
  const {
    userProfile: {fullName},
  } = userData;
  const artistData = getLoggedInUserProfile('ARTIST');

  const {
    artistProfile: {
      firstName: artistFullName,
      lastName: artistLastName,
      stageName,
      profilePictureUrl: artistPics,
    },
  } = artistData;

  const userLogin = useSelector((state) => state.userLogin);
  const {type: userType} = userLogin;
  let stageNameView = null;
  if (userType && userType === 'ARTIST') {
    stageNameView = (
      <Text style={styles.profile_username}>
        {`@${stageName}` || '@Sebas.'}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image
          source={
            artistPics !== 'null' ? {uri: artistPics} : {uri: DEFAULT_IMAGE_URI}
          }
          style={{width: 50, height: 50, borderRadius: 50 / 2}}
        />
      </TouchableOpacity>
      <View style={styles.profile_Detail}>
        <Text style={styles.profile_name}>
          {fullName || `${artistFullName} ${artistLastName}` || 'Napollo Music'}
        </Text>
        {stageNameView}
      </View>
    </View>
  );
};

export default LeftUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '50%',
  },
  profile_Detail: {
    marginLeft: 10,
  },
  profile_name: {
    color: '#ddd',
    fontSize: 11,
    fontWeight: '900',
    fontFamily: 'Helvetica-ExtraBold',
  },
  profile_username: {
    color: '#f68128',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'lowercase',
  },
  profile_job: {
    color: '#999',
    fontSize: 11,
    marginTop: 5,
    fontFamily: 'Gilroy-Bold',
  },
});

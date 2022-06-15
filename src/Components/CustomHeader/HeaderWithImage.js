import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {getLoggedInUserProfile} from '../../utils/loggedInUserType';
import {DEFAULT_IMAGE_URI} from '../../utils/ImagePicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const HeaderWithImage = ({onPress, navigate}) => {
  const navigation = useNavigation();
  // const artistData = getLoggedInUserProfile('ARTIST');
   const userData = getLoggedInUserProfile('LISTENER');
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
       },
     } = userData;

  // const {
  //   artistProfile: {profilePictureUrl: artistPics},
  // } = artistData;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
        position: 'absolute',
        zIndex: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
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
      </TouchableOpacity>
      {navigate && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          // onPress={() => dispatch(openGoogleSearchModal())}
          style={styles.inputContainer}>
          <Icon
            name="search"
            color="#fff"
            size={24}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        // <TouchableOpacity
        //   activeOpacity={0.8}
        //   onPress={onPress}
        //   style={styles.search}>
        //   <Icon name="search" color="#999" size={scale(20)} />
        //   <Text
        //     style={{
        //       paddingLeft: 10,
        //       color: '#999',
        //       fontSize: scale(12),
        //       fontFamily: 'Helvetica-Medium',
        //     }}>
        //     Search
        //   </Text>
        // </TouchableOpacity>
      )}

      {/* <Icon
        name="md-options"
        color="#f68128"
        size={30}
        style={{marginBottom: 10}}
      /> */}
    </View>
  );
};

export default HeaderWithImage;

const styles = ScaledSheet.create({
  search: {
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#555',
    borderColor: '#555',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  thumbNail: {
    width: '45@s',
    height: '45@s',
    borderRadius: '45@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  thumbNailName: {
    fontSize: hp('2%'),
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  profileImage: {
    width: '45@s',
    height: '45@s',
    borderRadius: '45@s',
    marginRight: wp('3%'),
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: '45@s',
    borderColor: '#555',
    backgroundColor: 'rgba(255,255,255,0.9)',
    backgroundColor: '#555',
    height: '45@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    width: '45@s',
    zIndex: 100,
  },
});

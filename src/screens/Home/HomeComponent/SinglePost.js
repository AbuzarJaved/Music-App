import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import CommentFooter from './HomeInfo/Comment/CommentDetailsFooter/Footer';
import OpenToastBtn from '../../../Components/Button/OpenToastBtn';
import {useDispatch, useSelector} from 'react-redux';
import {STORE_ACTIVE_POST} from '../../../redux/constants';
import {
  store_Active_User_Details,
  openSingleUserModal,
} from '../../../redux/actions/userActions';

const SinglePost = props => {
  const dispatch = useDispatch();
  const getUserProfile = useSelector(state => state.getUserProfile);
  const {userProfile} = getUserProfile;
  const {firstName, lastName, username, profileUrl} = props.accountUser;

  const goToArtist = () => {
    if (userProfile?.username === props.accountUser?.username) {
      props.navigation.navigate('Profile');
    } else {
      dispatch(store_Active_User_Details(props.accountUser));
      dispatch(openSingleUserModal());
    }
  };

  const openBottomSheet = () => {
    props.onPress();
    dispatch({type: STORE_ACTIVE_POST, payload: props.activePost});
  };
  let imageLink = 'http://34.221.213.227/napollo/images/';

  return (
    <View style={styles.container}>
      {/* TOP PART */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.3,
          zIndex: 50,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          width: '100%',
          height: '70%',
          padding: 15,
          backgroundColor: 'rgba(0,0,0,0.55)',
          flex: 1,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          zIndex: 200,
        }}>
        <View style={styles.mainTop}>
          <TouchableOpacity activeOpacity={0.8} style={styles.artist}>
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
              <Image style={styles.artistImage} source={{uri: profileUrl}} />
            )}
            {/* <Image
              source={require('../../../assests/images/caro3.jpg')}
              style={styles.artistImage}
            /> */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => goToArtist()}
              style={{marginTop: 5}}>
              <Text style={styles.nameText}>{username}</Text>
              <Text style={styles.username}>@{username}</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <OpenToastBtn onPress={() => openBottomSheet()} />
        </View>
        {/* COMMENTS */}

        <Text style={styles.comment}>{props.post}</Text>
        {props.images.length > 0 && (
          <View style={styles.postImage}>
            <ScrollView
              horizontal={true}
              bounces={false}
              contentContainerStyle={{width: '100%'}}>
              {props.images.map((item, index) => (
                <Image
                  key={index}
                  source={{uri: item}}
                  // source={{uri: imageLink.concat(`${item}`)}}
                  style={{width: '100%', height: '100%', borderRadius: 5}}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '30%',
          padding: 15,
          borderRadius: 10,
          zIndex: 200,
        }}>
        <CommentFooter comment={props.comments?.length} />
      </View>
    </View>
  );
};

export default SinglePost;

const styles = ScaledSheet.create({
  container: {
    width: '100%',

    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginBottom: 20,
  },
  mainTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artist: {
    width: '80%',
    flexDirection: 'row',
  },
  artistImage: {
    width: '60@s',
    height: '60@s',
    borderRadius: '60@s',
    marginRight: 10,
  },
  nameText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
  },
  username: {
    color: '#f68128',
    fontSize: 10,
    fontFamily: 'Helvetica-Medium',
  },
  comment: {
    fontSize: 13,
    color: '#fff',
    width: '100%',
    marginTop: 15,
    fontFamily: 'Helvetica-Regular',
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 5,

    marginTop: 15,
  },
  thumbNail: {
    width: '60@s',
    height: '60@s',
    borderRadius: '60@s',
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
});

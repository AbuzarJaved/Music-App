import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import FollowersCont from './FollowersCont';
import FollowBtn from '../../../../Components/Button/FollowBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import Divider from '../../../../Components/Divider/Divider';
import {
  getLoggedInUserProfile,
  mainNumberFormat,
} from '../../../../utils/loggedInUserType';
import {scale, ScaledSheet} from 'react-native-size-matters';
import LoginBtn from '../../../../Components/Button/LoginBtn';
import {loadDataFromStorage} from '../../../../utils/asyncStorage';
import DefaultImage from '../../../../assests/images/image_placeholder.png';
import EditProfileBtn from './EditProfileBtn';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {getFullCountry} from '../../../../utils/loggedInUserType';
// import {scale, ScaledSheet} from 'react-native-size-matters';

const ArtistDetails = ({onPress}) => {
  const artistData = getLoggedInUserProfile('ARTIST');
  const listenerData = getLoggedInUserProfile('LISTENER');

  const storeActiveUserDetails = useSelector(
    state => state.storeActiveUserDetails,
  );
  const {userProfile} = storeActiveUserDetails;
  const {
    firstName,
    lastName,
    username,
    followerCount,
    followingCount,
    website,
    state,
    country,
    profileUrl,
    id,
  } = userProfile;
  console.log(followerCount);
  const [userFollowers, setUserFollowers] = useState(followerCount);

  const increaseFollowers = () => {
    setUserFollowers(userFollowers + 1);
  };
  const decreaseFollowers = () => {
    setUserFollowers(userFollowers - 1);
  };
  // console.log(listenerData, 'LISTENER');
  useEffect(() => {
    setUserFollowers(followerCount);
  }, []);

  let websiteView = null;
  if (website && website !== '') {
    websiteView = (
      <View style={{flexDirection: 'row'}}>
        <Icon name="md-link" color="#f68128" size={scale(18)} />
        <Text
          style={{
            color: '#666',
            fontSize: scale(10),
            fontFamily: 'Helvetica-Medium',
            marginLeft: 10,
          }}>
          {website}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TOP DETAILS */}
      <View style={styles.topDetails}>
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

        {/* DETAILS */}
        <View style={{width: wp('65%')}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '65%'}}>
              <Text numberOfLines={1} style={styles.artistName}>
                {firstName}&nbsp;{lastName}
              </Text>
              <Text numberOfLines={1} style={styles.stageName}>
                @{username}
              </Text>
            </View>
            {/* <View style={{width: '40%'}}>
              <FollowBtn
                title="Follow"
                textSize={12}
                artistIdentity={artistIdentity}
                follow_Artist={followArtist}
                unFollow={unfollowArtist}
                follow={follow}
                openAlert={openAlert}
              />
            </View> */}

            <FollowBtn
              id={id}
              followerCount={followerCount}
              style={{width: scale(80)}}
              title="Follow"
              title2="Following"
              increase={() => increaseFollowers()}
              decrease={() => decreaseFollowers()}
            />
          </View>
          <View style={styles.artistLikesCont}>
            <FollowersCont
              title="Followers"
              num={mainNumberFormat(userFollowers)}
            />
            <FollowersCont
              title="Following"
              num={mainNumberFormat(followingCount)}
            />
            {/* <FollowersCont title="Following" num={followingCount} /> */}
            {/* <FollowersCont title="Likes" num={0} /> */}
          </View>
        </View>
      </View>
      {/* BOTTOM DETAILS */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          paddingLeft: 10,
          marginBottom: 10,
        }}>
        <View
          style={{flexDirection: 'row', marginRight: 20, alignItems: 'center'}}>
          <Icon name="md-location-sharp" color="#f68128" size={scale(17)} />
          <Text
            style={{
              color: '#666',
              fontSize: scale(10),
              fontFamily: 'Helvetica-Medium',
              marginLeft: 10,
              textTransform: 'capitalize',
            }}>
            {state},&nbsp;{getFullCountry(country)}
          </Text>
        </View>
        {websiteView}
      </View>
      {/* <Text
        style={{
          color: '#666',
          fontSize: scale(10),
          textAlign: 'left',
          fontFamily: 'Helvetica-Medium',
          paddingLeft: 10,
          marginTop: 10,
          paddingBottom: 10,
          lineHeight: 20,
        }}>
        {artistBio ? artistBio : null}
      </Text> */}
      <Divider bc="#444" />
    </View>
  );
};

export default ArtistDetails;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
  },
  topDetails: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
  },
  profileImage: {
    width: '80@s',
    height: '80@s',
    borderRadius: '80@s',
    marginRight: '10@s',
  },
  artistName: {
    fontSize: '13@s',
    color: '#fff',
    fontFamily: 'Helvetica-Medium',
  },
  stageName: {
    fontSize: '10@s',
    color: '#F68128',
    fontFamily: 'Helvetica-Medium',
    textTransform: 'lowercase',
    width: '90%',
  },
  artistLikesCont: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  thumbNail: {
    width: '80@s',
    height: '80@s',
    borderRadius: '80@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4%'),
  },
  thumbNailName: {
    fontSize: '20@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
});

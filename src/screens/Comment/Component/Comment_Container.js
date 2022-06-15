import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import LikeBtn from '../../../Components/Button/LikeButton';
import Icon from 'react-native-vector-icons/Ionicons';
import ReplyModal from '../../../Components/Modal/ReplyModal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width} = Dimensions.get('window');

const Comment_Container = ({
  time,
  name,
  comment,
  accountUser,
  timestamp,
  replies,
  id,
}) => {
  const [replyModal, setReplyModal] = useState(false);
  const {firstName, lastName, username, countryCode, profileUrl} = accountUser;
  const openReplyModal = () => {
    setReplyModal(true);
  };
  const closeReplyModal = () => {
    setReplyModal(false);
  };
  const userData = {
    firstName,
    lastName,
    username,
    countryCode,
    profileUrl,
    comment,
    replies,
    id,
  };
  // console.log(moment(timestamp).format('hh mm ss'), 'USER IMAGE');

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => openReplyModal()}
      style={styles.container}>
      <ReplyModal
        openReplyModal={openReplyModal}
        replyModal={replyModal}
        closeReplyModal={closeReplyModal}
        userData={userData}
        time={time}
        name={username}
        comment={comment}
      />
      {/* COMMENT VIEW */}
      <View style={styles.comment}>
        <View style={{flexDirection: 'row', width: '70%'}}>
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
              {username}&nbsp; <Text style={styles.country}>{countryCode}</Text>
            </Text>
            {/* COMMENT */}
            <Text numberOfLines={4} style={styles.user_comment}>
              {comment}
              {/* <Text
                style={{
                  color: '#999',
                  fontSize: hp('1.7%'),
                  fontFamily: 'Helvetica-Bold',
                }}>
                &nbsp;{time}s
              </Text> */}
            </Text>
            {/* NUM_REPLIES */}
            {replies?.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.replies}
                onPress={() => openReplyModal()}>
                <Text
                  style={{
                    color: '#f68128',
                    fontSize: scale(11),
                    fontFamily: 'Helvetica-Medium',
                  }}>
                  replies&nbsp;({`${replies?.length}`})&nbsp;
                </Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.replies}
              onPress={() => openReplyModal()}>
              <Text
                style={{
                  color: '#f68128',
                  fontSize: 13,
                  fontFamily: 'Helvetica-Medium',
                }}>
                Replies&nbsp;(51)&nbsp;
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <View style={{marginTop: 20}}>
          <LikeBtn col />
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default Comment_Container;

const styles = ScaledSheet.create({
  container: {
    width,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  comment: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
  },
  singleComment: {
    // width: '60%',
    // flexWrap: 'wrap',
  },
  imageCont: {
    width: '40@s',
    height: '40@s',
    borderRadius: '40@s',
    marginRight: 25,
  },
  user_name: {
    fontSize: '13@s',
    color: '#888',
    // marginBottom:5
  },
  user_comment: {
    color: '#fff',
    fontSize: '12@s',
    textAlign: 'left',
    fontFamily: 'Helvetica-Regular',
    marginVertical: 3,
    lineHeight: 20,
    // flexWrap: 'wrap',
  },
  replies: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbNail: {
    width: '55@s',
    height: '55@s',
    borderRadius: '55@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  thumbNailName: {
    fontSize: '18@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  profileImage: {
    width: '55@s',
    height: '55@s',
    borderRadius: '55@s',
    marginRight: 10,
  },
  country: {
    fontSize: '12@s',
    color: '#888',
  },
});

import React, {useEffect, useState, Component, PureComponent} from 'react';
import EmojiBoard from 'react-native-emoji-board';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  create_Media_Comment,
  get_Media_Comments,
  create_Media_Reply,
} from '../../redux/actions/MediaActions/CommentsActions/index';
import LoadingAnime from '../../Components/Animations/Small_LoadingAnime';
import Icon from 'react-native-vector-icons/Ionicons';
import LikeBtn from '../Button/LikeBtn';
import ReplysView from '../../screens/Comment/Component/ReplysView';
import data4 from '../../data4';
import Divider from '../../Components/Divider/Divider';
import {scale, ScaledSheet} from 'react-native-size-matters';
import CommentBottomInput from '../../Components/Button/CommentsBottomTab';
import SmallErrorPopUpModal from './SmallErrorModalPopUp';
import {useDispatch, useSelector} from 'react-redux';
import MainErrorModal from './MainErrorPopUp';

const {width, height} = Dimensions.get('window');

const ReplyModal = props => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    username,
    countryCode,
    profileUrl,
    comment,
    replies,
    id: commentId,
  } = props.userData;
  const [reply, setReply] = useState('');
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(100);
  const [emptyReplyErr, setEmptyReplyErr] = useState('');
  const onClick = emoji => {
    const selectedEmoji = emoji.code;
    const input = emoji ? reply.concat(selectedEmoji) : null;
    setReply(input);
  };
  const openMediaCommentModal = useSelector(
    state => state.openMediaCommentModal,
  );
  const {
    isMediaCommentModalOpen,
    mediaCommentDetails: {id: mediaIdentity},
  } = openMediaCommentModal;
  const createMediaComment = useSelector(state => state.createMediaComment);
  const {
    loading: mediaCommentLoading,
    error: mediaCommentError,
    message: mediaCommentMessage,
    status: mediaCommentStatus,
  } = createMediaComment;
  const createMediaReply = useSelector(state => state.createMediaReply);
  const {
    loading: mediaReplyLoading,
    error: mediaReplyError,
    message: mediaReplyMessage,
    status: mediaReplyStatus,
  } = createMediaReply;
  const changeComment = val => {
    setReply(val);
  };
  const openEmoji = () => {
    setShow(!show);
  };
  const clearClientsCommentErr = () => {
    setEmptyReplyErr('');
  };

  const onSubmit = () => {
    setShow(false);
    setEmptyReplyErr('');
    if (reply === '') {
      setEmptyReplyErr('You cannot post empty reply');
    } else {
      dispatch(create_Media_Reply(reply, commentId, mediaIdentity, page, size));
    }
    if (mediaReplyStatus === true) {
      setReply('');
    }
  };

  let clientsCommentErrCheckView = null;
  let mediaCommentsErrorView = null;
  if (emptyReplyErr !== '') {
    clientsCommentErrCheckView = (
      <SmallErrorPopUpModal
        clearClientsErr={clearClientsCommentErr}
        errorState={emptyReplyErr}>
        {emptyReplyErr}
      </SmallErrorPopUpModal>
    );
  }
  if (mediaReplyError) {
    mediaCommentsErrorView = (
      <MainErrorModal errorState={mediaReplyError}>
        {mediaReplyError}
      </MainErrorModal>
    );
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.replyModal}
      onRequestClose={() => props.closeReplyModal}>
      <View style={styles.modalView}>
        {clientsCommentErrCheckView}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            paddingVertical: 20,
            alignItems: 'center',
            borderBottomColor: '#222',
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              color: '#eee',
              textAlign: 'center',
              fontSize: 15,
              fontFamily: 'Helvetica-Bold',
            }}>
            Replies&nbsp;({`${replies?.length}`})
          </Text>
          <TouchableOpacity
            onPress={() => props.closeReplyModal()}
            style={styles.closeModalIcon}
            hitSlop={{top: 30, right: 30, left: 30, bottom: 30}}>
            <Icon name="close" size={36} color="#f68128" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentView}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              backgroundColor: 'rgba(255,255,255,0.061)',
              paddingVertical: 15,
              marginBottom: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                // justifyContent: 'space-between',
                // paddingHorizontal: 10,
                // backgroundColor: 'rgba(255,255,255,0.061)',
                // paddingVertical: 15,
              }}>
              <View style={styles.flex}>
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
                    <Image
                      style={styles.profileImage}
                      source={{uri: profileUrl}}
                    />
                  )}
                </View>
                <View style={styles.singleComment}>
                  {/* USER_NAME */}
                  <Text style={styles.user_name}>
                    {props.name}&nbsp;{' '}
                    <Text style={styles.country}>{countryCode}</Text>
                  </Text>
                  {/* COMMENT */}
                  <Text numberOfLines={4} style={styles.user_comment}>
                    {props.comment}
                    {/* <Text style={{color: '#999', fontSize: 9}}>
                  &nbsp;{props.time}s
                </Text> */}
                  </Text>
                  {/* NUM_REPLIES */}
                  {/* <TouchableOpacity
                activeOpacity={0.6}
                style={styles.replies}
                onPress={() => openReplyModal()}>
                <Text style={{color: '#f68128', fontSize: 13}}>
                  View replies&nbsp;(51)&nbsp;
                </Text>
                <Icon name="chevron-down" size={20} color="#f68128" />
              </TouchableOpacity> */}
                </View>
              </View>
            </View>
            {/* <View style={{}}>
              <LikeBtn col />
            </View> */}
          </View>
          <CommentBottomInput
            // data={mediaCommentsData}
            comment={reply}
            placeholder="Your reply...."
            changeComment={val => changeComment(val)}
            onSubmit={onSubmit}
            openEmoji={openEmoji}
            loadingState={mediaReplyLoading}
            clientsErr={clearClientsCommentErr}
          />

          <Divider mt={15} mb={10} />
          {/* REPLIES VIEW */}
          <View style={styles.repliesView}>
            {replies?.length <= 0 && (
              <View>
                <Text
                  style={{
                    color: '#eee',
                    textAlign: 'center',
                    fontFamily: 'Helvetica-Medium',
                    fontSize: scale(11),
                  }}>
                  No replys yet.Be the first to reply....
                </Text>
              </View>
            )}
            <FlatList
              data={replies}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => <ReplysView {...item} />}
            />
            {/* <ReplysView /> */}
            {show && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShow(false)}
                style={{position: 'absolute', bottom: 0, height, width}}>
                <EmojiBoard
                  showBoard={show}
                  onClick={onClick}
                  containerStyle={{backgroundColor: '#111'}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReplyModal;

const styles = ScaledSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    zIndex: 500,
  },
  closeModalIcon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  comment: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageCont: {
    width: '55@s',
    height: '55@s',
    borderRadius: '55@s',
    marginRight: 10,
  },
  user_name: {
    fontSize: '13@s',
    color: '#F68128',
    marginBottom: 2,
  },
  user_comment: {
    color: '#eee',
    fontSize: '13@s',
    textAlign: 'left',
    // width: '70%',
    // flexWrap: 'wrap',
  },
  contentView: {
    // paddingHorizontal: 10,
    // paddingVertical: 20,
    height: '100%',
    flex: 1,
  },
  repliesView: {
    // paddingHorizontal: 50,
    // marginTop: 20,
    height: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
  thumbNailName: {
    fontSize: '16@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  profileImage: {
    width: '55@s',
    height: '55@s',
    borderRadius: '55@s',
    marginRight: wp('3%'),
  },
  country: {
    fontSize: '13@s',
    color: '#888',
  },
  thumbNail: {
    width: '55@s',
    height: '55@s',
    borderRadius: '55@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  flex: {
    width: '90%',
    flexDirection: 'row',

    // alignItems: 'center',
  },
});

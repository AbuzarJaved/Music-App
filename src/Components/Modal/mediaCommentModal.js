import React, {useEffect, useState} from 'react';
import EmojiBoard from 'react-native-emoji-board';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch, useSelector} from 'react-redux';

import {
  closeCommentModal,
  closeMediaCommentModal,
} from '../../redux/actions/commentModal';
import Comment_Header from '../../screens/Comment/Component/Comment_Header';
import Icon from 'react-native-vector-icons/Ionicons';
import Comment_Container from '../../screens/Comment/Component/Comment_Container';
import CommentBottomInput from '../../Components/Button/CommentsBottomTab';
import {
  create_Media_Comment,
  get_Media_Comments,
} from '../../redux/actions/MediaActions/CommentsActions/index';
import LoadingAnime from '../../Components/Loading/Loading';
import ErrorScreen from '../../Components/ErrorScreen/ErrorScreen';
import SmallErrorPopUpModal from './SmallErrorModalPopUp';
import MainErrorModal from './MainErrorPopUp';
import {CLEAR_MEDIA_COMMENTS_ERROR} from '../../redux/constants';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const Media_Comment_Modal = () => {
  const dispatch = useDispatch();
  // EMOJI STATE
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(100);
  const [emptyCommentErr, setEmptyCommentErr] = useState('');
  const onClick = emoji => {
    const selectedEmoji = emoji.code;
    const input = emoji ? comment.concat(selectedEmoji) : null;
    setComment(input);
  };

  const openMediaCommentModal = useSelector(
    state => state.openMediaCommentModal,
  );
  const {
    isMediaCommentModalOpen,
    mediaCommentDetails: {id: mediaIdentity},
  } = openMediaCommentModal;

  // CREATE COMMENT STATE
  const createMediaComment = useSelector(state => state.createMediaComment);
  const {
    loading: mediaCommentLoading,
    error: mediaCommentError,
    message: mediaCommentMessage,
    status: mediaCommentStatus,
  } = createMediaComment;

  const getMediaComments = useSelector(state => state.getMediaComments);
  const {
    loading: mediaCommentsLoading,
    error: mediaCommentsError,
    mediaComments: mediaCommentsData,
  } = getMediaComments;
  // console.log(mediaCommentsData, 'MEDIA COMMENTS');

  useEffect(() => {
    dispatch(get_Media_Comments(page, size, mediaIdentity));
    // return () => setEmptyCommentErr('');
  }, [mediaIdentity]);

  const changeComment = val => {
    setComment(val);
  };
  const openEmoji = () => {
    setShow(!show);
  };
  const clearClientsCommentErr = () => {
    setEmptyCommentErr('');
  };
  useEffect(() => {
    if (mediaCommentStatus === true) {
      setComment('');
    }
  }, [mediaCommentStatus]);

  const onSubmit = () => {
    // if (comment) {
    //   addComment(comment);
    // }
    setShow(false);
    setEmptyCommentErr('');
    console.log(emptyCommentErr, 'Empty comment check2');
    if (comment === '') {
      setEmptyCommentErr('You cannot post empty comments');
    } else {
      dispatch(create_Media_Comment(comment, mediaIdentity, page, size));
    }
  };
  let commentsLoadingView = null;
  let mediaCommentsErrorView = null;
  if (mediaCommentsLoading) {
    commentsLoadingView = <LoadingAnime width={60} height={60} />;
  }
  if (mediaCommentsError) {
    mediaCommentsErrorView = (
      <MainErrorModal
        errorState={mediaCommentsError}
        clearError={() => dispatch({type: CLEAR_MEDIA_COMMENTS_ERROR})}>
        {mediaCommentsError}
      </MainErrorModal>
    );
  }

  let loadingView = null;
  let errorView = null;
  let clientsCommentErrCheckView = null;
  if (mediaCommentLoading) {
    loadingView = <ActivityIndicator size="small" color="#f68128" />;
  }
  if (mediaCommentError) {
    errorView = (
      <SmallErrorPopUpModal errorState={mediaCommentError}>
        {mediaCommentError}
      </SmallErrorPopUpModal>
    );
  }
  if (emptyCommentErr !== '') {
    clientsCommentErrCheckView = (
      <SmallErrorPopUpModal
        clearClientsErr={clearClientsCommentErr}
        errorState={emptyCommentErr}>
        {emptyCommentErr}
      </SmallErrorPopUpModal>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isMediaCommentModalOpen}
      onRequestClose={() => dispatch(closeMediaCommentModal())}>
      <View style={styles.modalView}>
        <View style={styles.container}>
          {commentsLoadingView}
          {mediaCommentsErrorView}
          {clientsCommentErrCheckView}
          <Comment_Header
            mediaComment={mediaCommentsData.length}
            closeCommentModal={closeMediaCommentModal}
          />
          <View style={styles.content}>
            <CommentBottomInput
              data={mediaCommentsData}
              comment={comment}
              changeComment={val => changeComment(val)}
              onSubmit={onSubmit}
              openEmoji={openEmoji}
              loadingState={mediaCommentLoading}
              clientsErr={clearClientsCommentErr}
            />
            {/* COMMENTS */}
            {mediaCommentsData.length === 0 && (
              <View style={{width, padding: 20}}>
                <Text
                  style={{
                    color: '#eee',
                    textAlign: 'center',
                    fontFamily: 'Helvetica-Medium',
                    fontSize: scale(11),
                  }}>
                  No comments yet.Be the first to comment...
                </Text>
              </View>
            )}
            {mediaCommentsData.length > 0 && (
              <FlatList
                data={mediaCommentsData}
                contentContainerStyle={{marginTop: 10}}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Comment_Container {...item} />}
              />
            )}
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

export default Media_Comment_Modal;

const styles = ScaledSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor: '#000',
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    zIndex: 500,
    backgroundColor: '#1A1A1A',

    // paddingBottom: 10,
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
      android: {
        paddingTop: getStatusBarHeight(true),
      },
    }),
    // paddingHorizontal: 20,
    // paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    flex: 1,
    width,
    height,
    marginTop: 60,
    // paddingBottom: 50,
  },
  commentCont: {
    width,
    // height: 70,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#444',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  input: {
    color: '#eee',
    width: '70%',
    paddingHorizontal: 10,
    height: '100%',
  },
  btn: {
    backgroundColor: '#f68128',
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
});

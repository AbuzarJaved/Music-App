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
  // Modal,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch, useSelector} from 'react-redux';
import {closeCommentModal} from '../../redux/actions/commentModal';
import Comment_Header from '../../screens/Comment/Component/Comment_Header';
import Icon from 'react-native-vector-icons/Ionicons';
import Comment_Container from '../../screens/Comment/Component/Comment_Container';

const {width, height} = Dimensions.get('window');

const Comment_Modal = () => {
  const dispatch = useDispatch();
  const openCommentModal = useSelector((state) => state.openCommentModal);
  const {isCommentModalOpen} = openCommentModal;
  // EMOJI STATE
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const onClick = (emoji) => {
    const selectedEmoji = emoji.code;
    const input = emoji ? comment.concat(selectedEmoji) : null;
    setComment(input);
  };
  const [comments, setComments] = useState([
    {
      comment: '6500 languages spoken on planet earth and man choose FACTS.The skjbbskfb',
      id: '1',
      name: 'Johnson John',
      time: '1',
    },
    {
      comment: '6500 languages spoken on planet earth and man choose FACTS.',
      id: '2',
      name: 'Martins Elf',
      time: '2',
    },
    {
      comment: '6500 languages spoken on planet earth and man choose FACTS.',
      id: '3',
      name: 'Mike Donga',
      time: '3',
    },
    {
      comment: '6500 languages spoken on planet earth and man choose FACTS.',
      id: '4',
      name: 'Jackson Dame',
      time: '4',
    },
    {
      comment: '6500 languages spoken on planet earth and man choose FACTS.',
      id: '5',
      name: 'Janet Okoro',
      time: '5',
    },
    {
      comment: '6500 languages spoken on planet earth and man choose FACTS.',
      id: '6',
      name: 'Faith Hope',
      time: '6',
    },
    {
      comment: '6500 languages spoken on planet earth and man choose FACTS.',
      id: '7',
      name: 'Mary Lin',
      time: '7',
    },
  ]);
  const addComment = (user_comment) => {
    setComments((currComments) => {
      return [
        ...currComments,
        {
          comment: user_comment,
          id: Math.random().toString(),
          name: 'John Doe',
          time: Math.floor(Math.random() * 100 + 1).toString(),
        },
      ];
    });

    setComment('');
  };
  const onSubmit = () => {
    if (comment) {
      addComment(comment);
    }
    setShow(false);
  };

  return (
    <Modal
      animationType="slide"
      // animationType={!this.state.icon ? 'slide' : 'none'}
      swipeDirection="down"
      transparent={true}
      style={{
        flex: 1,
        marginLeft: 0,
        marginRight: 0,
        // height,
        marginTop: 0,
        marginBottom: 0,
        // position: 'absolute',
        // bottom: 0,
      }}
      visible={isCommentModalOpen}
      onSwipeComplete={() => dispatch(closeCommentModal())}
      onRequestClose={() => dispatch(closeCommentModal())}>
      <View style={styles.modalView}>
        <View style={styles.container}>
          <Comment_Header closeCommentModal={closeCommentModal} />
          <View style={styles.content}>
            <View style={styles.commentCont}>
              <TextInput
                style={styles.input}
                multiline={true}
                // numberOfLines={4}
                value={comment}
                placeholder="Your comment....."
                placeholderTextColor="#999"
                onChangeText={(val) => setComment(val)}
              />
              <View
                style={{
                  width: '20%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '5%',
                }}>
                {/* <TouchableOpacity activeOpacity={0.6} style={{marginRight: 10}}>
                  <Icon name="md-at" size={26} color="#999" />
                </TouchableOpacity> */}
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{marginRight: '20%'}}
                  onPress={() => setShow(!show)}>
                  <Icon name="md-happy-outline" size={26} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={onSubmit}>
                  <Icon name="ios-send" size={28} color="#f68128" />
                </TouchableOpacity>
              </View>
            </View>
            {/* COMMENTS */}
            {comments.length === 0 && (
              <View style={{width, padding: 20}}>
                <Text style={{color: '#eee'}}>No comments yet</Text>
              </View>
            )}
            {/* {comments && (
              <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <Comment_Container {...item} />}
              />
            )} */}
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

            {/* COMMENT INPUT */}

            {/* <Comment_Container /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Comment_Modal;

const styles = StyleSheet.create({
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
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    // paddingBottom: 10,
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
    borderColor: 'rgba(255,255,255,0.061)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.061)',
    // position: 'absolute',
    // top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  input: {
    color: '#eee',
    width: '80%',
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

import React, {useState} from 'react';
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
} from 'react-native';
import Comment_Header from './Component/Comment_Header';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import Comment_Container from './Component/Comment_Container';

const {width, height} = Dimensions.get('window');

const User_Comment = () => {
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
      comment: '6500 languages spoken on planet earth and man choose FACTS.',
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
    <SafeAreaView style={{flex: 1}}>
      <Comment_Header />
      <View style={styles.container}>
    

        <View style={styles.content}>
          {/* COMMENTS */}
          {comments.length === 0 && (
            <View style={{width, padding: 20}}>
              <Text style={{color: '#eee'}}>No comments yet</Text>
            </View>
          )}
          {comments && (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => <Comment_Container {...item} />}
            />
          )}
          <View>
            <EmojiBoard showBoard={show} onClick={onClick} />
          </View>

          {/* COMMENT INPUT */}
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
                // justifyContent:"space-between"
              }}>
              <TouchableOpacity activeOpacity={0.6} style={{marginRight: 10}}>
                <Icon name="md-at" size={26} color="#999" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setShow(!show)}>
                <Icon name="md-happy-outline" size={26} color="#999" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{marginLeft: 5}}
              onPress={onSubmit}>
              <Icon name="ios-send" size={28} color="#f68128" />
            </TouchableOpacity>
          </View>
          {/* <Comment_Container /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default User_Comment;

const styles = StyleSheet.create({
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
    paddingBottom: 50,
  },
  commentCont: {
    width,
    // height: 70,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#444',
    position: 'absolute',
    bottom: 0,
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

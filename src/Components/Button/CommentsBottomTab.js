import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  MentionInput,
  replaceMentionValues,
} from 'react-native-controlled-mentions';

const CommentsBottomTab = props => {
  const renderSuggestions =
    suggestions =>
    ({keyword, onSuggestionPress}) => {
      if (keyword == null) {
        return null;
      }

      return (
        <View>
          {suggestions
            .filter(one =>
              one.name
                .toLocaleLowerCase()
                .includes(keyword.toLocaleLowerCase()),
            )
            .map(one => (
              <TouchableOpacity
                key={one.id}
                onPress={() => onSuggestionPress(one)}
                style={{}}>
                <Text
                  style={{
                    color: '#F68128',
                    textTransform: 'uppercase',
                  }}>
                  {one.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      );
    };

  const renderMentionSuggestions = renderSuggestions(props.data);

  return (
    <View style={styles.commentCont}>
      <TextInput
        //   onContentSizeChange
        style={styles.input}
        multiline={true}
        // numberOfLines={4}
        // partTypes={[
        //   {
        //     trigger: '@',
        //     renderSuggestions: renderMentionSuggestions,
        //     textStyle: {fontWeight: 'bold', color: '#f68128'},
        //   },
        //   {
        //     pattern:
        //       /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
        //     textStyle: {color: '#f68128'},
        //   },
        // ]}
        value={props.comment}
        placeholder={
          props.placeholder ? props.placeholder : 'Your comment.....'
        }
        placeholderTextColor="#999"
        onChangeText={val => props.changeComment(val)}
        onFocus={() => props.clientsErr()}
        // onChange={(val) =>
        //   props.changeComment(replaceMentionValues(val, ({name}) => `@${name}`))
        // }
      />
      <View
        style={{
          width: '20%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent:"space-between"
        }}>
        {/* <TouchableOpacity activeOpacity={0.6} style={{marginRight: 10}}>
          <Icon name="md-at" size={26} color="#999" />
        </TouchableOpacity> */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => props.openEmoji()}>
          <Icon name="md-happy-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{marginLeft: 10}}
          onPress={props.onSubmit}>
          {props.loadingState ? (
            <ActivityIndicator size="small" color="#f68128" />
          ) : (
            <Icon name="ios-send" size={24} color="#f68128" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsBottomTab;

const styles = StyleSheet.create({
  commentCont: {
    width: '100%',
    // height: 70,fjgaskjdg
    borderColor: 'rgba(255,255,255,0.061)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.061)',
    // position: 'absolute',
    // top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    justifyContent: 'space-between',
  },
  input: {
    color: '#eee',
    width: '70%',
    paddingHorizontal: 10,
    height: '100%',
    // position: 'absolute',
  },
});

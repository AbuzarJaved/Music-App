import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const SearchScreenHeader = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const inputRef = useRef('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{marginRight: 15}}>
        <Icon name="md-arrow-back" size={24} color="#f68128" />
      </TouchableOpacity>
      <TextInput
        placeholder="Songs Title"
        style={{color: '#fff'}}
        ref={inputRef}
        value={text}
        placeholderTextColor="#999"
        onChangeText={(val) => setText(val)}
      />
    </View>
  );
};

export default SearchScreenHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    width,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    // position: 'absolute',
    // top: 0,
    zIndex: 100,
    elevation: 5,
    // paddingHorizontal: 20,
  },
});

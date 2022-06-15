import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const chooseBg = (val) => {
  if (val === 'primary') {
    return '#546887';
  }
  if (val === 'danger') {
    return '#900';
  }
  if (val === 'success') {
    return '#50c878';
  }
};

const Message = (props) => {
  return (
    <View style={[styles.container, {backgroundColor: chooseBg(props.color)}]}>
      <Text style={{color: '#eee', flexWrap: 'wrap', fontSize: 11}}>
        {props.children}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#900',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
});

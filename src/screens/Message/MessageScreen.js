import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

const MessageScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <Text style={{color: '#fff'}}>Message</Text>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

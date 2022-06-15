import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SingleActivityTab = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#999',
          fontWeight: '800',
          fontFamily: 'Helvetica-ExtraBold',
          fontSize: 20,
          marginTop: 30,
        }}>
        Coming Soon
      </Text>
    </View>
  );
};

export default SingleActivityTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

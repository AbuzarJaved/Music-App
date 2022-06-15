import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SingleUserActivity = () => {
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

export default SingleUserActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

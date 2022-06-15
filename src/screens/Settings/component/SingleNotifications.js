import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Switch from '../../../Components/Switch/Switch';

const SingleNotifications = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#eee',
          fontSize: scale(14),
          fontFamily: 'Helvetica-Medium',
        }}>
        {props.title}
      </Text>
      <Switch />
    </View>
  );
};

export default SingleNotifications;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.061)',
    paddingVertical: 15,
    borderBottomColor: '#f68128',
    borderWidth: 1,
    marginBottom: '20@s',
    zIndex: 100,
    paddingHorizontal: 20,
  },
});

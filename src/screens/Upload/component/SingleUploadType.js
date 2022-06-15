import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';

const UploadType = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.type === props.title ? {backgroundColor: '#222'} : null,
      ]}
      activeOpacity={0.6}
      onPress={() => props.chooseUpload()}>
      <View style={styles.singleBox}>
        <Text style={{color: '#eee', fontSize: scale(11), textAlign: 'center'}}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UploadType;

const styles = ScaledSheet.create({
  check: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#eee',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCheck: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: '#f68128',
  },
  singleBox: {
    flexDirection: 'row',
    marginRight: 10,
  },
  container: {
    borderWidth: 1,
    borderColor: '#222',
    // padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '30%',
    height: '30@s',
    // marginRight: 10,
  },
});

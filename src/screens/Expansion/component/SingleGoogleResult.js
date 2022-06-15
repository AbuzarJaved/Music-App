import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Divider from '../../../Components/Divider/Divider';

const SingleGoogleResult = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.singleResult}
      onPress={() => props.onPress()}
      // onPress={() => {
      //   setLoc(item.primaryText, item.fullText);
      // }}
      // onPress={() => props.changeUserArea(item.primaryText)}
    >
      <Text style={styles.primaryText}>{props.primaryText}</Text>
      <Text style={styles.secondaryText}>{props.fullText}</Text>
      <View style={{marginVertical: 5}}>
        <Divider />
      </View>
    </TouchableOpacity>
  );
};

export default SingleGoogleResult;

const styles = StyleSheet.create({
  resultView: {
    width: '95%',
    // height: 270,
    // borderRadius: 10,
    // backgroundColor: '#555',
    marginVertical: 10,
    zIndex: 600,
    marginLeft: 5,
    paddingTop: 10,
  },
  primaryText: {
    fontSize: 15,
    color: '#eee',
    textTransform: 'capitalize',
  },
  secondaryText: {
    fontSize: 13,
    color: '#f68128',
    textTransform: 'capitalize',
  },
  singleResult: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

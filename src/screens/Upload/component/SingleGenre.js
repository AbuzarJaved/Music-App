import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const SingleGenre = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => props.chooseGenre()}>
      <View style={styles.singleBox}>
        <View style={[styles.check]}>
          {props.genre === props.name && (
            <View style={[styles.activeCheck]}></View>
          )}
        </View>
        <Text style={{color: '#eee', fontSize: 15}}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SingleGenre;

const styles = StyleSheet.create({
  check: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#eee',
    marginRight: 20,
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
    margin: 10,
  },
});

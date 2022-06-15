import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const PlayListStateComponent = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => props.chooseValue(props.title)}>
      <View style={styles.singleBox}>
        <View style={[styles.check]}>
          {props.title === props.value && (
            <View style={[styles.activeCheck]}></View>
          )}
        </View>
        <Text style={{color: '#eee', fontSize: 15}}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlayListStateComponent;

const styles = StyleSheet.create({
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
    marginRight: 20,
  },
});

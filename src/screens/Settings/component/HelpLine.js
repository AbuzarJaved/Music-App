import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpLine = props => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '20%'}}>
        <Icon
          name={props.iconName}
          style={{marginRight: 10}}
          color={props.iconColor ? props.iconColor : '#ddd'}
          size={scale(20)}
        />
        <Text
          style={{
            color: '#ddd',
            fontSize: scale(12),
            fontFamily: 'Helvetica-Medium',
          }}>
          {props.name}
        </Text>
      </View>
      <TouchableOpacity
        style={{width: '70%'}}
        activeOpacity={0.8}
        onPress={props.onPress ? () => props.onPress() : null}>
        <Text style={styles.link}>{props.link}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpLine;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.061)',
    paddingVertical: 20,
    borderBottomColor: '#f68128',
    // borderBottomColor: '#333',
    borderWidth: 1,
    // borderRadius: 10,
    marginBottom: '20@s',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    justifyContent: 'space-between',
  },
  link: {
    color: '#eee',
    fontSize: '10@s',
    textAlign: 'right',
    color: '#f68128',
    fontFamily: 'Helvetica-Medium',
  },
});

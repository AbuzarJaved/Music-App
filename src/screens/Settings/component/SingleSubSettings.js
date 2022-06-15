import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

const SingleSubSettingsCont = (props) => {
  return (
    <View style={styles.container}>
      <View style={{width: '90%'}}>
        <Text style={styles.settingTitle}>{props.title}</Text>
        {props.text && <Text style={styles.settingSubTitle}>{props.text}</Text>}
      </View>
      <TouchableOpacity
        style={{width: '10%'}}
        hitSlop={{top: 30, right: 30, left: 30, bottom: 30}}
        onPress={props.onPress ? () => props.onPress() : null}
        activeOpacity={0.7}>
        {props.version ? (
          <Text
            style={{
              fontSize: 13,
              color: '#eee',
              fontFamily: 'Helvetica-Medium',
            }}>
            {props.version}
          </Text>
        ) : (
          <Icon name="chevron-forward" color="#999" size={24} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SingleSubSettingsCont;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.061)',
    paddingVertical: 15,
    borderBottomColor: '#f68128',
    // borderBottomColor: '#333',
    borderWidth: 1,
    // borderRadius: 10,
    marginBottom: '20@s',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  settingTitle: {
    color: '#eee',
    fontFamily: 'Hevletica-Medium',
    fontSize: '14@s',
  },
  settingSubTitle: {
    color: '#999',
    fontFamily: 'Hevletica-Regular',
    fontSize: '10@s',
    marginTop: 2,
  },
});

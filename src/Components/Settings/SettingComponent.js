import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Switch from '../Switch/Switch';

const SettingComponent = ({title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{color: '#999', fontSize: 14, marginTop: 2}}>{title}</Text>
      <Switch />
    </View>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({});

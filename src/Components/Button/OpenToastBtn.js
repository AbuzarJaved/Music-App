import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OpenToastBtn = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onPress()}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          name="ellipsis-horizontal-sharp"
          color="#eee"
          size={25}
          style={{marginBottom: 8}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OpenToastBtn;

const styles = StyleSheet.create({});

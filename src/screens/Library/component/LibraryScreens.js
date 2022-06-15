import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const LibraryScreens = ({link, screen, icon, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onPress()}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        {icon()}
        <Text style={{color: '#eee', fontSize: 15, marginLeft: 15}}>
          {link}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LibraryScreens;

const styles = StyleSheet.create({});

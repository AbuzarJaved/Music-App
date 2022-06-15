import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderBackBtn = ({navigation, title, onPress, showEllipsBtn}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
        hitSlop={{top: 50, left: 50, right: 50, bottom: 50}}>
        <Icon name="md-arrow-back" color="#f68128" size={30} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      {showEllipsBtn ? (
        <TouchableOpacity
          onPress={onPress ? () => onPress() : null}
          activeOpacity={0.7}
          hitSlop={{top: 50, left: 50, right: 50, bottom: 50}}>
          <Icon name="md-ellipsis-vertical" size={26} color="#f68128" />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default HeaderBackBtn;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5,
  },
});

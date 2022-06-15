import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderDrawerBtn = ({navigation, title, statusBar}) => {
  return (
    <View style={styles.header}>
      <Icon
        name="ios-menu"
        color="#f68128"
        size={30}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Text style={styles.headerText}>{title}</Text>
      <Icon name="md-ellipsis-vertical" size={26} color="#f68128" />
    </View>
  );
};

export default HeaderDrawerBtn;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height:80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#eee',
      fontFamily: 'Gilroy-Bold',
    letterSpacing: .5
  },
});

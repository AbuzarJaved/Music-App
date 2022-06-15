import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {openNotificationFilterModal} from '../../../redux/actions/notificationFilterActions';
import {useNavigation} from '@react-navigation/native';

const NotificationsHeader = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.subHeader}>
      {props.showBackBtn && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={{marginTop: 3, right: '0%'}}
          hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}>
          <Icon
            name="arrow-back"
            color="#f68128"
            size={24}
            // style={{marginTop: 3, marginLeft: 10, zIndex: 100}}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      )}

      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          width: '80%',
          textAlign: 'center',
          fontFamily: 'Helvetica-Medium',
        }}>
        {props.title}
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{marginTop: 3, right: '0%'}}
        hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}>
        <Icon
          name="md-options"
          color="#f68128"
          size={24}
          // style={{marginTop: 3, marginLeft: 10, zIndex: 100}}
          onPress={
            props.onPress
              ? () => props.onPress()
              : () => dispatch(openNotificationFilterModal())
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default NotificationsHeader;

const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#333',
    borderWidth: 1,
  },
});

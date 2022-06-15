import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
// import {openNotificationFilterModal} from '../../../redux/actions/notificationFilterActions';t
import {useNavigation} from '@react-navigation/native';
import EditUserIcon from '../../../Components/Icons/EditUserIcon';

const CommonHeader = (props) => {
  //   const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.subHeader}>
      <TouchableOpacity
        onPress={props.func ? () => props.func() : () => navigation.goBack()}
        activeOpacity={0.7}
        hitSlop={{top: 50, left: 50, right: 50, bottom: 50}}>
        <Icon name="md-arrow-back" color="#f68128" size={24} />
      </TouchableOpacity>
      <Text
        style={{
          color: '#fff',
          fontSize: 17,
          width: '80%',
          textAlign: 'center',
          fontFamily: 'Helvetica-Medium',
        }}>
        {props.title}
      </Text>
      {props.showLeftIcon ? (
        <TouchableOpacity
          hitSlop={{top: 50, left: 50, right: 50, bottom: 50}}
          activeOpacity={0.6}
          onPress={props.onPress ? () => props.onPress() : null}
          style={{marginTop: 3, right: '0%'}}>
          <EditUserIcon color="#F68128" width={20} height={20} />
          {/* <Icon
            //   name="md-options"
            name={props.icon ? props.icon : 'md-ellipsis-vertical'}
            color="#f68128"
            size={24}
            // style={{marginTop: 3, marginLeft: 10, zIndex: 100}}
          /> */}
        </TouchableOpacity>
      ) : (
        <View style={{width: '5%'}}></View>
      )}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#1A1A1A',
    borderWidth: 1,
  },
});

import React from 'react';
import {Dimensions, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeCommentModal,
  closeMediaCommentModal,
} from '../../../redux/actions/commentModal';
const {width, height} = Dimensions.get('window');
import {mainNumberFormat} from '../../../utils/loggedInUserType'

const Comment_Header = ({likes, closeCommentModal,mediaComment}) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '80%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          activeOpacity={0.2}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          // onPress={() => navigation.goBack()}
          onPress={() => dispatch(closeCommentModal())}
          style={{marginRight: 15}}>
          <Icon
            onPress={() => dispatch(closeCommentModal())}
            name="chevron-down"
            size={30}
            color="#f68128"
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#EEE', fontSize: 16}}>
            &nbsp;Comments&nbsp;({mainNumberFormat(mediaComment)})
          </Text>
        </View>
        <View style={{width: '10%'}}></View>
      </View>
    </View>
  );
};

export default Comment_Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 0,
    zIndex: 100,
    elevation: 5,
    justifyContent: 'space-between',
  },
});

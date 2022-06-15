import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const EditProfileBtn = (props) => {
  return (
    <LinearGradient
      colors={['#feee3e', '#f68128', '#f68128']}
      style={[styles.btn]}>
      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        {...props}
        onPress={() => props.onPress()}
        style={styles.btn2}>
        <Text style={[styles.btnText]}>Edit Profile</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default EditProfileBtn;

const styles = ScaledSheet.create({
  btn: {
    width: '80@s',
    borderRadius: 5,
    height: '33@s',
    // padding: 12,
    backgroundColor: '#f68128',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '10@s',
    fontFamily: 'Helvetica-Medium',
    textTransform: 'capitalize',
    // letterSpacing: 2,
    // width: '100%',
    // lineHeight: -2,
  },
});

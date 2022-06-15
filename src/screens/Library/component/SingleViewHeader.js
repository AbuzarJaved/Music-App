import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const SingleViewHeader = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{props.title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        onPress={props.onPress ? () => props.onPress() : null}>
        <Text
          style={{
            color: '#999',
            fontSize: scale(10),
            fontFamily: 'Helvetica-Bold',
          }}>
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleViewHeader;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    textTransform: 'capitalize',
    fontSize: '15@s',
    fontFamily: 'Helvetica-ExtraBold',
  },
});

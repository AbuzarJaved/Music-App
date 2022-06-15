import React from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader/CommonHeader';
import SingleNotifications from '../../component/SingleNotifications';

const {width, height} = Dimensions.get('window');

const index = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Notifications'/>
      <View style={styles.content}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}>
            <SingleNotifications title='In-app notifications'/>
            <SingleNotifications title='SMS notifications'/>
          </ScrollView>
      </View>
      <Text></Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
});

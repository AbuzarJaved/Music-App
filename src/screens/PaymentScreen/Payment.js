import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CustomHeader from '../Notifications/component/CustomHeader';
import PaymentOptions from './component/PaymentOptions';

const {width, height} = Dimensions.get('window');

const Payment = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomHeader title="Payment Methods" />
        <ScrollView
          // contentContainerStyle={{width}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={{marginTop: 50, width: '80%'}}>
              <Text
                style={{
                  color: '#eee',
                  fontSize: 18,
                  fontFamily: 'Gilroy-Bold',
                }}>
                Proceed with any of the payment options
              </Text>
            </View>
            {/* Methods */}
            <View style={{marginTop: 50}}>
              <PaymentOptions />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#000',
  },
  content: {
    marginTop: 70,
    width,
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 20,
    // height
  },
});

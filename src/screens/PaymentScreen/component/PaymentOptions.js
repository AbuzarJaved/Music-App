import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PalPalIcon from '../../../Components/Icons/PayPalIcon';
import SkrillIcon from '../../../Components/Icons/SkrillIcon';
import VisaIcon from '../../../Components/Icons/VisaIcon';
import StripeIcon from '../../../Components/Icons/StripeIcon';
import Button from '../../../Components/Button/LoginBtn';

const PaymentOptions = () => {
  const [method, setMethod] = useState('');
  const chooseMethod = (method) => {
    setMethod(method);
  };
  useEffect(() => {
    console.log(method);
  }, [method]);

  return (
    <View style={{width: '100%', height: '100%'}}>
      {/* Single Payment Method */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.container}
        onPress={() => chooseMethod('paypal')}>
        <PalPalIcon width={150} height={150} />
        <View style={styles.checkBox}>
          <View style={[method === 'paypal' ? styles.active : {}]}></View>
        </View>
      </TouchableOpacity>
      {/* Single Payment Method */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.container}
        onPress={() => chooseMethod('skrill')}>
        <SkrillIcon width={150} height={150} />
        <View style={styles.checkBox}>
          <View style={[method === 'skrill' ? styles.active : {}]}></View>
        </View>
      </TouchableOpacity>
      {/* Single Payment Method */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.container}
        onPress={() => chooseMethod('visa')}>
        <VisaIcon width={150} height={150} />
        <View style={styles.checkBox}>
          <View style={[method === 'visa' ? styles.active : {}]}></View>
        </View>
      </TouchableOpacity>
      {/* Single Payment Method */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.container}
        onPress={() => chooseMethod('stripe')}>
        <StripeIcon width={150} height={150} />
        <View style={styles.checkBox}>
          <View style={[method === 'stripe' ? styles.active : {}]}></View>
        </View>
      </TouchableOpacity>
      {/* BUTTON */}
      <View style={{width: '80%', marginTop: 30, alignSelf: 'center'}}>
        <Button title="Pay Now" onPress={() => null} />
      </View>
    </View>
  );
};

export default PaymentOptions;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 5,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: '#f68128',
  },
});

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Transaction from '../component/Transaction';
import LineChart from '../component/Charts/LineChart';

const {width, height} = Dimensions.get('window');

const LastMonth = () => {
  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
        <StatusBar backgroundColor="#000" />
        <View style={styles.content}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#999', '#222', '#222', '#222']}
            style={styles.graph}>
            <Image
              source={require('../../../assests/images/verification.png')}
              style={styles.verificationImage}
            />
            <LineChart  />
          </LinearGradient>
          {/* TRANSACTIONS */}
          <View style={styles.transaction}>
            <Text
              style={{color: '#eee', fontSize: 15, fontFamily: 'Gilroy-Bold'}}>
              Transactions
            </Text>
            <View style={{marginTop: 20}}>
              <Transaction />
              <Transaction />
              <Transaction />
              <Transaction />
              <Transaction />
            </View>
          </View>
        </View>
      </View>
    // </SafeAreaView>
  );
};

export default LastMonth;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#000',
    width,
    // height,
    marginTop: 20,
  },
  content: {
    width,
    paddingBottom: 10,
    // flex:1,
  },
  graph: {
    width: '90%',
    borderRadius: 10,
    height: 220,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 20,
  },
  verificationImage: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    position: 'absolute',
    right: 15,
    top: 5,
  },
  transaction: {
    marginTop: 40,
  },
});


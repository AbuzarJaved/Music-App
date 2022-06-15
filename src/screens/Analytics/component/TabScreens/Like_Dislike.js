import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import ProgressChart from '../Charts/ProgressChart';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const Like_Dislike_Screen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.content}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          colors={['#222', '#222', '#222', '#222']}
          style={styles.graph}>
          <Image
            source={require('../../../../assests/images/verification.png')}
            style={styles.verificationImage}
          />
          <ProgressChart />
        </LinearGradient>
        <View style={styles.details}>
          {/* Single Details */}
          <View style={styles.singleDetails}>
            <Text style={{color: '#f68128', fontSize: 20, flexWrap: 'wrap'}}>
              Total likes this week
            </Text>
            <Text style={{color: '#eee', fontSize: 20}}>2000</Text>
          </View>
          {/* Single Details */}
          <View style={styles.singleDetails}>
            <Text style={{color: '#f68128', fontSize: 20, flexWrap: 'wrap'}}>
              Total Dislikes this week
            </Text>
            <Text style={{color: '#eee', fontSize: 20}}>1000</Text>
          </View>
          {/* Single Details */}
          <View style={styles.singleDetails}>
            <Text style={{color: '#f68128', fontSize: 20, flexWrap: 'wrap'}}>
              Total likes this month
            </Text>
            <Text style={{color: '#eee', fontSize: 20}}>3000</Text>
          </View>
          {/* Single Details */}
          <View style={styles.singleDetails}>
            <Text style={{color: '#f68128', fontSize: 20, flexWrap: 'wrap'}}>
              Total Dislikes this month
            </Text>
            <Text style={{color: '#eee', fontSize: 20}}>30000</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Like_Dislike_Screen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width,

    marginTop: 10,
  },
  content: {
    width,
    paddingBottom: 40,
  },
  graph: {
    width: '90%',
    borderRadius: 10,
    height: 250,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  details: {
    width: '90%',
    height: 300,
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#222',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  singleDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
});

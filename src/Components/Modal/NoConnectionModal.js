import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {scale, ScaledSheet} from 'react-native-size-matters';
import NetworkIcon from '../Icons/NetworkIcon';
import CommonHeader from '../CustomHeader/CommonHeader';

const {width, height} = Dimensions.get('window');

const NoConnectionModal = props => {
  return (
    <Modal
      animationIn="slideInDown"
      isVisible={props.visible}
      onSwipeComplete={() => props.closeNetworkModal()}
      onRequestClose={() => props.closeNetworkModal()}
      style={{
        flex: 1,
        margin: 0,
      }}>
      <View style={styles.mainView}>
        <View style={styles.subHeader}>
          <Text
            style={{
              color: '#fff',
              fontSize: scale(16),
              width: '80%',
              textAlign: 'center',
              fontFamily: 'Helvetica-Medium',
            }}>
            Network Status
          </Text>
        </View>
        <View style={styles.subContent}>
          <NetworkIcon />
          <Text
            style={{
              color: '#eee',
              textAlign: 'center',
              fontSize: scale(15),
              fontFamily: 'Helvetica-Medium',
              marginVertical: scale(20),
            }}>
            No internet Connection
          </Text>
          <Text
            style={{
              color: '#c7c7c7',
              fontSize: scale(12),
              textAlign: 'center',
              paddingHorizontal: 10,
            }}>
            Your internet connection is currently not available please check
            your network settings!
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default NoConnectionModal;

const styles = ScaledSheet.create({
  mainView: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000',
    width,
    height,
    paddingTop: '10@s',
  },
  subContent: {
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#1A1A1A',
    borderWidth: 1,
  },
});

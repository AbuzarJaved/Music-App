import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

const AlertComponent = (props) => {
  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={props.showAlert}
        showProgress={false}
        title="Unfollow"
        message={`Stop following ${props.stageName}?`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Unfollow"
        confirmButtonColor="#f68128"
        onCancelPressed={() => {
          props.hideAlert();
        }}
        onConfirmPressed={() => {
          props.unfollowArtist();
        }}
      />
    </View>
  );
};

export default AlertComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});

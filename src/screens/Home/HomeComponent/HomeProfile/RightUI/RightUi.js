import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Follower from './Follower';

const RightUi = () => {
  return (
    <View style={styles.container}>
      <View>
        <Follower />

        {/* BOTTOM CONTENT */}
        {/* <View style={styles.bottomContent}>
          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={styles.Btn}>
            <Text style={{color: '#eee', fontSize: 10}}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={styles.Btn}>
            <Text style={{color: '#eee', fontSize: 10}}>Insight</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default RightUi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    flexDirection: 'column',
  },

  bottomContent: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
    marginLeft: -15,
  },
  Btn: {
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 20,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
});

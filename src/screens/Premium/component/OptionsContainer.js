import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const OptionsContainer = ({icon, title}) => {
  return (
    <View style={styles.container}>
      <View style={{marginRight: 20}}>{icon()}</View>
      <Text
        style={{
          color: '#eee',
          fontSize: 20,
          fontFamily: 'Gilroy-Bold',
          width: '60%',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default OptionsContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '85%',
    height: 120,
    backgroundColor: '#222',
    borderRadius: 5,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});

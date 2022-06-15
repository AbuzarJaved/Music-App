import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


const SmallPlayIcon = () => {
    return (
      <View style={styles.playIconContainer}>
        <Icon name="ios-caret-forward" color="#f68128" />
      </View>
    );
}

export default SmallPlayIcon

const styles = StyleSheet.create({
  playIconContainer: {
    borderColor: '#f68128',
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
});

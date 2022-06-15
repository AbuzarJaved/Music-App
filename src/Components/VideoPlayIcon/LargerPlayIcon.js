import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


const LargerPlayIcon = () => {
    return (
      <View style={styles.playIconContainer}>
            <Icon name="ios-caret-forward" color="#f68128" size={30} style={{paddingLeft: 3}}/>
      </View>
    );
}

export default LargerPlayIcon

const styles = StyleSheet.create({
  playIconContainer: {
    borderColor: '#f68128',
    borderWidth: 1,
    borderRadius:40 / 2 ,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    position: 'absolute',
    top: '40%',
    left: '40%',
    },
   
});

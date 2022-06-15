import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const CheckAnim = ({width,height}) => {
    return (
        // <View style={{width,height}}>
            <Image style={{width,height}} source={require('../../assests/Animations/animation_500_kifm2wyy.gif')} />
        // </View>
    )
}

export default CheckAnim

const styles = StyleSheet.create({})

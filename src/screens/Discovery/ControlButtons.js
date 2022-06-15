import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ControlButtons = () => {
    return (
        <View style={{flex: 1, justifyContent:"center", alignContent: 'center', borderColor:'#500', backgroundColor:'#500', borderRadius: 80 / 2, height: 80, width: 80}}>
            <Icon name='thumbs-down' size={28} color="red"/>
        </View>
    )
}

export default ControlButtons

const styles = StyleSheet.create({})

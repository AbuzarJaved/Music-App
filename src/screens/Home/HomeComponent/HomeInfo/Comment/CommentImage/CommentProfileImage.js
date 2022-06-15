import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const CommentImage = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../../../../../assests/images/caro3.jpg')} style={{width: 60, height:60,borderRadius: 60 / 2}}/>
        </View>
    )
}

export default CommentImage

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
        width:'15%'
    }
})

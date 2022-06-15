import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Like from '../../../Components/Button/LikeBtn';
import PlaylistImagePlacHolder from '../../../assests/images/image-placeholder.png';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaylistComponent2 = () => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default PlaylistComponent2

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    width: 70,
    height: 70,
    marginRight: 10,
  },
});

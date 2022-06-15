import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LikeBtn from '../../../Components/Button/LikeBtn';
import VerticalBtn from '../../../Components/Button/EllipisisVeticalIcon';

const AlbumSongs = ({index,title,name}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{width: '80%', flexDirection: 'row'}}>
              <Text style={{ color: '#f68128', fontSize: 15 }}>{ index + 1}</Text>
        <View style={{marginLeft: 10}}>
          <Text
            style={{color: '#eee', fontSize: 13, fontFamily: 'Gilroy-Bold'}}>
            {title}
          </Text>
          <Text
            style={{
              color: '#999',
              fontSize: 11,
              fontFamily: 'Gilroy-Bold',
              textTransform: 'capitalize',
              marginTop: 5,
            }}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.btn}>
        <LikeBtn col />
        <VerticalBtn color="#999" />
      </View>
    </View>
  );
};

export default AlbumSongs;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
  },
});

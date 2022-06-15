import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const CustomHeader = ({title, title2, onPress, func}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container2}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={func ? () => func() : () => navigation.goBack()}
          style={{marginRight: 15}}>
          <Icon name="md-arrow-back" size={24} color="#f68128" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#eee',
            fontSize: 15,
            textAlign: 'center',
            fontFamily: 'Helvetica-Medium',
          }}>
          {title}
        </Text>
        <View style={{width: '10%'}}></View>
      </View>
      {title2 && (
        <TouchableOpacity activeOpacity={0.6} onPress={() => onPress()}>
          <Text
            style={{
              color: '#f68128',
              fontSize: 15,
              fontFamily: 'Helvetica-Medium',
            }}>
            SAVE
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    width,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 0,
    zIndex: 100,
    elevation: 5,
    justifyContent: 'space-between',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#1A1A1A',
    borderWidth: 1,
    paddingHorizontal: 20,
  },
});

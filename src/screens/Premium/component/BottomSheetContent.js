import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import Button from '../../../Components/Button/LoginBtn';
import {useNavigation} from '@react-navigation/native';

const data = [
  {period: 'Weekly', price: 7.99},
  {period: 'Monthly', price: 11.99},
  {period: 'Annually', price: 119.99},
];

const BottomSheetContent = ({onPress}) => {
  const navigation = useNavigation();
  const navigate = () => {
    onPress.current.snapTo(1);
    navigation.navigate('Payment');
  };
  return (
    <View
      style={{
        backgroundColor: '#1A1A1A',
        height: '100%',
        paddingHorizontal: 50,
        paddingTop: 20,
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onPress.current.snapTo(1)}
        hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}>
        <View style={styles.bar}></View>
      </TouchableOpacity>
      <View style={styles.content}>
        {/* Single Subscription */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.period}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
              }}>
              <View style={{width: '60%'}}>
                <Text
                  style={{
                    color: '#eee',
                    fontSize: 20,
                    fontFamily: 'Gilroy-Bold',
                  }}>
                  {item.period}
                </Text>
                <Text style={{color: '#f68128', fontSize: 15, marginTop: 5}}>
                  $ {item.price}
                </Text>
              </View>
              {/* Btn */}
              <View style={{width: '40%'}}>
                <Button title="Upgrade" onPress={() => navigate()} />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default BottomSheetContent;

const styles = StyleSheet.create({
  bar: {
    width: 100,
    height: 6,
    backgroundColor: '#f68128',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
  content: {
    marginTop: 30,
    width: '100%',
  },
});

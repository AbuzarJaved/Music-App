import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import data2 from '../../data2';
import {useNavigation} from '@react-navigation/native'
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const  HomeHeader = () => {
  const navigation = useNavigation()
  const carousel = data2.map((data, index) => (
    <ImageBackground
      source={data.image}
      style={{width, height: height / 2, position: 'absolute', top: 0}}
      blurRadius={90}
      borderBottomRightRadius={20}
      borderBottomLeftRadius={20}
      key={index}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.4,
          zIndex: 50,
          // borderRadius: 10,
        }}
      />
      <View style={styles.container}>
        <View style={styles.CarouselContainer}>
          {data.route && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(`${data.route}`, {
                  screen: `${data.route}`,
                })
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}>
              <Image
                resizeMode="cover"
                source={data.image}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
            }}>
            <Image
              resizeMode="cover"
              source={data.image}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                resizeMode: 'cover',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  ));
  return (
    <Swiper
      style={{height: height / 2}}
      autoplay={true}
      autoplayTimeout={10}
      activeDotColor="#f68126">
      {carousel}
    </Swiper>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 70,
    marginLeft:10,
    zIndex:100
  },
  CarouselContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,

    // shadowColor: 'rgba(10,23,24,0.9)',
    // shadowOpacity: 1,
    // shadowOffset: {
    //   width: 50,
    //   height: 50,
    // },
    // elevation: 10,
  },
});

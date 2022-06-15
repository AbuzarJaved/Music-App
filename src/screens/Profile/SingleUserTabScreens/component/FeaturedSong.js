import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import Image1 from '../../../../assests/images/caro2.jpg';
import Image2 from '../../../../assests/images/caro5.jpg';
import IconsCont from './IconsCont';

const FeaturedSong = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        borderRadius={20}
        style={styles.backgroundImage}
        source={Image1}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#000',
            opacity: 0.4,
          }}
        />
        <View style={styles.flexContainer}>
          <View style={{width: 100, height: 100, marginRight: 10}}>
            <Image source={Image1} style={styles.songImage} />
          </View>
          <View style={styles.otherContent}>
            <Text style={styles.songtitle}>
              Shine on you crazy Diamond ft Bassey Judith
            </Text>
            <Text style={styles.songTime}>11:45</Text>
            <View style={{marginTop: 10}}>
              <IconsCont />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default FeaturedSong;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexContainer: {
    width: '100%',
    flexDirection: 'row',

    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  songImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  songtitle: {
    color: '#eee',
    width: '75%',
  },
  otherContent: {
    width: '80%',
  },
  songTime: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
});

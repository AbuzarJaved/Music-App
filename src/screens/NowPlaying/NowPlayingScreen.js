import React, {useEffect, useState, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import PlayerContext from '../../PlayerContext/PlayerContext';
import LinearGradient from 'react-native-linear-gradient';
import LoadingAmin from '../../Components/Animations/Small_LoadingAnime';

import SliderComponent from '../../Components/Slider/Slider';

const {width, height} = Dimensions.get('window');

class NowPlaying extends Component {
  static contextType = PlayerContext;

  render() {
    if (this.context.isEmpty || !this.context.currentTrack) return null;

    const toggleMiniPlayerMode = () => {
      this.props.navigation.goBack();
    };
    console.log(this.context.currentTrack,'MUSIC');
    return (
      <View
        style={[
          {
            height,

            backgroundColor: '#1A1A1A',
            zIndex: 100,
          },
        ]}>
        <View
          style={[
            {
              width,
              alignItems: 'center',
              height: '100%',

              flex: 1,
              paddingHorizontal: 5,
              marginTop: 15,
            },
          ]}>
          <View
            style={{
              width,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              hitSlop={{top: 100, left: 100, right: 100, bottom: 100}}
              onPress={() => toggleMiniPlayerMode()}>
              <Icon name="chevron-down" size={28} color="#eee" />
            </TouchableOpacity>
            <Text style={{color: '#eee', fontSize: 12, alignSelf: 'center'}}>
              Now Playing
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              hitSlop={{top: 100, left: 100, right: 100, bottom: 100}}>
              <Icon name="ellipsis-vertical" size={28} color="#eee" />
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                width: '80%',
                height: height / 2.2,
                borderRadius: 10,
              },
            ]}>
            <Image
              source={{uri: this.context.currentTrack.image}}
              style={{width: null, height: '100%', borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                color: '#eee',
                textTransform: 'capitalize',
                fontSize: 20,
                textAlign: 'center',
                fontFamily: 'Gilroy-ExtraBold',
              }}
              numberOfLines={1}>
              {this.context.currentTrack.title}
            </Text>
            <Text
              style={{
                color: '#F68128',
                textTransform: 'capitalize',
                fontSize: 11,
                textAlign: 'center',
                fontFamily: 'Gilroy-ExtraBold',
              }}
              numberOfLines={1}>
              {this.context.currentTrack.artist}
            </Text>
          </View>

          <View style={{width, paddingHorizontal: 20, marginTop: 20}}>
            <SliderComponent color="#999" showTime />
          </View>

          <View
            style={{
              width,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 20,
              alignItems: 'center',

              marginTop: 50,
            }}>
            <TouchableOpacity activeOpacity={0.6} style={styles.icon}>
              <Icon name="repeat" color="#eee" size={22} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.icons}>
              <Icon name="play-skip-back" color="#f68128" size={24} />
            </TouchableOpacity>

            {this.context.isPlaying && (
              <TouchableOpacity
                onPress={() => this.context.pause()}
                onLongPress={() => this.context.pause()}
                hitSlop={{top: 100, right: 100, left: 100, bottom: 100}}
                style={styles.IconCont}>
                <Icon
                  name="pause"
                  color="#eee"
                  size={30}
                  style={{paddingLeft: 2}}
                />
              </TouchableOpacity>
            )}
            {this.context.isPaused && (
              <TouchableOpacity
                onPress={() => this.context.play()}
                style={styles.IconCont}>
                <Icon
                  name="play"
                  color="#eee"
                  size={30}
                  style={{paddingLeft: 3}}
                />
              </TouchableOpacity>
            )}
            {this.context.isStopped && (
              <TouchableOpacity
                onPress={() => this.context.play()}
                style={styles.IconCont}>
                <Icon
                  name="play"
                  color="#eee"
                  size={30}
                  style={{paddingLeft: 3}}
                />
              </TouchableOpacity>
            )}
            {this.context.isBuffering && (
              <TouchableOpacity>
                <LoadingAmin width={50} height={50} />
              </TouchableOpacity>
            )}
            <TouchableOpacity activeOpacity={0.6} style={styles.icons}>
              <Icon name="play-skip-forward" color="#f68128" size={24} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.icon}>
              <Icon name="shuffle" color="#eee" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default NowPlaying;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  IconCont: {
    marginRight: 15,
    borderRadius: 60 / 2,

    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,

    backgroundColor: '#f68128',
    shadowColor: '#fff',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5,

    elevation: 16,
  },
  iconCount2: {
    borderRadius: 50 / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,

    backgroundColor: '#f68128',
  },
  icons: {
    borderRadius: 40 / 2,

    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#111',
  },
  icon: {
    borderRadius: 30 / 2,

    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f68128',
  },
  artistDetail: {},
});

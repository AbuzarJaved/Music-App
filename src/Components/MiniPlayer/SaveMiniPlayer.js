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
import {
  usePlayerContext,
  PlayerConsumer,
} from '../../PlayerContext/PlayerContext';
import PlayerContext from '../../PlayerContext/PlayerContext';
import LinearGradient from 'react-native-linear-gradient';

import SliderComponent from '../Slider/Slider';

const {width} = Dimensions.get('window').width;

class MiniPlayer extends Component {
  // playerContext = usePlayerContext();
  // const [value, setValue] = useState(0);

  // useEffect(() => {
  //   if (playerContext.currentTrack) {
  //     playerContext.play(playerContext.currentTrack);
  //   }
  //   return () => {
  //     playerContext.currentTrack == '';
  //   };
  // }, [playerContext.currentTrack]);

  // if (playerContext.isEmpty || !playerContext.currentTrack) {
  //   return null;
  // }
  // console.log(props);
  static contextType = PlayerContext;
  render() {
    if (this.context.isEmpty || !this.context.currentTrack) return null;

    return (
      <LinearGradient
        colors={['#1A1A1A', '#1A1A1A', '#1A1A1A']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.mini}>
        <View style={styles.container}>
          <View
            style={{
              position: 'absolute',
              bottom: 38,
              height: 30,
              left: 0,
              right: 0,
              width: '100%',
            }}>
            <SliderComponent color="#f68148" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width,
              alignItems: 'center',
              height: '100%',
              flex: 1,
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 45 / 2,
                marginRight: 10,
              }}>
              <Image
                // source={require('../../assests/images/Background.jpg')}
                source={this.context.currentTrack.image}
                style={{width: 45, height: 45, borderRadius: 45 / 2}}
              />
            </View>
            <View style={styles.artistDetail}>
              <Text
                style={{
                  color: '#eee',
                  textTransform: 'capitalize',
                  fontSize: 14,
                }}
                numberOfLines={1}>
                {this.context.currentTrack.title}
                {/* hello */}
              </Text>
              <Text
                style={{
                  color: '#eee',
                  textTransform: 'capitalize',
                  fontSize: 11,
                }}
                numberOfLines={1}>
                {this.context.currentTrack.artist}
              </Text>
            </View>
            <View>
              {this.context.isPlaying && (
                <TouchableOpacity
                  onPress={() => this.context.pause()}
                  style={styles.IconCont}>
                  <Icon
                    name="pause"
                    color="#eee"
                    size={25}
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
                    size={25}
                    style={{paddingLeft: 3}}
                  />
                </TouchableOpacity>
              )}
              {this.context.isBuffering && (
                <TouchableOpacity>
                  <ActivityIndicator color="#f68128" size="large" />
                </TouchableOpacity>
              )}
              {/* <Icon name="play" color="#f68128" size={36} style={{marginLeft: 20}} /> */}
            </View>
          </View>
        </View>
      </LinearGradient>
      // <PlayerConsumer>
      //   {(playerContext) => {

      //   }}
      // </PlayerConsumer>
    );
  }
}

export default MiniPlayer;

const styles = StyleSheet.create({
  container: {
    width,
    height: 60,
    position: 'relative',
    // paddingBottom:10
    // backgroundColor: 'rgba(0,0,0,0.6)',
  },
  IconCont: {
    marginRight: 15,
    borderRadius: 40 / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderColor: '#eee',
  },
  artistDetail: {
    flex: 1,
  },
  // mini: {
  //   opacity: 0.7,
  // },
});

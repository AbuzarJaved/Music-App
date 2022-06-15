import React, {useEffect, useState, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import PlayerContext from '../../PlayerContext/PlayerContext';
import LinearGradient from 'react-native-linear-gradient';
// import  from 'react-native-track-player';

import SliderComponent from '../../Components/Slider/Slider';
import {Easing} from 'react-native-reanimated';

const {width, height: Screen_height} = Dimensions.get('window');

class MiniPlayer extends Component {
  static contextType = PlayerContext;
  constructor(props) {
    super(props);
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        this.state.animation.extractOffset();
      },
      onPanResponderMove: (event, gestureState) => {
        this.state.animation.setValue({x: 0, y: gestureState.dy});
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.moveY > Screen_height + 60) {
          Animated.spring(this.state.animation.y, {
            toValue: 80,
            tension: 1,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.moveY < -Screen_height - 60) {
          Animated.spring(this.state.animation.y, {
            toValue: 80,
            tension: 1,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy < 0) {
          Animated.spring(this.state.animation.y, {
            toValue: Screen_height - 60,
            tension: 1,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.spring(this.state.animation.y, {
            toValue: -Screen_height + 60,
            tension: 1,
            useNativeDriver: false,
          }).start();
        }
      },
    });
    const closePlayer = () => {
      Animated.spring(this.state.animation.y, {
        toValue: Screen_height - 60,
        tension: 1,
        useNativeDriver: false,
      }).start();
    };
    this.state = {
      animation: new Animated.ValueXY({x: 0, y: Screen_height}),
      panResponder,
      closePlayer,
    };
  }

  // componentDidMount() {

  // }

  render() {
    if (this.context.isEmpty || !this.context.currentTrack) return null;

    const animatedImageHeight = this.state.animation.y.interpolate({
      inputRange: [0, Screen_height - 300, Screen_height - 20],
      outputRange: [15, 200, Screen_height / 2.2],
      extrapolate: 'clamp',
    });
    const animatedImageWidth = this.state.animation.y.interpolate({
      inputRange: [0, Screen_height - 300, Screen_height - 20],
      outputRange: [15, 200, Screen_height / 2.2],
      extrapolate: 'clamp',
    });
    const animatedOpacityTile = this.state.animation.y.interpolate({
      inputRange: [0, Screen_height - 300, Screen_height - 60],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const animatedOpacityIcon = this.state.animation.y.interpolate({
      inputRange: [0, Screen_height - 60],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const animatedMargin = this.state.animation.y.interpolate({
      inputRange: [0, Screen_height - 60],
      outputRange: [-75, 0],
      extrapolate: 'clamp',
    });
    const animatedMarginLeft = this.state.animation.y.interpolate({
      inputRange: [0, Screen_height - 60],
      outputRange: [-width / 1.2, 0],
      extrapolate: 'clamp',
    });
    const animatedTopPosition = this.state.animation.y.interpolate({
      inputRange: [0, Screen_height - 60],
      outputRange: [8, 0],
      extrapolate: 'clamp',
    });
    const animatedLeftPosition = this.state.animation.y.interpolate({
      inputRange: [0, Screen_height - 60],
      outputRange: [width / 7, 0],
      extrapolate: 'clamp',
    });

    const animatedHeight = {
      transform: [...this.state.animation.getTranslateTransform()],
    };
    const closePlayer = () => {
      //  if (gestureState.dy > 0) {
      Animated.timing(this.state.animation.y, {
        toValue: 60,
        duration: 500,
        useNativeDriver: true,
      }).start();
      //  }
    };

    // DESTRUCTURING PANRESPONDER
    let handles = this.state.panResponder.panHandlers;
    return (
      // <LinearGradient
      //   colors={['#1A1A1A', '#1A1A1A', '#1A1A1A']}
      //   start={{x: 0, y: 0}}
      //   end={{x: 1, y: 0}}
      //   style={styles.mini}>
      <Animated.View
        style={[
          // animatedHeight,
          {
            height: this.state.animation.y,
            // justifyContent: 'center',
            backgroundColor: '#1A1A1A',
            position: 'relative',
            // transform:[{translateY:this.state.animation.y}]
          },
          // this.state.animation.getLayout()
        ]}
        // {...handles}
      >
        {/* <Animated.View style={styles.container}> */}

        <Animated.View
          // {...this.panResponder.panHandlers}
          style={[
            {
              // flexDirection: 'row',
              width,
              alignItems: 'center',
              height: '100%',

              flex: 1,
              paddingHorizontal: 5,
              marginTop: 15,
              // justifyContent: 'center',
              // backgroundColor:"#900"
            },
          ]}>
          {/* HEADER VIEW */}
          <Animated.View
            style={{
              width,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
              paddingHorizontal: 20,
              opacity: animatedOpacityTile,
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              hitSlop={{top: 100, left: 100, right: 100, bottom: 100}}
              onPress={() => this.context.toggleMiniPlayer()}>
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
          </Animated.View>
          <Animated.View
            style={[
              {
                width: animatedImageWidth,
                height: animatedImageHeight,
                borderRadius: 10,
                // transform: [{scaleY: animatedImageHeight}],
                // marginRight: 10,
                marginTop: animatedMargin,
                marginLeft: animatedMarginLeft,
                // backgroundColor:"#900"
              },
            ]}>
            <Image
              // source={require('../../assests/images/Background.jpg')}
              source={this.context.currentTrack.image}
              style={{width: null, height: '100%', borderRadius: 10}}
            />
          </Animated.View>
          <Animated.View style={{marginTop: 15, opacity: animatedOpacityTile}}>
            <Text
              style={{
                color: '#eee',
                textTransform: 'capitalize',
                fontSize: 14,
                textAlign: 'center',
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
                textAlign: 'center',
              }}
              numberOfLines={1}>
              {this.context.currentTrack.artist}
            </Text>
          </Animated.View>
          {/* SLIDER VIEW */}
          <Animated.View style={{width, paddingHorizontal: 20, marginTop: 20}}>
            <SliderComponent color="#999" />
          </Animated.View>

          {/* BIG PLAYER ICON */}
          <Animated.View
            style={{
              // flex: 1,
              width,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 20,
              alignItems: 'center',
              // position: "absolute",
              // bottom:50
              marginTop: 20,
              opacity: animatedOpacityTile,
              // backgroundColor: '#900',
            }}>
            <TouchableOpacity activeOpacity={0.6} style={styles.icon}>
              <Icon name="repeat" color="#eee" size={22} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.icons}>
              <Icon name="play-skip-back" color="#f68128" size={24} />
            </TouchableOpacity>
            {/* PLAY PART */}
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
                <ActivityIndicator color="#f68128" size="large" />
              </TouchableOpacity>
            )}
            <TouchableOpacity activeOpacity={0.6} style={styles.icons}>
              <Icon name="play-skip-forward" color="#f68128" size={24} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.icon}>
              <Icon name="shuffle" color="#eee" size={22} />
            </TouchableOpacity>
            {/* <Icon name="play" color="#f68128" size={36} style={{marginLeft: 20}} /> */}
          </Animated.View>
          {/* MINIPLAYER ICON */}
          <Animated.View
            style={{
              opacity: animatedOpacityIcon,
              position: 'absolute',
              bottom: animatedTopPosition,
              right: animatedLeftPosition,
              flexDirection: 'row',
            }}>
            <View>
              <Text
                style={{
                  color: '#eee',
                  textTransform: 'capitalize',
                  fontSize: 14,
                  textAlign: 'center',
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
                  textAlign: 'center',
                }}
                numberOfLines={1}>
                {this.context.currentTrack.artist}
              </Text>
            </View>
            {/* PLAY PART */}
            {this.context.isPlaying && (
              <TouchableOpacity
                onPress={() => this.context.pause()}
                onLongPress={() => this.context.pause()}
                hitSlop={{top: 100, right: 100, left: 100, bottom: 100}}
                style={styles.iconCount2}>
                <Icon
                  name="pause"
                  color="#eee"
                  size={24}
                  style={{paddingLeft: 2}}
                />
              </TouchableOpacity>
            )}
            {this.context.isPaused && (
              <TouchableOpacity
                onPress={() => this.context.play()}
                style={styles.iconCount2}>
                <Icon
                  name="play"
                  color="#eee"
                  size={24}
                  style={{paddingLeft: 3}}
                />
              </TouchableOpacity>
            )}
            {this.context.isStopped && (
              <TouchableOpacity
                onPress={() => this.context.play()}
                style={styles.iconCount2}>
                <Icon
                  name="play"
                  color="#eee"
                  size={24}
                  style={{paddingLeft: 3}}
                />
              </TouchableOpacity>
            )}
            {this.context.isBuffering && (
              <TouchableOpacity>
                <ActivityIndicator color="#f68128" size="large" />
              </TouchableOpacity>
            )}
          </Animated.View>
          {/* </Animated.View> */}
        </Animated.View>
      </Animated.View>
      // </LinearGradient>
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
    height: Screen_height,
    flex: 1,
    // position: 'relative',
    // paddingBottom:10
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  IconCont: {
    marginRight: 15,
    borderRadius: 60 / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    // borderColor: '#f68128',
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
    // marginRight: 15,
    borderRadius: 50 / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    // borderColor: '#f68128',
    backgroundColor: '#f68128',
  },
  icons: {
    borderRadius: 40 / 2,
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#111',
  },
  icon: {
    borderRadius: 30 / 2,
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f68128',
  },
  artistDetail: {
    // flex: 1,
  },
});

{
  /* <View
            style={{
              position: 'absolute',
              bottom: 38,
              height: 30,
              left: 0,
              right: 0,
              width: '100%',
            }}>
            <SliderComponent color="#f68128" />
          </View> */
}

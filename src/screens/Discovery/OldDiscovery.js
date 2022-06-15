import React, {Component, createRef} from 'react';
import {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import PlayerContext from '../../PlayerContext/PlayerContext';
import {connect} from 'react-redux';
import {get_Trailer_Media} from '../../redux/actions/MediaActions/getMediaActions';
import data from '../../data';
import DiscoverSlide from './DiscoverSlide';
import Icon from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {State} from 'react-native-track-player';

// import ControlButton from'./ControlButton'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Discovery extends Component {
  state = {
    position: new Animated.ValueXY(),
    currentIndex: 0,
    isPlayerReady: false,
    isPlaying: 'playing',
    page: 0,
    size: 30,
    data: this.props.getTrailerMedia,
  };

  static contextType = PlayerContext;
  // const {loading, error, data} = this.props.getTrailerMedia;

  // CONSTANTS
  rotateSongs = this.state.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  rotateandtranslate = {
    transform: [
      {rotate: this.rotateSongs},
      ...this.state.position.getTranslateTransform(),
    ],
  };
  // OPACITY'S CONTROLLER
  likeOpacity = this.state.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  // OPACITY'S CONTROLLER
  notLikeOpacity = this.state.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  // OPACITY'S CONTROLLER
  nextCardOpacity = this.state.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });
  // OPACITY'S CONTROLLER
  nextCardScale = this.state.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });
  componentDidMount() {
    // TrackPlayer.addEventListener()
    this.props.get_Trailer_Media(this.state.page, this.state.size);
    if (this.props.getTrailerMedia.data !== []) {
      this.context.play(...this.props.getTrailerMedia.data);
    }
    //   if (data) {
    //     TrackPlayer.setupPlayer().then(async () => {
    //       await TrackPlayer.reset();
    //       if (data) {
    //         await TrackPlayer.add([...data]);
    //       }
    //       this.setState({isPlayerReady: !this.state.isPlayerReady});
    //       await TrackPlayer.play();
    //     });
    //   } else {
    //     TrackPlayer.destroy();
    //   }
    // if (this.state.isPlaying === State.Ready) {
    //   this.setState({isPlaying: 'playing'});
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    // if (data === [] || data.length === 0 ) {
    //   TrackPlayer.destroy();
    // }
    // if (!data[this.state.currentIndex].id) {
    //   TrackPlayer.destroy();
    // }

    if (prevState.currentIndex != this.state.currentIndex) {
      // if (this.state.isPlayerReady) {
      if (
        this.props.getTrailerMedia.data[this.state.currentIndex]?.mediaIdentity
      ) {
        TrackPlayer.skip(
          this.props.getTrailerMedia.data[this.state.currentIndex]
            .mediaIdentity,
        );
      }
      console.log('Index Changed');
      console.log(this.props);
      // }
    }
    // if (prevState.currentIndex != this.state.currentIndex) {
    //   if (this.state.isPlayerReady) {
    //     if (data[this.state.currentIndex].id) {
    //       TrackPlayer.skip(data[this.state.currentIndex].id);
    //     }
    //     console.log('Index Changed');
    //     console.log(this.props);
    //   }
    // }
    // if (!data[this.state.currentIndex].id) {
    //   TrackPlayer.destroy();
    // }
  }

  // componentWillUnmount() {
  //   TrackPlayer.destroy();
  //   console.log(' Not in Function Component Left');
  // }

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        this.state.position.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.state.position, {
            toValue: {x: SCREEN_WIDTH + 200, y: gestureState.dy},
            useNativeDriver: true,
          }).start(() => {
            this.setState(
              (prevState) => ({currentIndex: prevState.currentIndex + 1}),
              () => this.state.position.setValue({x: 0, y: 0}),
            );
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.state.position, {
            toValue: {x: -SCREEN_WIDTH - 200, y: gestureState.dy},
            useNativeDriver: true,
          }).start(() => {
            this.setState(
              (prevState) => ({currentIndex: prevState.currentIndex + 1}),
              () => this.state.position.setValue({x: 0, y: 0}),
            );
          });
        } else {
          Animated.spring(this.state.position, {
            toValue: {x: 0, y: 0},
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }
  // LIKE SONG FUNCTION
  likeSong = () => {
    Animated.timing(this.state.position, {
      toValue: {x: SCREEN_WIDTH + 200, y: 0},
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      this.setState(
        (prevState) => ({currentIndex: prevState.currentIndex + 1}),
        () => this.state.position.setValue({x: 0, y: 0}),
      );
    });
  };
  // UNLIKE SONG FUNCTION
  UnlikeSong = () => {
    Animated.timing(this.state.position, {
      toValue: {x: -SCREEN_WIDTH - 200, y: 0},
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      this.setState(
        (prevState) => ({currentIndex: prevState.currentIndex + 1}),
        () => this.state.position.setValue({x: 0, y: 0}),
      );
    });
  };

  //  CHECKING THE PLAY STATE
  playOrPause = async () => {
    // const state = await TrackPlayer.getState();

    if (
      // (await TrackPlayer.getState()) == 2 ||
      // (await TrackPlayer.getState()) == 'paused'
      //  await TrackPlayerState.Paused
      // state === State.Playing
      this.context.isPlaying
    ) {
      await TrackPlayer.pause();
    } else if (
      // (await TrackPlayer.getState()) == 'playing' ||
      // (await TrackPlayer.getState()) == 3
      //  await TrackPlayerState.Playing
      state === State.Paused
    ) {
      console.log('Playing');

      this.setState({
        isPlaying: 'playing',
      });

      await TrackPlayer.play();
    } else if (state === State.Buffering || state === State.Connecting) {
      this.setState({
        isPlaying: 'loading',
      });
    }
  };
  renderControlBtn = () => {
    switch (this.state.isPlaying) {
      case 'paused':
        return (
          <Icon
            name="ios-caret-forward"
            size={40}
            color="#fff"
            style={{paddingLeft: 2}}
          />
        );
      case 'playing':
        return (
          <Icon
            name="ios-pause"
            size={40}
            color="#fff"
            style={{paddingLeft: 2}}
          />
        );

      default:
        return <ActivityIndicator color="#fff" size="large" />;
    }
  };

  // RENDERING THE SONGS
  renderSongs = () => {
    return data
      .map((song, index) => {
        // CHECKING INDEXES
        if (index < this.state.currentIndex) {
          return null;
        } else if (index == this.state.currentIndex) {
          // CHECKING INDEXES IF EQUAL THE CURRENT SONG
          return (
            <Animated.View
              {...this.panResponder.panHandlers}
              key={index}
              style={[
                {
                  height: SCREEN_HEIGHT / 1.3,
                  width: SCREEN_WIDTH,
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  position: 'absolute',
                },
                this.rotateandtranslate,
              ]}>
              {/* LIKE TEXT */}
              <Animated.View
                style={{
                  position: 'absolute',
                  zIndex: 100,
                  elevation: 5,
                  top: 50,
                  left: 30,
                  opacity: this.likeOpacity,
                  transform: [{rotate: '-30deg'}],
                  backgroundColor: 'green',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    borderColor: 'green',
                    borderWidth: 1,
                    color: 'white',
                    fontSize: 20,
                    fontFamily: 'Gilroy-Bold',
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  LIKE
                </Text>
              </Animated.View>
              {/* RIGHT TEXT */}
              <Animated.View
                style={{
                  position: 'absolute',
                  zIndex: 100,
                  elevation: 5,
                  top: 50,
                  right: 30,
                  opacity: this.notLikeOpacity,
                  transform: [{rotate: '30deg'}],
                  borderRadius: 10,
                  backgroundColor: 'red',
                }}>
                <Text
                  style={{
                    borderColor: 'red',
                    borderWidth: 1,
                    color: 'white',
                    fontSize: 20,
                    fontFamily: 'Gilroy-Bold',
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  NOPE
                </Text>
              </Animated.View>
              <DiscoverSlide {...song} />
            </Animated.View>
          );
        } else {
          // CHECKUNG INDEXES NOT EQUAL
          return (
            <Animated.View
              key={index}
              style={[
                {
                  height: SCREEN_HEIGHT / 1.3,
                  width: SCREEN_WIDTH,
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  position: 'absolute',
                  opacity: this.nextCardOpacity,
                  transform: [{scale: this.nextCardScale}],
                },
              ]}>
              <DiscoverSlide {...song} />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    // console.log(this.state.data);

    if (!data) {
      return (
        <View style={styles.noSongsView}>
          <Text style={{color: '#f68128', fontSize: 20}}>
            Searching for songs.....
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/* <HeaderDrawerBtn /> */}
        {/* position relative */}
        {/* {data.length === 0 && (
          <View style={styles.noSongsView}>
            <Text style={{color: '#f68128', fontSize: 20}}>
              Searching for songs.....
            </Text>
          </View>
        )} */}
        <View>
          <View style={{flex: 1, position: 'relative'}}>
            {this.renderSongs()}
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.playContainer}
              onPress={() => this.playOrPause()}>
              {this.renderControlBtn()}
            </TouchableOpacity>
          </View>

          <View style={styles.controlBtn}>
            {/* UNLIKE BTN */}
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.unLikeBtn}
              onPress={this.UnlikeSong}>
              <Icon name="ios-close" color="#fff" size={30} />
            </TouchableOpacity>
            {/* LIKE CONTROLS */}
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.likeBtn}
              onPress={this.likeSong}>
              <Icon name="ios-heart-outline" color="#fff" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({getTrailerMedia}) => ({
  getTrailerMedia,
});

export default connect(mapStateToProps, {get_Trailer_Media})(Discovery);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  likeBtn: {
    borderColor: 'green',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    backgroundColor: 'green',
  },
  playContainer: {
    // padding: 5,
    borderRadius: 60 / 2,
    width: 60,
    height: 60,
    borderColor: '#f68128',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginTop: SCREEN_HEIGHT / 1.5,
    backgroundColor: '#f68128',
    alignSelf: 'flex-end',
  },
  unLikeBtn: {
    borderColor: 'red',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    width: 50,
    height: 50,

    backgroundColor: 'red',
    marginRight: 20,
  },
  controlBtn: {
    marginTop: SCREEN_HEIGHT / 1.25,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  noSongsView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
//(prevState) => ({currentIndex: prevState.currentIndex + 1});

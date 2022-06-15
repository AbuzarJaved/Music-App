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
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PlayerContext from '../../PlayerContext/PlayerContext';
import {connect} from 'react-redux';
import {
  get_Trailer_Media,
  like_A_Discover_Media,
  increase_Discover_Media_Page,
  increase_Discover_Media_Size,
} from '../../redux/actions/MediaActions/getMediaActions';
import FilterModal from './FilterModal';

import DiscoverSlide from './DiscoverSlide';
import Icon from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {State} from 'react-native-track-player';
import LoadingAnime from '../../Components/Loading/Loading';
import ErrorView from '../../Components/ErrorScreen/DiscoveryErrorScreen';
import FocusEffect from './useFocusEffect';
import {scale, ScaledSheet} from 'react-native-size-matters';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Discovery extends Component {
  state = {
    position: new Animated.ValueXY(),
    currentIndex: 0,

    page: 0,
    size: 50,
    data: this.props.getTrailerMedia,
    activeTab: false,
    genreValue: 'Hip-Hop & Rap',
    countryValue: 'United States',
    countryCode: 'United States',
    statesData: [],
    userState: '',
    showFilter: false,
    state: '',
    country: '',
    countryCode: '',
  };

  static contextType = PlayerContext;

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

  likeOpacity = this.state.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  notLikeOpacity = this.state.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  nextCardOpacity = this.state.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });

  nextCardScale = this.state.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });
  componentDidMount() {
    //   this.props.get_Trailer_Media(this.state.page, this.state.size);
    //   if (this.props.getTrailerMedia.data !== []) {
    //     this.props.getTrailerMedia.data.forEach(function (obj) {
    //       obj.id = obj.mediaIdentity;
    //       obj.url = obj.trailerUrl;
    //       Object.preventExtensions(obj);
    //     });
    //     this.context.play(this.props.getTrailerMedia.data);
    //   }
    // this.context.resetCurrentTrack();
    this.props.get_Trailer_Media(this.state.page, this.state.size);
    this.setState({
      state: this.props.storeUserLocation.state,
    });
    this.setState({
      country: this.props.storeUserLocation.country,
    });
    this.setState({
      countryCode: this.props.storeUserLocation.countryCode,
    });
  }

  changeActiveTab = () => {
    this.setState({
      activeTab: true,
    });
  };
  changeActiveTab2 = () => {
    this.setState({
      activeTab: false,
    });
  };
  changeGenreValue = val => {
    this.setState({
      genreValue: val,
    });
  };
  changeCountryValue = val => {
    this.setState({
      country: val,
    });
  };
  changeCountryCode = val => {
    this.setState({
      countryCode: val,
    });
  };
  closeModal = () => {
    this.setState({
      activeTab: false,
    });
  };
  chooseState = val => {
    this.setState({
      state: val,
    });
  };
  closeFilter = () => {
    this.setState({
      showFilter: false,
    });
  };
  openFilter = () => {
    this.setState({
      showFilter: true,
    });
  };

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
            this.context.skip(this.state.currentIndex);
            console.log(
              this.props.getTrailerMedia.data[this.state.currentIndex],
              'CURRENT SONG',
            );
            this.setState(
              prevState => ({currentIndex: prevState.currentIndex + 1}),
              () => this.state.position.setValue({x: 0, y: 0}),
            );
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.state.position, {
            toValue: {x: -SCREEN_WIDTH - 200, y: gestureState.dy},
            useNativeDriver: true,
          }).start(() => {
            this.setState(
              prevState => ({currentIndex: prevState.currentIndex + 1}),
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

  likeSong = () => {
    Animated.timing(this.state.position, {
      toValue: {x: SCREEN_WIDTH + 200, y: 0},
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      this.context.skip(this.state.currentIndex);
      console.log(
        this.props.getTrailerMedia.data[this.state.currentIndex],
        'CURRENT SONG',
      );
      this.setState(
        prevState => ({currentIndex: prevState.currentIndex + 1}),
        () => this.state.position.setValue({x: 0, y: 0}),
      );
    });
  };

  UnlikeSong = () => {
    Animated.timing(this.state.position, {
      toValue: {x: -SCREEN_WIDTH - 200, y: 0},
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      console.log(
        this.props.getTrailerMedia.data[this.state.currentIndex],
        'CURRENT SONG',
      );
      this.context.skip(this.state.currentIndex);
      this.setState(
        prevState => ({currentIndex: prevState.currentIndex + 1}),
        () => this.state.position.setValue({x: 0, y: 0}),
      );
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.currentIndex != this.state.currentIndex) {
  //     if (
  //       this.props.getTrailerMedia.data[this.state.currentIndex]?.mediaIdentity
  //     ) {
  //       TrackPlayer.skip(
  //         this.props.getTrailerMedia.data[this.state.currentIndex]
  //           ?.mediaIdentity,
  //       );
  //     }
  //     console.log('Index Changed');
  //     console.log(this.props);
  //   }
  // }
  componentWillUnmount() {
    // TrackPlayer.remove(this.props.getTrailerMedia.data);
    // TrackPlayer.reset();
  }

  render() {
    const renderSongs = () => {
      return this.props.getTrailerMedia.data
        .map((song, index) => {
          if (index < this.state.currentIndex) {
            return null;
          } else if (index == this.state.currentIndex) {
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
                <Animated.View
                  style={{
                    position: 'absolute',
                    zIndex: 100,
                    elevation: 5,
                    top: 50,
                    left: 30,
                    opacity: this.likeOpacity,
                    transform: [{rotate: '-30deg'}],
                    // backgroundColor: 'green',
                    width: 60,
                    height: 60,
                    borderRadius: 60 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#F68128',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Gilroy-Bold',
                      color: 'white',
                    }}>
                    LIKE
                  </Text>
                </Animated.View>

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
                    // backgroundColor: 'red',
                    width: 60,
                    height: 60,
                    borderRadius: 60 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'red',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontFamily: 'Gilroy-Bold',
                    }}>
                    NOPE
                  </Text>
                </Animated.View>
                <DiscoverSlide {...song} song={song} />
              </Animated.View>
            );
          } else {
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
                <DiscoverSlide {...song} song={song} />
              </Animated.View>
            );
          }
        })
        .reverse();
    };

    const getTrailerData = () => {
      this.props.get_Trailer_Media(
        this.props.increaseCurrentDiscoverPage.page,
        this.props.increaseCurrentDiscoverSize.size,
      );
    };

    let loadingView = null;
    let errorView = null;
    if (this.props.getTrailerMedia.loading) {
      loadingView = <LoadingAnime width={70} height={70} />;
    }
    if (this.props.getTrailerMedia.error) {
      // this.context.resetTrack();
      errorView = (
        <ErrorView
          errorTitle={this.props.getTrailerMedia.error}
          onPress={() => getTrailerData()}
        />
      );
    }

    let playBtn = null;
    let pauseBtn = null;
    let loadingAnimes = null;
    let stoppedBtn = null;

    if (this.context.isPlaying) {
      playBtn = (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.playContainer}
          onPress={() => this.context.toggleMusicPlay()}>
          <Icon
            name="ios-pause"
            size={scale(40)}
            color="#fff"
            style={{paddingLeft: 2}}
          />
        </TouchableOpacity>
      );
    }
    if (this.context.isPaused) {
      pauseBtn = (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.playContainer}
          onPress={() => this.context.toggleMusicPlay()}>
          <Icon
            name="ios-caret-forward"
            size={scale(40)}
            color="#fff"
            style={{paddingLeft: 2}}
          />
        </TouchableOpacity>
      );
    }
    if (this.context.isBuffering) {
      loadingAnimes = (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.playContainer}
          onPress={() => this.context.toggleMusicPlay()}>
          <Icon
            name="ios-pause"
            size={scale(40)}
            color="#fff"
            style={{paddingLeft: 2}}
          />
        </TouchableOpacity>
      );
    }
    if (this.context.isEmpty || this.context.isStopped) {
      stoppedBtn = (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.playContainer}
          onPress={() => this.context.toggleMusicPlay()}>
          <Icon
            name="ios-pause"
            size={scale(40)}
            color="#fff"
            style={{paddingLeft: 2}}
          />
        </TouchableOpacity>
      );
    }

    let mainView = null;
    if (
      !this.props.getTrailerMedia.loading &&
      this.props.getTrailerMedia.data.length > 0
    ) {
      // mainView = loadingView = <LoadingAnime width={70} height={70} />;
      mainView = renderSongs();
      // <View
      //   style={{
      //     width: '100%',
      //     height: SCREEN_HEIGHT,
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //   }}>
      //   <Text
      //     style={{color: '#fff', fontSize: scale(20), textAlign: 'center'}}>
      //     Loading more songs...
      //   </Text>
      // </View>
    }
    return (
      <SafeAreaView style={styles.container}>
        {loadingView}
        {errorView}
        <FocusEffect
          unLike={this.UnlikeSong}
          page={this.state.page}
          size={this.state.size}
          currentIndex={this.state.currentIndex}
          chooseState={val => this.chooseState(val)}
          countryCode={this.state.countryCode}
        />
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <FilterModal
          showFilter={this.state.showFilter}
          onPress={this.closeFilter}
          changeTab={this.changeActiveTab}
          changeTab2={this.changeActiveTab2}
          changeModal={this.closeModal}
          state={this.state.state}
          country={this.state.country}
          countryCode={this.state.countryCode}
          changeState={val => this.chooseState(val)}
          changeCountry={val => this.changeCountryValue(val)}
          changeCountryCode={val => this.changeCountryCode(val)}
        />
        <View>
          <View style={{flex: 1, position: 'relative'}}>
            {/* {renderSongs()} */}
            {mainView}

            <View style={styles.filterBtn}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.openFilter()}>
                <Icon name="options" size={30} color="#F68128" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.controlBtn}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.unLikeBtn}
              onPress={this.UnlikeSong}>
              <Icon name="ios-close" color="#900" size={40} />
            </TouchableOpacity>
            <View style={styles.playView}>
              {playBtn}
              {pauseBtn}
              {loadingAnimes}
              {stoppedBtn}
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.likeBtn}
              onPress={this.likeSong}>
              <Icon name="ios-heart-outline" color="#f68128" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({
  getTrailerMedia,
  increaseCurrentDiscoverPage,
  increaseCurrentDiscoverSize,
  storeUserLocation,
}) => ({
  getTrailerMedia,
  increaseCurrentDiscoverPage,
  increaseCurrentDiscoverSize,
  storeUserLocation,
});

export default connect(mapStateToProps, {
  get_Trailer_Media,
  like_A_Discover_Media,
  increase_Discover_Media_Page,
  increase_Discover_Media_Size,
})(Discovery);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  likeBtn: {
    // borderColor: 'green',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    // backgroundColor: 'green',
    color: '#F68128',
  },
  playContainer: {
    // padding: 5,
    borderRadius: 80 / 2,
    width: 80,
    height: 80,
    // borderColor: '#f68128',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,

    // backgroundColor: '#f68128',
    backgroundColor: 'rgba(246, 129, 40,0.2)',
    alignSelf: 'flex-end',
  },
  // playView: {
  //   marginTop: SCREEN_HEIGHT / 1.6,
  //   alignSelf: 'flex-end',
  //   marginRight: 20,
  // },
  unLikeBtn: {
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    // backgroundColor: 'red',
    marginRight: 20,
    color: 'red',
  },
  controlBtn: {
    marginTop: SCREEN_HEIGHT / 1.35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: '#900',
  },
  noSongsView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBtn: {
    position: 'absolute',
    top: getStatusBarHeight(),
    right: '10%',
  },
});

import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  //   Animated,
} from 'react-native';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import SliderComponent from '../../Components/Slider/Slider';
import LoadingAmin from '../../Components/Animations/Small_LoadingAnime';
import Loader from '../../Components/Animations/ActivityIndicator';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  Value,
  event,
  block,
  cond,
  eq,
  add,
  useCode,
  set,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const MusicPlayer = () => {
  const openMusicPlayer = useSelector((state) => state.openMusicPlayer);

  const withOffSet = (translationY, offset, gestureState) => {
    return block([
      cond[eq(gestureState, State.END)],
      [set(offset, add(offset, translationY)), offset],
      [add(offset, translationY)],
    ]);
  };
  const translationY = useRef(new Value(0)).current;
  const gestureState = useRef(new Value(State.UNDETERMINED)).current;
  const viewTransY = useRef(new Value(0)).current;
  const offset = useRef(new Value(0)).current;

  useCode(
    () => [set(viewTransY, withOffSet(translationY, offset, gestureState))],
    [],
  );

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationY,
        state: gestureState,
      },
    },
  ]);

  const {
    musicDetails: {title, url, image, id, artist},
    isMusicPlayerOpen,
  } = openMusicPlayer;
  const {
    isMusicEmpty,
    currentMusicTrack,
    isMusicPlaying,
    isMusicPaused,
    isMusicBuffering,
    isMusicStopped,
    musicPause,
    playMusic,
  } = usePlayerContext();
  if (isMusicEmpty || !currentMusicTrack) {
    return null;
  }

  let playBtn = null;
  let pauseBtn = null;
  let loadingAnimes = null;
  let stoppedBtn = null;
  if (isMusicPlaying) {
    playBtn = (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => musicPause()}
        onLongPress={() => musicPause()}
        hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
        style={styles.IconCont}>
        <Icon name="pause" color="#eee" size={40} style={{}} />
      </TouchableOpacity>
    );
  }
  if (isMusicPaused) {
    pauseBtn = (
      <TouchableOpacity
        onPress={() => playMusic()}
        style={styles.IconCont}
        activeOpacity={0.8}>
        <Icon name="play" color="#eee" size={40} style={{}} />
      </TouchableOpacity>
    );
  }
  if (isMusicStopped) {
    stoppedBtn = (
      <TouchableOpacity
        onPress={() => playMusic()}
        style={styles.IconCont}
        activeOpacity={0.8}>
        <Icon name="pause" color="#eee" size={40} style={{}} />
      </TouchableOpacity>
    );
  }
  if (isMusicBuffering) {
    loadingAnimes = (
      <TouchableOpacity activeOpacity={0.8}>
        {/* <LoadingAmin width={50} height={50} /> */}
        <Loader />
      </TouchableOpacity>
    );
  }

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}>
      <Animated.View
        style={[styles.container, {transform: [{translateY: viewTransY}]}]}>
        <ImageBackground
          source={{uri: image}}
          blurRadius={90}
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
                activeOpacity={0.8}
                hitSlop={{top: 100, left: 100, right: 100, bottom: 100}}
                //   onPress={() => this.props.closeModalPlayer()}
              >
                <Icon name="chevron-down" size={28} color="#F68128" />
              </TouchableOpacity>
              <Text
                style={{color: '#F68128', fontSize: 12, alignSelf: 'center'}}>
                Now Playing
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{top: 100, left: 100, right: 100, bottom: 100}}>
                <Icon name="ellipsis-vertical" size={28} color="#F68128" />
              </TouchableOpacity>
            </View>
            <View
              style={[
                {
                  width: '90%',
                  height: height / 2.4,
                  borderRadius: 10,
                  // transform: [{scaleY: animatedImageHeight}],
                  // marginRight: 10,
                  marginTop: '5%',
                  // marginLeft: animatedMarginLeft,
                  // backgroundColor:"#900"
                },
              ]}>
              <Image
                // source={require('../../assests/images/Background.jpg')}
                source={{uri: image}}
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
                {title}
              </Text>
              <Text
                style={{
                  color: '#f68128',
                  textTransform: 'capitalize',
                  fontSize: 15,
                  textAlign: 'center',
                  fontFamily: 'Gilroy-ExtraBold',
                }}
                numberOfLines={1}>
                {artist}
              </Text>
            </View>

            <View style={{width, paddingHorizontal: 20, marginTop: 20}}>
              <SliderComponent color="#000" showTime />
            </View>

            <View
              style={{
                // flex: 1,
                width,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                alignItems: 'center',
                // position: "absolute",
                // bottom:50
                marginTop: '10%',

                // backgroundColor: '#900',
              }}>
              <TouchableOpacity activeOpacity={0.8} style={styles.icon}>
                <Icon name="repeat" color="#eee" size={24} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.icons}>
                <Icon name="play-skip-back" color="#f68128" size={24} />
              </TouchableOpacity>

              {playBtn}
              {pauseBtn}
              {stoppedBtn}
              {loadingAnimes}
              <TouchableOpacity activeOpacity={0.8} style={styles.icons}>
                <Icon name="play-skip-forward" color="#f68128" size={24} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.icon}>
                <Icon name="shuffle" color="#eee" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    width,
    // height,
    position: 'absolute',
    top: height - height / 1 ,
    bottom: height - 100,
    left: 0,
    right: 0,
    // height: height - 50,
    backgroundColor: '#900',
  },

  IconCont: {
    // marginRight: 15,
    borderRadius: 60 / 2,

    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    // borderColor: '#f68128',
    backgroundColor: '#f68128',
    // shadowColor: '#fff',
    // shadowOffset: {
    //   width: 6,
    //   height: 6,
    // },
    // shadowOpacity: 0.9,
    // shadowRadius: 5,

    // elevation: 16,
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
    borderRadius: 40 / 2,
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#999',
  },
  artistDetail: {
    // flex: 1,
  },
});

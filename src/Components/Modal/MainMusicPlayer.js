import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  // Animated,
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  RepeatMode,
} from 'react-native-track-player';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {
  openModalPlayer,
  closeModalPlayer,
  shuffleSongs,
} from '../../redux/actions/musicPlayerActions';
import {openSongBottomSheetView} from '../../redux/actions/songBottomSheetAction';
import {CLOSE_MUSIC_PLAYER} from '../../redux/constants/index';
import PlayerContext from '../../PlayerContext/PlayerContext';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import Loader from '../../Components/Animations/ActivityIndicator';
import LoadingAmin from '../../Components/Animations/Small_LoadingAnime';
import ImagePlaceholder from '../../assests/images/image-placeholder.png';

import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetContent from './MusicPlayerBottomSheet';
import GenrealBotomSheet from '../../Components/BottomSheet/GeneralBottomSheet';
import PopUp from './SmallPopUpModal';
import {useDispatch, useSelector} from 'react-redux';
import SliderComponent from '../../Components/Slider/Slider';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {scale, ScaledSheet} from 'react-native-size-matters';
import MainMusicPlayerHeader from './components/MainMusicPlayerHeader';

const {width, height} = Dimensions.get('window');

const MainMusicPlayer = () => {
  const [show, setShow] = useState(true);
  const [songIndex, setSongIndex] = useState(0);
  const [icon, setIcon] = useState(false);
  const fall = new Animated.Value(1);
  const dispatch = useDispatch();
  // const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  const Br = useRef(null);
  const openMusicPlayer = useSelector(state => state.openMusicPlayer);
  const getTrendingMedia = useSelector(state => state.getTrendingMedia);
  const {data} = getTrendingMedia;
  const {isMusicPlayerOpen, data: mediaSongs} = openMusicPlayer;
  const {
    isMusicBuffering,
    isMusicEmpty,
    isMusicPaused,
    isMusicPlaying,
    isMusicStopped,
    toggleMusicPlay,
    currentTrackDetails,
    currentMusicTrack,
    skip,
    skipToNextMusic,
    skipToPreviousMusic,
    repeatIcon,
    changeRepeatMode,
    repeatState,
    repeatQueue,
    toggleShuffle,
    shuffleState,
  } = usePlayerContext();
  // console.log(repeatState,'repeat State');

  const {
    title,
    url,
    image,
    id,
    artist,
    featuredArtists,
    ownerAccountUser,
    hitCount,
  } = currentTrackDetails;
  const featuringArtist = featuredArtists?.join('&');

  const openSongBottomSheetModal = () => {
    dispatch(
      openSongBottomSheetView({
        title,
        id,
        image,
        url,
        artist,
        featuredArtists,
        ownerAccountUser,
        hitCount,
      }),
    );
  };

  // useEffect(() => {
  //   scrollX.addListener(({value}) => {
  //     const index = Math.round(value / width);
  //     setSongIndex(index);
  //     skip(songIndex);
  //   });
  //   return () => {
  //     scrollX.removeAllListeners();
  //   };
  // }, []);

  const toggleBottomSheet = () => {
    if (icon) {
      Br.current.snapTo(1);
    } else {
      Br.current.snapTo(0);
    }
    setIcon(!icon);
  };

  const renderContent = () => (
    <BottomSheetContent
      toggleBottomSheet={toggleBottomSheet}
      icon={icon}
      onPress={Br}
      image={image}
    />
  );
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={{right: 20, left: 20, bottom: 20, top: 20}}
        onPress={() => toggleBottomSheet()}
        style={styles.nextBtn}>
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{right: 20, left: 20, bottom: 20, top: 20}}
          onPress={() => toggleBottomSheet()}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: scale(16),
              fontFamily: 'Helvetica-Bold',
            }}>
            Up Next
          </Text>
        </TouchableOpacity>
        {!icon ? (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{right: 20, left: 20, bottom: 20, top: 20}}
            onPress={() => toggleBottomSheet()}>
            <Icon name="chevron-up" color="#f68126" size={scale(30)} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{right: 20, left: 20, bottom: 20, top: 20}}
            onPress={() => toggleBottomSheet()}>
            <Icon name="chevron-down" color="#f68126" size={scale(30)} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );

  // const skipToNext = async () => {
  //   songSlider?.current.scrollToOffset({
  //     offset: (songIndex + 1) * width,
  //   });
  //   await TrackPlayer.skip(songIndex);
  //   skipToNext()
  // };
  // const skipToPrevious = async () => {
  //   songSlider?.current.scrollToOffset({
  //     offset: (songIndex - 1) * width,
  //   });
  //   await TrackPlayer.skip(songIndex);
  //   skipToPrevious()
  // };

  let mainBtnView = null;
  let bufferingView = null;
  if (isMusicEmpty || isMusicStopped) {
    mainBtnView = (
      <Icon name="ios-pause" color="#eee" size={scale(40)} style={{}} />
    );
  } else if (isMusicBuffering) {
    mainBtnView = (
      <Icon name="ios-pause" color="#eee" size={scale(40)} style={{}} />
    );
    bufferingView = <ActivityIndicator size={scale(50)} color="#fff" />;
  } else if (isMusicPlaying) {
    mainBtnView = (
      <Icon name="ios-pause" color="#eee" size={scale(40)} style={{}} />
    );
  } else if (isMusicPaused) {
    mainBtnView = (
      <Icon name="ios-play" color="#eee" size={scale(40)} style={{}} />
    );
  }

  // const renderSongs = ({item, index}) => {
  //   return (
  //     <Animated.View
  //       style={{
  //         width,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <View style={styles.artworkWrapper}>
  //         <Image style={styles.artWorkImg} source={{uri: item.image}} />
  //         <View style={{position: 'absolute', top: '40%', right: '40%'}}>
  //           {bufferingView}
  //         </View>
  //       </View>
  //     </Animated.View>
  //   );
  // };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      //   const trackObject = await TrackPlayer.getTrack(event.nextTrack);
      //   songSlider?.current.scrollToOffset({
      //     offset: (songIndex + 1) * width,
      //   });
    }
  });
  // useEffect(() => {
  useTrackPlayerEvents([Event.PlaybackQueueEnded], async event => {
    if (event.type === Event.PlaybackQueueEnded && event.nextTrack == null) {
      repeatQueue();
    }
  });
  // }, []);

  return (
    // <>
    <Modal
      animationType="slide"
      animationIn='slideInUp'
      swipeDirection="down"
      isVisible={isMusicPlayerOpen}
      onSwipeComplete={() => dispatch(closeModalPlayer())}
      onRequestClose={() => dispatch(closeModalPlayer())}
      // isVisible={this.props.openMusicPlayer.isMusicPlayerOpen}
      // onSwipeComplete={() => this.props.closeModalPlayer()}
      // onRequestClose={() => this.props.closeModalPlayer()}
      style={{
        flex: 1,
        margin: 0,
        // zIndex: 100,
      }}>
      <ImageBackground
        //   source={require('../../assests/images/caro1.jpg')}
        source={image !== '' ? {uri: image} : ImagePlaceholder}
        blurRadius={90}
        style={[
          {
            height,
            zIndex: 100,
            flex: 1,
            position: 'absolute',
            bottom: 0,
          },
        ]}>
        <BottomSheet
          ref={Br}
          snapPoints={[400, 70]}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
          renderHeader={renderHeader}
          renderContent={renderContent}
          enabledInnerScrolling={true}
        />
        <MainMusicPlayerHeader
          title={title}
          artist={ownerAccountUser?.username}
          featured={featuringArtist}
          closeModalPlayer={() => dispatch(closeModalPlayer())}
          openBottomModal={() => openSongBottomSheetModal()}
          // title={data[songIndex].title}
          // artist={data[songIndex].ownerAccountUser.username}
        />
        <View style={styles.mainView}>
          <View
            style={{
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.artworkWrapper}>
              <Image style={styles.artWorkImg} source={{uri: image}} />
              <View style={{position: 'absolute', top: '40%', right: '40%'}}>
                {bufferingView}
              </View>
            </View>
            {/* <Animated.FlatList
                ref={songSlider}
                data={mediaSongs}
                renderItem={renderSongs}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: {x: scrollX},
                      },
                    },
                  ],
                  {useNativeDriver: true},
                )}
              /> */}
          </View>
          {/* SONG DETAILS */}
          <View>
            <Text style={styles.title}>
              {title}&nbsp;
              {featuringArtist && (
                <Text
                  style={
                    styles.featuredArtists
                  }>{`ft (${featuringArtist})`}</Text>
              )}
            </Text>
            <Text style={styles.artist}>{ownerAccountUser?.username}</Text>
          </View>
          {/* SLIDER */}
          <View style={{width, paddingHorizontal: 20, marginTop: 10}}>
            <SliderComponent color="#000" showTime />
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={() => changeRepeatMode()}
              activeOpacity={0.8}
              style={styles.icon}>
              <MaterialCommunityIcons
                name={`${repeatIcon()}`}
                color={repeatState !== 'off' ? '#F68128' : '#FFF'}
                size={scale(26)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.icons}
              onPress={() => skipToPreviousMusic()}>
              <Icon name="play-skip-back" color="#ddd" size={scale(28)} />
            </TouchableOpacity>
            {/* PLAY/PAUSEBT */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => toggleMusicPlay()}
              style={styles.IconCont}>
              {mainBtnView}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.icons}
              onPress={() => skipToNextMusic()}>
              <Icon name="play-skip-forward" color="#ddd" size={scale(28)} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleShuffle()}
              activeOpacity={0.8}
              style={[styles.icon]}>
              <MaterialCommunityIcons
                name={shuffleState ? 'shuffle' : 'shuffle-disabled'}
                color={shuffleState ? '#f68128' : '#fff'}
                size={scale(28)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
      </ImageBackground>
    </Modal>
  );
};

export default MainMusicPlayer;

const styles = ScaledSheet.create({
  container: {},
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artworkWrapper: {
    width: '250@s',
    height: '250@s',
    position: 'relative',
    // marginBottom: '2@s',
  },
  artWorkImg: {
    width: '100%',
    height: '100%',
    borderRadius: '10@s',
  },
  title: {
    fontSize: '15@s',
    fontFamily: 'Helvetica-ExtraBold',
    textAlign: 'center',
    color: '#fff',
    marginTop: 5,
  },
  artist: {
    fontSize: '13@s',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    color: '#F68128',
    marginTop: -5,
  },
  controls: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: '5%',
  },
  icons: {
    borderRadius: 40 / 2,
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    // backgroundColor: '#111',
  },
  icon: {
    borderRadius: 40 / 2,
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // borderColor: '#666',
    //
  },
  IconCont: {
    borderRadius: 80 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.065)',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.085)',
    shadowColor: 'rgba(255,255,255,0.085)',
    paddingTop: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  nextBtn: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 13,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 300,
  },
});

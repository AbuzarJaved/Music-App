import React, {useEffect, useState, Component, PureComponent} from 'react';
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
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {
  openModalPlayer,
  closeModalPlayer,
  shuffleSongs,
} from '../../redux/actions/musicPlayerActions';
import PlayerContext from '../../PlayerContext/PlayerContext';
import Loader from '../../Components/Animations/ActivityIndicator';
import LoadingAmin from '../../Components/Animations/Small_LoadingAnime';
import ImagePlaceholder from '../../assests/images/image-placeholder.png';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetContent from './MusicPlayerBottomSheet';
import GenrealBotomSheet from '../../Components/BottomSheet/GeneralBottomSheet';
import PopUp from './SmallPopUpModal';

import SliderComponent from '../../Components/Slider/Slider';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

class MusicPlayer extends PureComponent {
  static contextType = PlayerContext;
  constructor(props) {
    super(props);

    this.state = {
      currentTrackDetails: {},
      sheetRef: React.createRef(null),
      icon: false,
    };
  }

  render() {
    const {title, url, image, id, artist, featuredArtists, ownerAccountUser} =
      this.context.currentTrackDetails;
    const Br = React.createRef();
    const fall = new Animated.Value(1);
    const featuringArtist = featuredArtists?.join('&');

    const toggleBottomSheet = () => {
      if (this.state.icon) {
        Br.current.snapTo(1);
      } else {
        Br.current.snapTo(0);
      }
      this.setState(prevState => ({
        icon: !prevState.icon,
      }));
    };

    const shuffleMusic = () => {
      this.props.shuffleSongs();
      this.context.changeToShuffle();
    };

    const renderContent = () => (
      <BottomSheetContent
        toggleBottomSheet={toggleBottomSheet}
        icon={this.state.icon}
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
          {!this.state.icon ? (
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

    let playBtn = null;
    let pauseBtn = null;
    let loadingAnimes = null;
    let stoppedBtn = null;
    let bufferingBtn = null;
    if (this.context.isMusicPlaying) {
      playBtn = (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.context.musicPause()}
          onLongPress={() => this.context.musicPause()}
          hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
          style={styles.IconCont}>
          <Icon name="pause" color="#eee" size={scale(40)} style={{}} />
        </TouchableOpacity>
      );
    }

    if (this.context.isMusicBuffering) {
      bufferingBtn = (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.context.musicPause()}
          onLongPress={() => this.context.musicPause()}
          hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
          style={styles.IconCont}>
          <Icon name="pause" color="#eee" size={scale(40)} style={{}} />
        </TouchableOpacity>
      );
    }

    if (this.context.isMusicPaused) {
      pauseBtn = (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.context.musicPlay()}
          style={styles.IconCont}>
          <Icon name="play" color="#eee" size={scale(40)} style={{}} />
        </TouchableOpacity>
      );
    }
    if (this.context.isMusicStopped || this.context.isMusicEmpty) {
      stoppedBtn = (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.context.musicPlay()}
          style={styles.IconCont}>
          <Icon name="pause" color="#eee" size={scale(40)} style={{}} />
        </TouchableOpacity>
      );
    }
    if (this.context.isMusicBuffering) {
      loadingAnimes = (
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 200,
            top: '50%',
            left: '40%',
          }}
          activeOpacity={0.8}>
          <ActivityIndicator size={65} color="#eee" />
        </TouchableOpacity>
      );
    }

    return (
      <>
        <Modal
          animationType="slide"
          swipeDirection="down"
          isVisible={this.props.openMusicPlayer.isMusicPlayerOpen}
          onSwipeComplete={() => this.props.closeModalPlayer()}
          onRequestClose={() => this.props.closeModalPlayer()}
          style={{
            flex: 1,
            marginLeft: 0,
            marginRight: 0,
          }}>
          <ImageBackground
            source={image !== '' ? {uri: image} : ImagePlaceholder}
            blurRadius={90}
            style={[
              {
                height,
                backgroundColor: '#1A1A1A',
                zIndex: 100,
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
            <View
              style={[
                {
                  width,
                  alignItems: 'center',
                  height: '100%',

                  flex: 1,
                  paddingHorizontal: 5,
                  marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 30,
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
                  onPress={() => {
                    console.log('here');
                    this.props.closeModalPlayer();
                  }}>
                  <Icon name="chevron-down" size={scale(24)} color="#F68128" />
                </TouchableOpacity>
                <View style={{marginTop: 5}}>
                  <Text
                    style={{
                      color: '#F68128',
                      fontSize: scale(12),
                      alignSelf: 'center',
                      fontFamily: 'Helvetica-ExtraBold',
                    }}>
                    {title}
                  </Text>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: scale(10),
                      alignSelf: 'center',
                      fontFamily: 'Helvetica-ExtraBold',
                    }}>
                    {ownerAccountUser?.username}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{top: 100, left: 100, right: 100, bottom: 100}}>
                  <Icon
                    name="ellipsis-vertical"
                    size={scale(24)}
                    color="#F68128"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  {
                    width: '85%',
                    height: height / 2.2,
                    borderRadius: 10,
                    marginTop: '2%',
                  },
                ]}>
                {loadingAnimes}
                <Image
                  source={image !== '' ? {uri: image} : ImagePlaceholder}
                  style={{width: null, height: '100%', borderRadius: 10}}
                />
              </View>
              <View style={{marginTop: '2%', paddingHorizontal: '10%'}}>
                <Text
                  style={{
                    color: '#eee',
                    fontSize: scale(15),
                    textAlign: 'center',
                    fontFamily: 'Helvetica-ExtraBold',
                  }}
                  numberOfLines={1}>
                  {title}&nbsp;
                  {featuringArtist && (
                    <Text
                      style={
                        styles.featuredArtists
                      }>{`ft (${featuringArtist})`}</Text>
                  )}
                </Text>
                <Text
                  style={{
                    color: '#f68128',
                    fontSize: scale(14),
                    textAlign: 'center',
                    fontFamily: 'Helvetica-Bold',
                  }}
                  numberOfLines={1}>
                  {ownerAccountUser?.username}
                </Text>
              </View>

              <View style={{width, paddingHorizontal: 20, marginTop: 10}}>
                <SliderComponent color="#000" showTime />
              </View>

              <View
                style={{
                  width,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 25,
                  alignItems: 'center',
                  marginTop: '5%',
                }}>
                {this.context.repeatState === 'Repeat Off' ? (
                  <TouchableOpacity
                    onPress={() => this.context.changeToRepeatOff()}
                    activeOpacity={0.8}
                    style={styles.icon}>
                    <Icon name="repeat" color="#eee" size={scale(26)} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.context.changeToRepeatOn()}
                    style={[styles.icon]}>
                    <Icon name="repeat" color="#F68128" size={scale(26)} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.icons}
                  onPress={() => this.context.skipToPreviousMusic()}>
                  <Icon
                    name="play-skip-back"
                    color="#f68128"
                    size={scale(28)}
                  />
                </TouchableOpacity>

                {playBtn}
                {pauseBtn}
                {stoppedBtn}
                {bufferingBtn}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.icons}
                  onPress={() => this.context.skipToNextMusic()}>
                  <Icon
                    name="play-skip-forward"
                    color="#f68128"
                    size={scale(28)}
                  />
                </TouchableOpacity>
                {this.context.shuffleState === 'Shuffle mode' ? (
                  <TouchableOpacity
                    onPress={() => this.context.changeToOrder()}
                    activeOpacity={0.8}
                    style={[styles.icon]}>
                    <Icon name="shuffle" color="#f68128" size={scale(28)} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => shuffleMusic()}
                    activeOpacity={0.8}
                    style={styles.icon}>
                    <Icon name="swap-horizontal" color="#eee" size={24} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = ({openMusicPlayer}) => ({
  openMusicPlayer,
});
export default connect(mapStateToProps, {
  openModalPlayer,
  closeModalPlayer,
  shuffleSongs,
})(MusicPlayer);

const styles = ScaledSheet.create({
  container: {
    width,
    height,
    flex: 1,
    // position: 'relative',
    // paddingBottom:10
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginLeft: -10,
  },
  IconCont: {
    borderRadius: 80 / 2,

    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.061)',
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
  },
  icon: {
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.061)',
    shadowColor: 'rgba(255,255,255,0.061)',
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
  featuredArtists: {
    fontSize: '15@s',
  },
});

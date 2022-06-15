import React, {useEffect, useState, Component, PureComponent} from 'react';
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
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  openModalPlayer,
  closeModalPlayer,
  openModalPlayerFromMiniPlayer,
} from '../../redux/actions/musicPlayerActions';
import PlayerContext from '../../PlayerContext/PlayerContext';
import LinearGradient from 'react-native-linear-gradient';
import LoadingAnim from '../../Components/Animations/Small_LoadingAnime';
import Loader from '../../Components/Animations/ActivityIndicator';
// import Icon from 'react-native-vector-icons/Ionicons';
import ImagePlaceholder from '../../assests/images/image-placeholder.png';
import {scale, ScaledSheet} from 'react-native-size-matters';

import SliderComponent from '../Slider/Slider';

const {width, height} = Dimensions.get('window');

class MiniPlayer extends Component {
  static contextType = PlayerContext;

  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.ValueXY({x: 0, y: 0}),
    };
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        this.state.animation.extractOffset();
      },
      onPanResponderMove: (event, gestureState) => {
        this.state.animation.setValue({x: 0, y: gestureState.dy});
      },
      onPanResponderRelease: (event, gestureState) => {},
    });
  }
  // final bottom anime animation: new Animated.ValueXY({x: 0, y: height - height / 1.5}),

  render() {
    if (this.context.isMusicEmpty || !this.context.currentMusicTrack)return null;

    const {title, url, image, id, artists, featuredArtists, ownerAccountUser} =
      this.context.currentTrackDetails;
    // console.log(this.context.currentTrackDetails, 'MY PROPS');
    const animatedHeight = {
      transform: this.state.animation.getTranslateTransform(),
    };
    const featuringArtist = featuredArtists?.join('&');
    // console.log(this.context.currentTrackDetails, 'MINIPLAYERPROPS');

    return (
      <View style={styles.mini}>
        <View style={styles.container}>
          <View
            style={{
              position: 'absolute',
              // bottom: 65,
              bottom: '85%',
              // height: 30,
              // top:0,
              left: 0,
              right: 0,
              // width: '100%',
              // flex: 1,
            }}>
            <SliderComponent color="#999" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width,
              alignItems: 'center',
              height: '100%',
              flex: 1,
              // paddingHorizontal: 5,
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.props.openModalPlayerFromMiniPlayer()}
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
                  borderRadius: 5,
                  marginRight: 10,
                  marginLeft: 18,
                }}>
                <Image
                  // source={{uri: image}}
                  source={image !== '' ? {uri: image} : ImagePlaceholder}
                  style={{width: 45, height: 45, borderRadius: 5}}
                />
              </View>
              <View style={styles.artistDetail}>
                <Text
                  style={{
                    color: '#eee',
                    textTransform: 'capitalize',
                    fontSize: scale(10),
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
                    color: '#F68128',
                    textTransform: 'capitalize',
                    fontSize: 11,
                  }}
                  numberOfLines={1}>
                  {ownerAccountUser?.username}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: scale(15),
              }}>
              {this.context.isMusicPlaying && (
                <TouchableOpacity
                  onPress={() => this.context.pause()}
                  onLongPress={() => this.context.pause()}
                  hitSlop={{top: 100, right: 100, left: 100, bottom: 100}}
                  style={styles.IconCont}>
                  <Icon
                    name="pause"
                    color="#eee"
                    size={scale(28)}
                    style={{paddingLeft: 2}}
                  />
                </TouchableOpacity>
              )}
              {this.context.isMusicPaused && (
                <TouchableOpacity
                  onPress={() => this.context.musicPlay()}
                  style={styles.IconCont}>
                  <Icon
                    name="play"
                    color="#eee"
                    size={scale(28)}
                    style={{paddingLeft: 3}}
                  />
                </TouchableOpacity>
              )}
              {this.context.isMusicStopped && (
                <TouchableOpacity
                  onPress={() => this.context.musicPlay()}
                  style={styles.IconCont}>
                  <Icon
                    name="pause"
                    color="#eee"
                    size={scale(28)}
                    style={{paddingLeft: 3}}
                  />
                </TouchableOpacity>
              )}
              {this.context.isMusicBuffering && (
                <TouchableOpacity
                  onPress={() => this.context.musicPlay()}
                  onLongPress={() => this.context.musicPlay()}
                  hitSlop={{top: 100, right: 100, left: 100, bottom: 100}}
                  style={styles.IconCont}>
                  <Icon
                    name="pause"
                    color="#eee"
                    size={scale(28)}
                    style={{paddingLeft: 2}}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.icons}
                onPress={() => this.context.skipToNextMusic()}>
                <Icon
                  name="play-skip-forward"
                  color="#f68128"
                  size={scale(22)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({openMusicPlayer}) => ({
  openMusicPlayer,
});

export default connect(mapStateToProps, {
  openModalPlayer,
  closeModalPlayer,
  openModalPlayerFromMiniPlayer,
})(MiniPlayer);
// this.props.navigation.navigate('Now_Playing');

const styles = ScaledSheet.create({
  container: {
    width,
    height: 65,
    position: 'relative',
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 0,
    borderBottomColor: '#1A1',
  },
  // IconCont: {
  //   borderRadius: 50 / 2,

  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: 50,
  //   height: 50,

  //   backgroundColor: '#f68128',
  //   marginRight: 15,
  // },
  artistDetail: {
    flex: 1,
    width: '80%',
  },
  icons: {
    marginLeft: 10,
    //   borderRadius: 40 / 2,

    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   width: 40,
    //   height: 40,
    //   backgroundColor: '#111',
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
  featuredArtists: {
    fontSize: '10@s',
  },
});

// LINEAR GRADIENT
{
  /* <Animated.View style={styles.mini}>
  <View style={styles.container}>
    <View
      style={{
        position: 'absolute',
        bottom: 38,
        height: 30,
        left: 0,
        right: 0,
        width,
        flex: 1,
      }}>
      <SliderComponent color="#999" />
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
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.props.openModalPlayerFromMiniPlayer()}
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
            borderRadius: 5,
            marginRight: 10,
            marginLeft: 18,
          }}>
          <Image
            source={image}
            style={{width: 45, height: 45, borderRadius: 5}}
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
            {title}
          </Text>
          <Text
            style={{
              color: '#eee',
              textTransform: 'capitalize',
              fontSize: 11,
            }}
            numberOfLines={1}>
            {artist}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
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
            <Icon name="play" color="#eee" size={30} style={{paddingLeft: 3}} />
          </TouchableOpacity>
        )}
        {this.context.isStopped && (
          <TouchableOpacity
            onPress={() => this.context.play()}
            style={styles.IconCont}>
            <Icon name="play" color="#eee" size={30} style={{paddingLeft: 3}} />
          </TouchableOpacity>
        )}
        {this.context.isBuffering && (
          <TouchableOpacity style={{marginRight: 18}}>
            <LoadingAnim width={30} height={30} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
</Animated.View>; */
}

// ANOTHER VERSION

// <Animated.View
//   style={[
//     {
//       // backgroundColor: '#1A1678',
//       // height: 60,
//       // flex: 1,
//       // height: this.state.animation.y,
//     },
//   ]}>
//   <Animated.View
//     style={[
//       {
//         backgroundColor: '#1A1A1A',
//         // height: 80,
//         // flex: 1,
//         // height: this.state.animation.y,
//       },
//     ]}>
//     <Animated.View
//       {...this.panResponder.panHandlers}
//       style={[
//         animatedHeight,
//         {
//           width: '100%',
//           height: height,

//           backgroundColor: '#1A1',
//           opacity: 1,
//           // zIndex: -1000,
//           // position: 'absolute',
//           // top: height,
//           // right: 0,
//           // left: 0,
//           // bottom: 0,
//           // flex: 1,
//         },
//       ]}>
//       {/* <Animated.View
//         style={{
//           position: 'absolute',
//           bottom: 38,
//           height: 30,
//           left: 0,
//           right: 0,
//           width,
//           flex: 1,
//         }}>
//         <SliderComponent color="#999" />
//       </Animated.View> */}
//       <Animated.View
//         style={{
//           flexDirection: 'row',
//           width,
//           alignItems: 'center',
//           height: '100%',
//           flex: 1,
//           paddingHorizontal: 5,
//         }}>
//         <TouchableOpacity
//           activeOpacity={0.6}
//           onPress={() => this.props.openModalPlayerFromMiniPlayer()}
//           // style={{
//           //   flexDirection: 'row',
//           //   width,
//           //   alignItems: 'center',
//           //   height: '100%',
//           //   flex: 1,
//           //   paddingHorizontal: 5,
//           // }}
//         >
//           <View
//             style={{
//               width: 45,
//               height: 45,
//               borderRadius: 5,
//               marginRight: 10,
//               marginLeft: 18,
//             }}>
//             <Image
//               source={image}
//               style={{width: 45, height: 45, borderRadius: 5}}
//             />
//           </View>
//           <View style={styles.artistDetail}>
//             <Text
//               style={{
//                 color: '#eee',
//                 textTransform: 'capitalize',
//                 fontSize: 14,
//               }}
//               numberOfLines={1}>
//               {title}
//             </Text>
//             <Text
//               style={{
//                 color: '#eee',
//                 textTransform: 'capitalize',
//                 fontSize: 11,
//               }}
//               numberOfLines={1}>
//               {artist}
//             </Text>
//           </View>
//         </TouchableOpacity>
//         <Animated.View>
//           {this.context.isPlaying && (
//             <TouchableOpacity
//               onPress={() => this.context.pause()}
//               onLongPress={() => this.context.pause()}
//               hitSlop={{top: 100, right: 100, left: 100, bottom: 100}}
//               style={styles.IconCont}>
//               <Icon
//                 name="pause"
//                 color="#eee"
//                 size={30}
//                 style={{paddingLeft: 2}}
//               />
//             </TouchableOpacity>
//           )}
//           {this.context.isPaused && (
//             <TouchableOpacity
//               onPress={() => this.context.play()}
//               style={styles.IconCont}>
//               <Icon
//                 name="play"
//                 color="#eee"
//                 size={30}
//                 style={{paddingLeft: 3}}
//               />
//             </TouchableOpacity>
//           )}
//           {this.context.isStopped && (
//             <TouchableOpacity
//               onPress={() => this.context.play()}
//               style={styles.IconCont}>
//               <Icon
//                 name="play"
//                 color="#eee"
//                 size={30}
//                 style={{paddingLeft: 3}}
//               />
//             </TouchableOpacity>
//           )}
//           {this.context.isBuffering && (
//             <TouchableOpacity style={{marginRight: 18}}>
//               <LoadingAnim width={30} height={30} />
//             </TouchableOpacity>
//           )}
//         </Animated.View>
//       </Animated.View>
//     </Animated.View>
//   </Animated.View>
// </Animated.View>

// PARTIAL
//    <Animated.View
//   {...this.panResponder.panHandlers}
//   style={[
//     animatedHeight,
//      {backgroundColor: '#1A1A1A', opacity: 1, height: height},
//   ]}>
//   <Animated.View style={{height: height - 60, paddingHorizontal: 20}}>
//     <Animated.View
//       style={{
//         width: '100%',
//         flexDirection: 'row',
//         justifyContent: 'space-between',

//         marginTop: 20,

//         height: 20,
//         alignItems: 'center',
//       }}>
//       <TouchableOpacity
//         activeOpacity={0.6}
//         hitSlop={{top: 100, left: 100, right: 100, bottom: 100}}>
//         <Icon name="chevron-down" size={24} color="#eee" />
//       </TouchableOpacity>
//       <Text style={{color: '#eee', fontSize: 12, alignSelf: 'center'}}>
//         Now Playing
//       </Text>
//       <TouchableOpacity
//         activeOpacity={0.6}
//         hitSlop={{top: 100, left: 100, right: 100, bottom: 100}}>
//         <Icon name="ellipsis-vertical" size={24} color="#eee" />
//       </TouchableOpacity>
//     </Animated.View>

//     {/* CONTENT */}
//     <Animated.View
//       style={{
//         alignItems: 'center',

//         marginTop: 20,
//       }}>
//       <Animated.View
//         style={{
//           width: width / 1.2,
//           height: height / 2.2,
//           borderRadius: 20,
//         }}>
//         <Image
//           style={{
//             width: '100%',
//             height: '100%',
//             borderRadius: 20,
//           }}
//           source={require('../../assests/images/caro1.jpg')}
//         />
//       </Animated.View>

//       <Animated.Text
//         style={{
//           color: '#fff',
//           fontSize: 20,
//           marginTop: '3%',
//           fontFamily: 'Gilroy-ExtraBold',
//           textTransform: 'capitalize',
//           marginBottom: '1%',
//           opacity: 1,
//         }}>
//         Bad Liar
//       </Animated.Text>
//       <Animated.Text
//         style={{
//           color: '#F68128',
//           fontSize: 15,

//           fontFamily: 'Gilroy-ExtraBold',
//           textTransform: 'capitalize',
//           opacity: 1,
//         }}>
//         Imagine Dragons
//       </Animated.Text>

//       <Animated.View
//         style={{
//           marginTop: '5%',
//           width: '100%',
//           alignItems: 'center',
//           opacity: 1,
//         }}>
//         <SliderComponent color="#999" />
//       </Animated.View>

//       <Animated.View
//         style={{
//           width,
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//           paddingHorizontal: 20,
//           alignItems: 'center',
//           opacity: 1,
//           marginTop: '10%',
//         }}>
//         <TouchableOpacity activeOpacity={0.6} style={styles.icon}>
//           <Icon name="repeat" color="#eee" size={22} />
//         </TouchableOpacity>
//         <TouchableOpacity activeOpacity={0.6} style={styles.icons}>
//           <Icon name="play-skip-back" color="#f68128" size={24} />
//         </TouchableOpacity>

//         {this.context.isPlaying && (
//           <TouchableOpacity
//             onPress={() => this.context.pause()}
//             onLongPress={() => this.context.pause()}
//             hitSlop={{top: 100, right: 100, left: 100, bottom: 100}}
//             style={styles.IconCont}>
//             <Icon
//               name="pause"
//               color="#eee"
//               size={30}
//               style={{paddingLeft: 2}}
//             />
//           </TouchableOpacity>
//         )}
//         {this.context.isPaused && (
//           <TouchableOpacity style={styles.IconCont}>
//             <Icon
//               name="play"
//               color="#eee"
//               size={30}
//               style={{paddingLeft: 3}}
//             />
//           </TouchableOpacity>
//         )}
//         {this.context.isStopped && (
//           <TouchableOpacity style={styles.IconCont}>
//             <Icon
//               name="play"
//               color="#eee"
//               size={30}
//               style={{paddingLeft: 3}}
//             />
//           </TouchableOpacity>
//         )}
//         {this.context.isBuffering && (
//           <TouchableOpacity>
//             <LoadingAmin width={50} height={50} />
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity activeOpacity={0.6} style={styles.icons}>
//           <Icon name="play-skip-forward" color="#f68128" size={24} />
//         </TouchableOpacity>
//         <TouchableOpacity activeOpacity={0.6} style={styles.icon}>
//           <Icon name="shuffle" color="#eee" size={22} />
//         </TouchableOpacity>
//       </Animated.View>
//     </Animated.View>
//   </Animated.View>
//   <Animated.View
//     style={[
//       {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 1000,
//         height: height,
//       },
//     ]}>
//     <Text style={{color: '#fff', textAlign: 'center', fontSize: 14}}>
//       Up Next
//     </Text>
//   </Animated.View>
// </Animated.View>

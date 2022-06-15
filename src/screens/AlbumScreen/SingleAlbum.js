import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Animateds from 'react-native-reanimated';
import AlbumBottomSheet from './component/AlbumBottomSheet/BottomSheet';
import BottomSheet from 'reanimated-bottom-sheet';
import Header from './component/Header';
import AlbumIconDetails from './component/AlbumIconDetails';
import LoginBtn from '../../Components/Button/LoginBtn';
import AlbumSongs from './component/AlbumSongs';
import SongContainer from '../../Components/LibrarySongs/GeneralSong';
import data from '../../data';
import MediaSongs from '../../Components/LibrarySongs/MediaSongs';
import PlayerContext from '../../PlayerContext/PlayerContext';
import {play_Media} from '../../redux/actions/MediaActions/getMediaActions';
import {openModalPlayer} from '../../redux/actions/musicPlayerActions';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

class SingleAlbumScreen extends Component {
  constructor(props) {
    super(props);

    this.scrollY = new Animated.Value(0);

    this.animatedOpacity = this.scrollY.interpolate({
      inputRange: [0, height / 5, height / 2.3],
      outputRange: [1, 0.3, 0],
    });
    this.animatedOverlayOpacity = this.scrollY.interpolate({
      inputRange: [0, height / 5, height / 2.3],
      outputRange: [0.5, 0.7, 1],
    });
    this.animatedHeaderOpacity = this.scrollY.interpolate({
      inputRange: [0, height / 5, height / 2.3],
      outputRange: [0, 0.3, 0.7],
    });
    this.animatedZIndex = this.scrollY.interpolate({
      inputRange: [0, height / 5, height / 2.3],
      outputRange: [0, 300, 900],
    });
  }

  render() {
    const songs = data.map((song, index) => (
      <SongContainer
        {...song}
        index={index}
        indexes
        showLikeBtn
        key={song.title}
      />
    ));
    // REF FRO BOTTOM SHEET
    const Bs = React.createRef(null);
    const {name, description, year, id, url, owner} =
      this.props.storeActiveAlbumDetails;
    const fall = new Animateds.Value(1);
    const renderContent = () => <AlbumBottomSheet onPress={Bs} />;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Animated.View style={[styles.container, {}]}>
          {/* BOTTOM SHEET */}
          <BottomSheet
            ref={Bs}
            snapPoints={[350, 0]}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
            borderRadius={10}
            renderContent={renderContent}
          />
          {/* ANIMATED VIEW */}
          <Animated.View
            style={[
              styles.animatedView,
              {
                opacity: this.animatedHeaderOpacity,
                zIndex: this.animatedZIndex,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.6}
              // style={{alignSelf: 'center'}}
              onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#f68128" />
            </TouchableOpacity>
            {/* ANIMATED ALBUM NAME */}
            <View style={styles.animatedAlbumView}>
              <Text style={styles.animatedAlbumName}>{name}</Text>
              <Text style={styles.animatedAlbumSubName}>{owner?.username}</Text>
            </View>
          </Animated.View>
          <Animated.ScrollView
            contentContainerStyle={{width}}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={e => {
              this.scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
            {/* HEADER */}
            <Header onPress={Bs} />

            <Animateds.View
              style={{
                opacity: Animateds.add(0.1, Animateds.multiply(fall, 0.9)),
              }}>
              {/* BACKGROUND */}
              <ImageBackground
                style={styles.backgroundImage}
                source={
                  url !== '' || url !== null
                    ? {uri: url}
                    : require('../../assests/images/albums-placeholder.jpg')
                }
                blurRadius={0}>
                {/* BLACK OVERLAY */}
                <Animated.View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: '#000',
                    opacity: this.animatedOverlayOpacity,
                  }}
                />
                {/* CONTENT */}
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width,
                    height: '90%',
                  }}>
                  {/* LEFT CONTENT */}
                  <Animated.View
                    style={[
                      styles.leftContent,
                      {opacity: this.animatedOpacity},
                    ]}>
                    <Image
                      source={
                        url !== '' || url !== null
                          ? {uri: url}
                          : require('../../assests/images/albums-placeholder.jpg')
                      }
                      style={{
                        width: '100%',
                        height: '70%',
                        borderRadius: 20,
                        marginTop: 10,
                        zIndex: 200,
                      }}
                    />
                    {/* <Animated.View style={[styles.iconCont]}>
                      <AlbumIconDetails />
                    </Animated.View> */}
                  </Animated.View>
                  {/* RIGHT CONTENT */}
                  <Animated.View
                    style={[
                      styles.rightContent,
                      {opacity: this.animatedOpacity},
                    ]}>
                    {/* ALBUM DETAILS */}
                    <View>
                      <Text style={styles.Album_artist}>{name}</Text>
                      <Text style={styles.Album_title}>{owner?.username}</Text>
                      {/* <Text style={styles.Album_time}>28 songs, 2hr 28min</Text> */}
                    </View>
                    {/* BUTTONS */}
                    <View style={styles.btn}>
                      <View style={{width: '100%', marginBottom: 10}}>
                        <LoginBtn title="Play" icon="play" height={40} />
                      </View>
                    </View>
                  </Animated.View>
                </View>
                <Animated.Text
                  style={{
                    color: '#DDD',
                    textAlign: 'center',
                    height: '10%',
                    opacity: this.animatedOpacity,
                    fontFamily: 'Helvetica-Bold',
                  }}>
                  Released year: {year}
                </Animated.Text>
              </ImageBackground>
              <Animated.View style={styles.songs}>
                <Text style={[styles.Album_artist, {marginBottom: scale(20)}]}>
                  Songs ()
                  {/* {media.length <= 0
                    ? `Song (${media.length})`
                    : `Songs (${media.length})`} */}
                </Text>
                {/* <ScrollView>{songs}</ScrollView> */}
              </Animated.View>
            </Animateds.View>
          </Animated.ScrollView>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({storeActiveAlbumDetails}) => ({
  storeActiveAlbumDetails,
});

export default connect(mapStateToProps, {play_Media, openModalPlayer})(
  SingleAlbumScreen,
);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  backgroundImage: {
    height: height / 1.8,
    width,
    position: 'absolute',
    top: 0,
    // paddingBottom: 10,

    // opacity: 0.5,
  },
  content: {},
  songs: {
    flex: 1,
    position: 'relative',
    // padding:20
    // height,
  },
  Album_artist: {
    marginTop: 5,
    color: '#fff',
    fontSize: '18@s',
    fontFamily: 'Helvetica-ExtraBold',
    width: '100%',
    flexWrap: 'wrap',
  },
  Album_title: {
    color: '#f68128',
    fontSize: '12@s',
    fontFamily: 'Helvetica-Medium',
    // width: '50%',/
    flexWrap: 'wrap',
    marginTop: 2,
  },
  Album_time: {
    color: '#eee',
    fontSize: 13,
    fontFamily: 'Helvetica-Medium',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  iconCont: {
    width: '100%',
    alignSelf: 'center',
    height: '30%',
  },
  btn: {
    width: '100%',
    marginTop: '35%',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  leftContent: {
    width: '40%',
    height: '60%',
    marginRight: 10,
  },
  rightContent: {
    width: '40%',
    marginLeft: 10,
    height: '60%',
    paddingTop: 20,
  },
  songs: {
    paddingHorizontal: 20,
    paddingTop: 40,
    marginTop: height / 1.8,
  },
  animatedView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    backgroundColor: '#000',
    height: 60,
    // zIndex: 900,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  animatedAlbumView: {
    marginLeft: 10,
  },
  animatedAlbumName: {
    color: '#eee',
    fontSize: 20,
    fontFamily: 'Helvetica-Medium',
  },
  animatedAlbumSubName: {
    color: '#f68128',
    fontSize: 15,
    fontFamily: 'Helvetica-Medium',
    // marginTop: 2,
  },
});

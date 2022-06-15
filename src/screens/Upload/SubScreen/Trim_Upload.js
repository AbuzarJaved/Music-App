import React, {useState, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {connect} from 'react-redux';
import Trimmer from 'react-native-trimmer';
import {CheckBox} from 'native-base';
import CustomHeader from '../../../Components/CustomHeader/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import RNAudioKit from '@thehanimo/react-native-audiokit';

import LoginBtn from '../../../Components/Button/LoginBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerContext from '../../../PlayerContext/PlayerContext';

const RNFS = require('react-native-fs');

const {width, height} = Dimensions.get('window');

const maxTrimDuration = 15000;
const minimumTrimDuration = 1000;
const totalDuration = 180000;

const initialLeftHandlePosition = 0;
const initialRightHandlePosition = 15000;

const scrubInterval = 50;

class Trim_Upload extends Component {
  // const navigation = useNavigation();
  // const [songLength, setSongLength] = useState('');
  // changeSongLength = (val) => {
  //   setSongLength(val);
  // };
  static contextType = PlayerContext;
  state = {
    songLength: '',
    playing: false,
    trimmerLeftHandlePosition: initialLeftHandlePosition,
    trimmerRightHandlePosition: initialRightHandlePosition,
    scrubberPosition: 0,
    scrubInterval: 50,
    initialRightHandlePosition: 15000,
    initialLeftHandlePosition: 0,
    totalDuration: 480000,
    minimumTrimDuration: 1000,
    maxTrimDuration: 15000,
    key: '',
    duration: 0,
  };
  playScrubber = () => {
    this.context.trimPlay({
      name: this.props.addTrimTrack.name,
      id: String(this.props.addTrimTrack.size),
      url: this.props.addTrimTrack.url,
    });
    this.setState({playing: true});
    this.scrubberInterval = setInterval(() => {
      this.setState({
        scrubberPosition:
          this.state.scrubberPosition + this.state.scrubInterval,
      });
    }, this.state.scrubInterval);
  };

  pauseScrubber = () => {
    clearInterval(this.scrubberInterval);
    this.context.pause();
    this.setState({
      playing: false,
      scrubberPosition: this.state.trimmerLeftHandlePosition,
    });
  };

  onHandleChange = ({leftPosition, rightPosition}) => {
    this.setState({
      trimmerRightHandlePosition: rightPosition,
      trimmerLeftHandlePosition: leftPosition,
    });
  };

  onScrubbingComplete = (newValue) => {
    console.log('onScrubbingComplete', newValue);
    this.setState({
      playing: this.context.isTrimTrackPaused,
      scrubberPosition: newValue,
    });
  };

  processFile = () => {
    const uid =
      (+new Date() + Math.random() * 100).toString(32) +
      this.props.addTrimTrack.name;
    this.setState({
      key: uid,
    });
    RNFS.moveFile(
      this.props.addTrimTrack.url,
      RNFS.DocumentDirectoryPath + '/' + uid,
    )
      .then(() => {
        RNAudioKit.getDuration(uid).then((res) => {
          console.log(res, 'file processed');
          this.setState({
            totalDuration: res * 1000,
          });
        });
      })
      .catch((err) =>
        console.log('error', err, uid, RNFS.DocumentDirectoryPath),
      );
  };

  componentDidMount() {
    this.processFile();
  }

  render() {
    const {
      trimmerLeftHandlePosition,
      trimmerRightHandlePosition,
      scrubberPosition,
    } = this.state;
    // const {url, id, name, length} = this.props.addTrimTrack.trimTrackDetails;
    const chooseTrimmedSong = async () => {
      console.log(
        this.state.key,
        trimmerLeftHandlePosition / 1000,
        trimmerRightHandlePosition / 1000,
      );
      if (Platform.OS === 'ios') {
        let newFileName = await RNAudioKit.trim(
          this.state.key,
          trimmerLeftHandlePosition / 1000,
          trimmerRightHandlePosition / 1000,
        );
        const newPath = RNFS.DocumentDirectoryPath + '/' + newFileName;
        this.props.navigation.navigate('Upload', {newPath: newPath});
      } else {
        let newFileName = await RNAudioKit.trim(
          this.props.addTrimTrack.url,
          trimmerLeftHandlePosition / 1000,
          trimmerRightHandlePosition / 1000,
        );
        console.log(newFileName);
      }
    };
    let playBtn = null;
    let pauseBtn = null;
    let loadingAnimes = null;
    let stoppedBtn = null;
    if (this.context.isTrimTrackPlaying) {
      playBtn = (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.playCont}
          // onPress={() => this.playScrubber()}
          onPress={() => this.pauseScrubber()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="pause" color="#eee" size={24} />
        </TouchableOpacity>
      );
    }
    if (this.context.isTrimTrackPaused) {
      pauseBtn = (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.playCont}
          // onPress={() => this.play()}
          onPress={() => this.context.musicPlay()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="play" color="#eee" size={24} />
        </TouchableOpacity>
      );
    }
    if (this.context.isTrimTrackStopped || this.context.isTrimTrackEmpty) {
      stoppedBtn = (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.playCont}
          // onPress={() => this.pauseScrubber()}
          onPress={() => this.playScrubber()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="pause" color="#eee" size={24} />
        </TouchableOpacity>
      );
    }
    if (this.context.isTrimTrackBuffering) {
      loadingAnimes = (
        <TouchableOpacity style={styles.IconCont} activeOpacity={0.8}>
          <ActivityIndicator size="small" color="#F68128" />
        </TouchableOpacity>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <CustomHeader title="Trim your song" />

            <View style={styles.content}>
              {/* <ScrollView contentContainerStyle={{ width: '100%'}}> */}
              {/* SONG DETAILS */}
              <View style={styles.songDetail}>
                {/* SONG NAME */}
                <Text
                  style={{
                    color: '#eee',
                    fontSize: 13,
                    fontFamily: 'Gilroy-ExtraBold',
                    textTransform: 'capitalize',
                    marginBottom: 5,
                  }}>
                  Song:
                  <Text
                    style={{
                      color: '#eee',
                      fontSize: 14,
                      fontFamily: 'Gilroy-Bold',
                      textTransform: 'capitalize',
                    }}>
                    &nbsp;{this.props.addTrimTrack.name}
                  </Text>
                </Text>
                {/* SONG TYPE */}
                <Text
                  style={{
                    color: '#eee',
                    fontSize: 13,
                    fontFamily: 'Gilroy-ExtraBold',
                    textTransform: 'capitalize',
                    marginBottom: 5,
                  }}>
                  Type:
                  <Text
                    style={{
                      color: '#eee',
                      fontSize: 14,
                      fontFamily: 'Gilroy-Bold',
                      textTransform: 'capitalize',
                    }}>
                    &nbsp;{this.props.addTrimTrack.type}
                  </Text>
                </Text>
                {/* <Text
                style={{
                  color: '#eee',
                  fontSize: 13,
                  fontFamily: 'Gilroy-ExtraBold',
                  textTransform: 'capitalize',
                  marginBottom: 5,
                }}>
                Size:
                <Text
                  style={{
                    color: '#f68128',
                    fontSize: 15,
                    fontFamily: 'Gilroy-Bold',
                    marginTop: 3,
                  }}>
                  &nbsp; {this.props.addTrimTrack.size}MB
                </Text>
              </Text> */}
              </View>
              {/* SONG TRIMMER */}
              {console.log(this.state.totalDuration)}
              <View style={{marginBottom: 5}}>
                <Trimmer
                  onHandleChange={this.onHandleChange}
                  totalDuration={parseInt(this.state.totalDuration, 0)}
                  trimmerLeftHandlePosition={trimmerLeftHandlePosition}
                  trimmerRightHandlePosition={trimmerRightHandlePosition}
                  minimumTrimDuration={this.state.minimumTrimDuration}
                  maxTrimDuration={this.state.maxTrimDuration}
                  maximumZoomLevel={200}
                  zoomMultiplier={20}
                  initialZoomValue={1}
                  scaleInOnInit={true}
                  tintColor="#f68128"
                  markerColor="#eee"
                  trackBackgroundColor="#000"
                  trackBorderColor="#444"
                  scrubberColor="#999"
                  scrubberPosition={scrubberPosition}
                  onScrubbingComplete={this.onScrubbingComplete}
                  onLeftHandlePressIn={() => console.log('onLeftHandlePressIn')}
                  onRightHandlePressIn={() =>
                    console.log('onRightHandlePressIn')
                  }
                  onScrubberPressIn={() => console.log('onScrubberPressIn')}
                />
                {/* <Trimmer
                onLeftHandleChange={null}
                onRightHandleChange={null}
                totalDuration={67500}
                trimmerLeftHandlePosition={null}
                trimmerRightHandlePosition={null}
              /> */}
              </View>
              {/* PREVIEW SECTION */}
              <View style={{flex: 1, paddingHorizontal: 25}}>
                <Text style={{color: '#eee', fontSize: 15}}>Preview</Text>
                {playBtn}
                {pauseBtn}
                {loadingAnimes}
                {stoppedBtn}
                {/* <TouchableOpacity
                activeOpacity={0.6}
                style={styles.playCont}
                onPress={() => this.playScrubber()}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Icon name="pause" color="#eee" size={24} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.playCont}
                onPress={() => this.pauseScrubber()}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Icon name="play" color="#eee" size={24} />
              </TouchableOpacity> */}
                <Text style={{color: '#fff', fontSize: 12, marginTop: 10}}>
                  {this.context.trimTrackState}
                </Text>
                <Text style={{color: '#fff', fontSize: 12}}>
                  left: {this.state.trimmerLeftHandlePosition}
                </Text>
                <Text style={{color: '#fff', fontSize: 12}}>
                  right: {this.state.trimmerRightHandlePosition}
                </Text>
                <Text style={{color: '#fff', fontSize: 12}}>
                  scrubberPosition: {this.state.scrubberPosition}
                </Text>
              </View>
              {/* LIKE BTN */}
              <View
                style={{
                  width: '70%',
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: '5%',
                  // marginTop: '20%',
                }}>
                <LoginBtn title="Done" onPress={() => chooseTrimmedSong()} />
              </View>
              {/* </ScrollView> */}
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = ({addTrimTrack, uploadMedia}) => ({
  addTrimTrack,
  uploadMedia,
});
export default connect(mapStateToProps)(Trim_Upload);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    // paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  content: {
    width,
    flex: 1,
    justifyContent: 'center',
    // alignItems:"center"
    marginTop: '10%',
  },
  text: {
    // marginTop: 30,
    // paddingTop: 50,
    color: '#eee',
    textAlign: 'center',
    fontSize: 13,
    width: '50%',
    alignSelf: 'center',
  },
  checkBox: {
    width,
    // marginTop: 5,
    // paddingHorizontal: 30,
    paddingVertical: 30,
  },

  singleBox: {
    flexDirection: 'row',
    margin: 10,
  },
  songDetail: {
    // flex: 1,
    width,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  playCont: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 40,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#eee',
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCheck: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: '#f68128',
  },
});

{
  /* SINGLE BOX */
}
{
  /* <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.setState({songLength: 'full'})}>
                <View style={styles.singleBox}>
                  <View style={[styles.check]}>
                    {this.state.songLength === 'full' && (
                      <View style={[styles.activeCheck]}></View>
                    )}
                  </View>
                  <Text style={{color: '#eee', marginTop: -4, fontSize: 15}}>
                    Upload full song
                  </Text>
                </View>
              </TouchableOpacity> */
}
{
  /* SINGLE BOX */
}
{
  /* <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.setState({songLength: 'trim'})}>
                <View style={styles.singleBox}>
                  <View style={[styles.check]}>
                    {this.state.songLength === 'trim' && (
                      <View style={[styles.activeCheck]}></View>
                    )}
                  </View>
                  <Text style={{color: '#eee', marginTop: -4, fontSize: 15}}>
                    Trim to 15sec to Discover page
                  </Text>
                </View>
              </TouchableOpacity> */
}

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import {useNavigation} from '@react-navigation/native';
import DownloadIcon from '../../Components/Icons/DownloadIcon';
import LikeBtn from '../../Components/Button/SongsLikeBtn';
import EllipsisBtn from '../../Components/Button/EllipisisVeticalIcon';
import {useDispatch, useSelector} from 'react-redux';
import {openModalPlayer} from '../../redux/actions/musicPlayerActions';
import {openSongBottomSheetView} from '../../redux/actions/songBottomSheetAction';
import {
  unLikeMedia,
  likeMedia,
} from '../../redux/actions/MediaActions/Like_UnLike/Like_Unlike';
import {play_Media} from '../../redux/actions/MediaActions/getMediaActions';
import ImagePlaceholder from '../../assests/images/image-placeholder.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {mainNumberFormat} from '../../utils/loggedInUserType';

const {width} = Dimensions.get('window');

const MedialSong = props => {
  // console.log(props,'MUSIC PROPS')
  const navigation = useNavigation();
  const playerContext = usePlayerContext();
  const musicPlayerDetails = useSelector(state => state.openMusicPlayer);
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;
  // const {mediaTitle, mediaUrl, photoUrl, likeCount} = data;
  // const {firstName, lastName, stageName} = artists;
  // console.log(props, 'DATA');
  const currentTrackId = playerContext.currentTrackId?.id;
  // const currentTrackId = playerContext.currentMusicTrack?.id;
  // console.log(playerContext.currentMusicTrack.id, 'CURRENT MUSIC');

  const dispatch = useDispatch();
  const [userLike, setUserLike] = useState(props.likes);

  const increaseLike = () => {
    setUserLike(userLike + 1);
  };
  const decreaseLike = () => {
    if (userLike > 0) setUserLike(userLike - 1);
  };
  const {} = musicPlayerDetails;
  const currentTrack = {
    title: props.title,
    url: props.url,
    image: props.image,
    id: props.id,

    artwork: props.image,
    artist: props.ownerAccountUser?.username,
    duration: props.duration,
    genre: props.genre?.name,
    album: props.album,
    featuredArtists: props.featuredArtists,
    ownerAccountUser: props.ownerAccountUser,
    hitCount: props.hits,
  };
  const allSongs = {
    currentTrack,
    mediaSongs: props.allSongs,
    // mediaSongs: props.allSongs?.filter(
    //   (x) => x.mediaIdentity !== currentTrack?.id,
    // ),
  };

  const featuringArtist = props.featuredArtists?.join('&');

  // console.log(props.allSongs, 'INDEX');
  const navigate = () => {
    dispatch(play_Media(city, state, country, props.id));
    dispatch(openModalPlayer(allSongs));
    const songsData = [];
    allSongs.mediaSongs.forEach(item =>
      songsData.push({
        ...item,
        artist: item.ownerAccountUser
          ? `${item.ownerAccountUser?.username}`
          : `${item.firstName} ${item.lastName}`,
      }),
    );

    // const check = [...allSongs.mediaSongs];
    const check = [allSongs.currentTrack, ...songsData];
    // console.log(check, 'CHECHHHHHHKKK');
    // console.log(props.index,'Song Index')
    playerContext.playMusic(check, props?.index);

    // playerContext.playMusic(check, props?.index);
  };

  const openBottomSheet = () => {
    playerContext.bottomRef.current.open();

    dispatch(
      openSongBottomSheetView({
        title: props.title,
        url: props.url,
        image: props.image,
        id: props.id,
        artists: props.ownerAccountUser?.username,
        hitCount: props.hits,
        artwork: props.image,
        artist: props.ownerAccountUser?.username,
        duration: props.duration,
        genre: props.genre?.name,
        album: props.album,
        featuredArtists: props.featuredArtists,
        ownerAccountUser: props.ownerAccountUser,
      }),
    );
  };

  let buttonView = null;
  if (props.showLikeBtn) {
    buttonView = (
      <View style={{marginRight: scale(2)}}>
        <LikeBtn
          mediaId={props.id}
          likes={userLike}
          likeCount={props.hits}
          mediaBtn
          col
          increaseLike={increaseLike}
          decreaseLike={decreaseLike}
        />
      </View>
    );
  }

  let indexView = null;
  if (props.indexes) {
    indexView = (
      <Text
        style={{
          color: '#f68126',
          // alignSelf: 'center',
          marginRight: 10,
          fontSize: scale(10),
          marginTop: '5%',
          fontFamily: 'Helvetica-Medium',
          width: '5%',
        }}>
        {props.index < 9 ? `0${props.index + 1}` : `${props.index + 1}`}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {indexView}
      <View
        style={[
          styles.contentStyle,
          props.id === currentTrackId
            ? {backgroundColor: 'rgba(246, 129, 40,0.3)'}
            : {backgroundColor: 'rgba(255,255,255,0.061)'},
        ]}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          activeOpacity={0.7}
          onPress={() => navigate()}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.songImageCont}>
              {/* <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: '#000',
                  opacity: 0.35,
                  zIndex: 50,
                  borderRadius: 10,
                }}
              /> */}
              {/* <View style={styles.likes}>
                <Image
                  source={require('../../assests/images/verification.png')}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 12 / 2,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    color: '#eee',
                    fontSize: 10,
                    fontFamily: 'Helvetica-Medium',
                  }}>
                  {props.hitCount}
                </Text>
              </View> */}

              <Image
                // source={require('../../assests/images/Background.jpg')}
                source={
                  props.image !== '' ? {uri: props.image} : ImagePlaceholder
                }
                style={styles.songImage}
              />
            </View>
            <View style={{marginLeft: scale(10), zIndex: 100, width: '60%'}}>
              <Text numberOfLines={1} style={styles.songName}>
                {props.title}
                &nbsp;
                {featuringArtist && (
                  <Text
                    style={
                      styles.featuredArtists
                    }>{`ft (${featuringArtist})`}</Text>
                )}
              </Text>
              <Text style={styles.songArtist} numberOfLines={1}>
                {props.ownerAccountUser?.username}
              </Text>
              {/* <Text style={styles.songTime}>3:00pm</Text> */}
              {/* Song Details */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 7,
                  // justifyContent: 'space-between',
                }}>
                {/* SingleIcon */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="play" color="#f68128" size={18} />
                  <Text style={styles.songPlay}>
                    {mainNumberFormat(props.hits)}
                  </Text>
                </View>
                {/* SingleIcon */}
                {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <DownloadIcon color="#f68128" width={18} height={18} />
                <Text style={styles.songPlay}>52K</Text>
              </View> */}
                {/* SingleIcon */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20,
                  }}>
                  <Icon name="heart" color="#f68128" size={18} />
                  <Text style={styles.songPlay}>
                    {mainNumberFormat(userLike)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* CONTROLS SIGNAL */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: scale(10),
            width: '20%',
          }}>
          {buttonView}

          <View>
            <EllipsisBtn color="#eee" onPress={() => openBottomSheet()} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MedialSong;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',

    // backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    paddingVertical: 5,
  },
  songImageCont: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  songImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  songName: {
    color: '#F68128',

    // marginTop: 5,
    fontFamily: 'Helvetica-Bold',
    fontSize: '10@s',
    textTransform: 'capitalize',
  },
  songArtist: {
    color: '#EEE',
    fontFamily: 'Helvetica-Medium',
    fontSize: '9@s',
    textTransform: 'capitalize',
    marginTop: '1@s',
  },
  songPlay: {
    color: '#999',
    fontFamily: 'Gilroy-Heavy',
    fontSize: 12,
    textTransform: 'capitalize',
    marginLeft: 5,
  },
  songTime: {
    color: '#999',
    fontFamily: 'Gilroy-Heavy',
    fontSize: 11,
    textTransform: 'capitalize',
    marginTop: 10,
  },
  likes: {
    position: 'absolute',
    left: 5,
    top: '80%',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentStyle: {
    flexDirection: 'row',
    // backgroundColor: '#111',

    paddingLeft: 5,
    borderRadius: 8,
    paddingVertical: 5,
    width: '92%',
    justifyContent: 'space-between',
    // marginRight: 30,
  },
  featuredArtists: {
    fontSize: '8@s',
  },
});

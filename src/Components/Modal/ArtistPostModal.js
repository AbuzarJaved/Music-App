import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import LoginBtn from '../Button/LoginBtn';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LoadingAnime from '../../Components/Animations/Small_LoadingAnime';
import Icon from 'react-native-vector-icons/Ionicons';
import LikeBtn from '../Button/LikeBtn';
import ReplysView from '../../screens/Comment/Component/ReplysView';
import data4 from '../../data4';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';
import ArtistIcon from '../../Components/Icons/ArtistIcon';
import MusicIcon from '../../Components/Icons/MusicIcon';
import GalleryIcon from '../../Components/Icons/GalleryIcon';
import AlbumIcon from '../../Components/Icons/NewAlbumIcons';
import {takePictureFromGallery} from '../../utils/ImagePicker';
import GeneralModal from './GeneralModalCont';
import SongPostView from '../../screens/Home/component/PostSongView/SongPost';
import SongPostViewDesign from './components/SongPostView';
import {useSelector, useDispatch} from 'react-redux';
import {CLEAR_POST_SONG, CLEAR_ERROR} from '../../redux/constants';
import {getLoggedInUserProfile} from '../../utils/loggedInUserType';
import {DEFAULT_IMAGE_URI} from '../../utils/ImagePicker';
import ImageBottomSheetPicker from '../../Components/BottomSheet/ImagePicker';
import {timeline_Post} from '../../redux/actions/TimelineActions';
import MainErrorModal from '../../Components/Modal/MainErrorPopUp';
import MainSuccessModal from '../../Components/Modal/MainSuccessPopUp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ArtistPostModal = props => {
  const dispatch = useDispatch();
  const [profilePics, setProfilePics] = useState('');
  const [artistPost, setArtistPost] = useState('');
  const [profilePicType, setProfilePicType] = useState('');
  const [emptyErr, setEmptyErr] = useState('');
  const [songsModal, setSongsModal] = useState(false);
  const choosePostSong = useSelector(state => state.choosePostSong);
  const timelinePost = useSelector(state => state.timelinePost);
  const {loading, error, message} = timelinePost;
  const {title, id, likeCount, hitCount, image, artist} = choosePostSong;
  const listenerData = getLoggedInUserProfile('LISTENER');
  const {
    userProfile: {firstName, lastName, profileUrl},
  } = listenerData;

  const openSongsModal = () => {
    setSongsModal(true);
  };
  const closeSongsModal = () => {
    setSongsModal(false);
  };
  const closeSongsModal2 = () => {
    setProfilePics('');
    setSongsModal(false);
  };
  const closeandClear = () => {
    props.closePostModal();
    dispatch({type: CLEAR_POST_SONG});
    setProfilePics('');
    setArtistPost('');
  };
  useEffect(() => {
    if (message && message !== '') {
      setTimeout(() => {
        dispatch({type: CLEAR_POST_SONG});
        dispatch({type: CLEAR_ERROR});
        setProfilePicType('');
        setProfilePics('');
        setArtistPost('');
        props.closePostModal();
      }, 4000);
    }
    () => clearTimeout();
  }, [message]);

  // props.closePostModal();
  // dispatch({type: CLEAR_POST_SONG});
  // setProfilePics('');
  const submitPost = () => {
    if (profilePics === '' && artistPost === '') {
      setEmptyErr('You have nothing to post');
    } else {
      dispatch(timeline_Post(artistPost, profilePics, profilePicType));
    }
  };

  const chooseSong = () => {
    setSongsModal(true);
  };

  const chooseProfilePics = val => {
    setProfilePics(val);
  };
  const setPicType = val => {
    setProfilePicType(val);
  };
  const profileImageRef = useRef(null);

  const openProfileImageBottomSheet = () => {
    dispatch({type: CLEAR_POST_SONG});
    profileImageRef.current.open();
  };
  const closeProfileImageBottomSheet = () => {
    profileImageRef.current.close();
  };
  let galleryView = null;
  let songView = null;
  if (profilePics || profilePics !== '') {
    galleryView = (
      <View style={styles.gallery}>
        <Image
          source={{uri: profilePics}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );
  }
  if (title || title !== '') {
    songView = (
      <View style={styles.songView}>
        <Image
          source={{uri: image}}
          style={{
            height: '100%',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            marginRight: 10,
            width: '30%',
          }}
        />
        <View>
          <Text numberOfLines={1} style={styles.songTitle}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {artist}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.listner}>
              <Icon
                name="headset"
                color="#fff"
                size={13}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Helvetica-Medium',
                  fontSize: 12,
                  textTransform: 'capitalize',
                }}>
                {/* {hitCount} */}
                {hitCount}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.like}>
              {likeCount} Likes
            </Text>
          </View>
        </View>
      </View>
    );
  }

  let mainStatusView = null;
  if (error) {
    mainStatusView = (
      <MainErrorModal
        clearError={() => dispatch({type: CLEAR_ERROR})}
        clearTime={3000}
        errorState={error}>
        {error}
      </MainErrorModal>
    );
  } else if (emptyErr) {
    mainStatusView = (
      <MainErrorModal
        clearError={() => setEmptyErr('')}
        clearTime={3000}
        errorState={emptyErr}>
        {emptyErr}
      </MainErrorModal>
    );
  } else if (message) {
    mainStatusView = (
      <MainSuccessModal
        clearSuccess={() => dispatch({type: CLEAR_ERROR})}
        clearTime={3000}
        successState={message}>
        {message}
      </MainSuccessModal>
    );
  }

  return (
    <Modal
      animationType="slide"
      swipeDirection="down"
      transparent={true}
      visible={props.visible}
      style={{
        flex: 1,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
      }}
      onRequestClose={() => props.closePostModal()}
      onSwipeComplete={() => props.closePostModal()}>
      <KeyboardAwareScrollView contentContainerStyle={{height: '100%'}}>
        <View style={styles.modalView}>
          <GeneralModal visible={songsModal} closeModal={closeSongsModal}>
            <SongPostView
              closeModal2={closeSongsModal}
              closeModal={closeSongsModal2}
            />
          </GeneralModal>
          {mainStatusView}
          <ImageBottomSheetPicker
            ref={profileImageRef}
            closeImagePicker={closeProfileImageBottomSheet}
            chooseImagePicture={val => chooseProfilePics(val)}
            choosePicType={val => setPicType(val)}
          />
          <TouchableOpacity
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
            activeOpacity={0.8}
            onPress={() => closeandClear()}
            style={styles.closeBtn}>
            <Icon name="close-circle-outline" size={30} color="#f68128" />
          </TouchableOpacity>
          <View
            style={[
              styles.inputCont,
              // profilePics || profilePics !== ''
              //   ? {height: '50%'}
              //   : {height: '35%'},
            ]}>
            {profileUrl === '' || profileUrl === null ? (
              <View style={styles.thumbNail}>
                <Text style={[styles.thumbNailName, {marginRight: 10}]}>
                  {firstName ? firstName[0] : null}
                </Text>
                <Text style={styles.thumbNailName}>
                  {lastName ? lastName[0] : null}
                </Text>
              </View>
            ) : (
              <Image style={styles.profileImage} source={{uri: profileUrl}} />
            )}
            <View style={styles.secondCont}>
              <TextInput
                multiline={true}
                placeholder="Share something with your fans"
                placeholderTextColor="#999"
                value={artistPost}
                onChangeText={val => setArtistPost(val)}
                style={{
                  color: '#eee',
                  // minHeight: 50,
                  fontFamily: 'Helvetica-Medium',
                }}
              />
              {galleryView}
              {songView}
              <View style={styles.postType} />
              {/* POST CHOICES VIEW */}
              <View style={styles.postChoice}>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.singleIcon}
                    onPress={() => openProfileImageBottomSheet()}>
                    <GalleryIcon color="#999" width={20} height={20} />
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => chooseSong()}
                    activeOpacity={0.8}
                    style={styles.singleIcon}>
                    <MusicIcon color="#999" width={20} height={20} />
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity activeOpacity={0.8} style={styles.singleIcon}>
                  <AlbumIcon color="#999" width={20} height={20} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.singleIcon}>
                  <ArtistIcon color="#999" width={20} height={20} />
                </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </View>
          {/* POST TYPE */}
          <View style={{width: '100%', alignItems: 'flex-end', marginTop: 30}}>
            {loading ? (
              <ActivityIndicator size="small" color="#f68128" />
            ) : (
              <LoginBtn
                title="Post"
                width="25%"
                height="40%"
                textSize={11}
                onPress={() => submitPost()}
              />
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default ArtistPostModal;

const styles = ScaledSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '100%',
    zIndex: 500,
    padding: 15,
  },
  inputCont: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    // backgroundColor: '#fff',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() - 10 : 0,
  },
  postChoice: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: '20@s',
  },
  singleIcon: {
    marginRight: 30,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  secondCont: {
    borderWidth: 0.5,
    borderColor: '#777',
    paddingLeft: 10,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingRight: 10,
  },
  gallery: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  songView: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.061)',
  },
  songTitle: {
    color: '#eee',
    fontFamily: 'Helvetica-Medium',
    fontSize: 16,
  },
  artist: {
    color: '#F68128',
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
  },
  like: {
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    marginTop: 5,
  },
  thumbNail: {
    width: '50@s',
    height: '50@s',
    borderRadius: 100 / 2,
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5@s',
  },
  thumbNailName: {
    fontSize: '15@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  profileImage: {
    width: '50@s',
    height: '50@s',
    borderRadius: '50@s',
    marginRight: '5@s',
  },
  listner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 5,
  },
});

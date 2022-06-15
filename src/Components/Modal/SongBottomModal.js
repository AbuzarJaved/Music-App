import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  openSongBottomSheetView,
  closeSongBottomSheetView,
  openListenElsewhereModal,
} from '../../redux/actions/songBottomSheetAction';
import {encode} from '../../utils/ShareSocals';
import Divider from '../Divider/Divider';
// ICONS
import Icon from 'react-native-vector-icons/Ionicons';
import Add_To_Playlist_Icon from '../../Components/Icons/AddToPlaylistIcon';
import LikeIcon from '../../Components/Icons/LikeIcon';
import ArtistIcon from '../../Components/Icons/ArtistIcon';
import ShareIcon from '../../Components/Icons/ShareIcon';
import DownloadIcon from '../../Components/Icons/DownloadIcon';
import GeneralBottomSheet from '../../Components/BottomSheet/GeneralBottomSheet';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import {open_Media_Comment_Modal} from '../../redux/actions/commentModal';
import {
  OPEN_MEDIA_PLAYLIST_MODAL,
  OPEN_MEDIA_PLAYLIST_MODAL_FORM,
} from '../../redux/constants';
import {
  store_Active_User_Details,
  openSingleUserModal,
} from '../../redux/actions/userActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {mainNumberFormat} from '../../utils/loggedInUserType';

// import {useNavigation} from '@react-navigation/native';

const SongBottomModal = props => {
  // console.log(props, 'HOMEPROPS');

  //  const navigation = useNavigation();
  // const bottomRef = useRef(null);
  const playerContext = usePlayerContext();

  const openSongBottomSheet = useSelector(state => state.openSongBottomSheet);
  const {
    isSongBottomSheetOpen,
    songDetails: {title: songTitle, artwork: songImage, artists, hitCount, id},
    artistDetails,
  } = openSongBottomSheet;
  const getUserProfile = useSelector(state => state.getUserProfile);
  const {
    userProfile: {username},
  } = getUserProfile;
  const openMediaCommentModal = useSelector(
    state => state.openMediaCommentModal,
  );
  const {isMediaCommentModalOpen, mediaCommentDetails} = openMediaCommentModal;
  const closeBottomSheet = () => {
    playerContext.bottomRef.current.close();
    dispatch(closeSongBottomSheetView());
  };

  // const navigateToArtistProfile = () => {
  //   if (artists === username) {
  //     closeBottomSheet();
  //     navigating.navigation.navigate('Profile');
  //   } else {
  //     closeBottomSheet();
  //     navigating.navigation.goBack();
  //   }
  // };
  const options = {
    message: 'Test message',
    // type: 'image/jpeg',
    // url: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
  };

  const commentFunction = () => {
    closeBottomSheet();
    dispatch(
      open_Media_Comment_Modal({
        title: songTitle,
        image: songImage,
        artists,
        hitCount,
        id,
      }),
    );
  };
  const addToPlaylistFunc = () => {
    closeBottomSheet();
    dispatch({type: OPEN_MEDIA_PLAYLIST_MODAL});
  };

  const listenElsewhere = () => {
    closeBottomSheet();
    dispatch(openListenElsewhereModal());
  };
  const goToArtist = () => {
    if (artists === username) {
      closeBottomSheet();
    } else {
      dispatch(store_Active_User_Details(artistDetails));
      closeBottomSheet();
      dispatch(openSingleUserModal());
    }
  };

  const shareFunc = () => {
    closeBottomSheet();
    encode(options);
  };

  const arr2 = [
    {
      icon: <ShareIcon color="#999" />,
      title: 'Share',
      onPress: () => shareFunc(),
    },
    {
      icon: <Icon name="headset" size={28} color="#999" />,
      title: 'Listen Elsewhere',
      onPress: () => listenElsewhere(),
    },
    {
      icon: <LikeIcon color="#999" />,
      title: 'Add to Favourites',
      onPress: () => closeBottomSheet(),
    },

    {
      icon: <Add_To_Playlist_Icon color="#999" />,
      title: 'Add to my playlist',
      onPress: () => addToPlaylistFunc(),
    },
    {
      icon: <ArtistIcon color="#999" />,
      title: 'Go to Artiste Profile',
      onPress: () => goToArtist(),
    },
    {
      icon: <Icon name="chatbubble" size={25} color="#999" />,
      title: 'Comment',
      onPress: () => commentFunction(),
    },
    {
      icon: <Add_To_Playlist_Icon color="#999" />,
      title: 'Play Next',
      onPress: () => closeBottomSheet(),
    },

    // {
    //   icon: <DownloadIcon color="#999" width={24} height={24} />,
    //   title: 'Download',
    // },
  ];

  // const openBottomSheet = () => {
  //   bottomRef.current.open();

  // };

  let artistNameView = null;
  if (artists === username) {
    artistNameView = <Text style={styles.artist}>{artists}</Text>;
  } else {
    artistNameView = (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goToArtist()}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.artist}>{artists}</Text>
        <Icon
          name="chevron-forward"
          color="#F68128"
          size={12}
          style={{marginTop: 5, marginLeft: 5}}
        />
      </TouchableOpacity>
    );
  }

  const dispatch = useDispatch();
  return (
    <GeneralBottomSheet ref={playerContext.bottomRef} height={500} radius={20}>
      <View
        style={{
          height: '100%',
          paddingHorizontal: 20,
          paddingTop: 0,
          position: 'relative',
          zIndex: 1000,
        }}>
        <View style={{marginTop: 10}}>
          <View style={styles.songDetailView}>
            <Image source={{uri: songImage}} style={styles.artistImage} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.songTitle}>{songTitle}</Text>
              {artistNameView}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="headset"
                  color="#999"
                  size={scale(11)}
                  style={{marginTop: 5}}
                />
                <Text style={styles.count}>{mainNumberFormat(hitCount)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider}>
            <Divider />
          </View>
          <FlatList
            data={arr2}
            keyExtractor={item => item.title}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 25,
                  alignItems: 'center',
                }}>
                {item.icon}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => item.onPress()}>
                  <Text
                    style={{
                      color: '#eee',
                      marginTop: 3,
                      marginLeft: 10,
                      fontFamily: 'Helvetica-Medium',
                      fontSize: scale(11),
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </GeneralBottomSheet>
  );
};

export default SongBottomModal;

const styles = ScaledSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '50%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bar: {
    width: 100,
    height: 8,
    backgroundColor: '#f68128',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
  closeModalIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  songDetailView: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 20,
  },
  artistImage: {
    width: '60@s',
    height: '60@s',
    borderRadius: 10,
  },
  songTitle: {
    color: '#fff',
    fontSize: '12@s',
    fontFamily: 'Helvetica-Bold',
  },
  artist: {
    color: '#F68128',
    fontSize: '9@s',
    marginTop: 2,
    fontFamily: 'Helvetica-Medium',
  },
  divider: {
    marginTop: 10,
    marginBottom: 20,
  },
  count: {
    color: '#999',
    fontSize: '9@s',
    marginTop: 5,
    marginLeft: 5,
    fontFamily: 'Helvetica-Medium',
  },
});

{
  /* <Modal
      animationType="slide"
      transparent={true}
      visible={isSongBottomSheetOpen}
      onRequestClose={() => dispatch(closeSongBottomSheetView())}>
      <View style={styles.modalView}>
        <View
          style={{
           
            height: '100%',
            paddingHorizontal: 20,
            paddingTop: 20,
            position: 'relative',
          }}>
          <TouchableOpacity
            onPress={() => dispatch(closeSongBottomSheetView())}
            hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}>
            <View style={styles.bar}></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(closeSongBottomSheetView())}
            style={styles.closeModalIcon}
            hitSlop={{top: 30, right: 30, left: 30, bottom: 30}}>
            <Icon name="close-circle-outline" size={36} color="#f68128" />
          </TouchableOpacity>
          <View style={{marginTop: 10}}>
            <FlatList
              data={arr2}
              keyExtractor={(item) => item.title}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  {item.icon}
                  <TouchableOpacity
                    onPress={() => dispatch(closeSongBottomSheetView())}>
                    <Text style={{color: '#eee', marginTop: 3, marginLeft: 10}}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </Modal> */
}

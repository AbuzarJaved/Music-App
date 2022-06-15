import React, {useEffect, useState, useRef, forwardRef} from 'react';

import SplashScreen from 'react-native-splash-screen';
import {
  PlayerContextProvider,
  usePlayerContext,
} from './src/PlayerContext/PlayerContext';
import {Provider} from 'react-redux';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {persistor, store} from './src/redux/store';

import TrackPlayer, {Capability} from 'react-native-track-player';
import {NavigationContainer} from '@react-navigation/native';

import {Container} from 'native-base';

import RootRoute from './src/routes/index';

import Login from './src/screens/Login/Login';
import AuthStacks from './src/routes/authRoute/index';
// import MusicPlayer from './src/Components/Modal/MusicPlayer';
import SongBottomModal from './src/Components/Modal/SongBottomModal';
import ModalOverlay from './src/Components/Modal/ModalOverlay';
import GoogleModal from './src/Components/Modal/GoogleSearchModal';
import {closeModalPlayer} from './src/redux/actions/musicPlayerActions';
import {
  Permission,
  PERMISSION_TYPE,
  requestLocation,
} from './src/utils/AppPermissions';
import MainErrorPopUp from './src/Components/Modal/MainErrorPopUp';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearData,
  get_Access_Token,
  get_User_Profile,
  logout,
  store_User_Location,
  store_User_Coordinates,
  get_User_Follower_List,
} from './src/redux/actions/userActions';
import {get_User_Liked_Album} from './src/redux/actions/MediaActions/AlbumActions/index';
import {get_Listener_Liked_Media} from './src/redux/actions/MediaActions/getMediaActions';
import NetInfo from '@react-native-community/netinfo';
import {get_Artist_Profile} from './src/redux/actions/artistActions';
import {getGenres} from './src/redux/actions/getGenreActions';
import Comment_Modal from './src/Components/Modal/Comment_Modal';
import Media_Comment_Modal from './src/Components/Modal/mediaCommentModal';
import MusicPlayers from './src/Components/MusicPlayer/MusicPlayer';
import CreatePlaylistModal from './src/Components/Modal/MediaPlaylistModal';
import MediaPlaylistModalForm from './src/Components/Modal/MediaPlaylistModalForm';
import {loadDataFromStorage} from './src/utils/asyncStorage';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import {
  CLEAR_LOGOUT_TOKEN_MESSAGE,
  CLOSE_COMMENT_MODAL,
  CLOSE_GOOGLE_SEARCH_MODAL,
  CLOSE_LISTEN_SONG_ELSEWHERE_MODAL,
  CLOSE_MEDIA_COMMENT_MODAL,
  CLOSE_MEDIA_PLAYLIST_MODAL,
  CLOSE_MEDIA_PLAYLIST_MODAL_FORM,
  CLOSE_SINGLE_ARTIST_MODAL,
  CLOSE_MUSIC_PLAYER,
  CLOSE_SINGLE_LISTENER_MODAL,
  CLOSE_SINGLE_USER_PROFILE_MODAL,
  CLOSE_NOTIFICATION_FILTER_MODAL,
  CLOSE_SONG_BOTTOM_SHEET,
  STORE_USER_LIKED_LIST,
  SHOW_NOT_ACTIVE_ACCOUNT_MODAL,
  HIDE_NOT_ACTIVE_ACCOUNT_MODAL,
  CLOSE_MODAL,
  STORE_USER_FOLLOWER_LIST,
  STORE_USER_LIKED_ALBUM,
} from './src/redux/constants/index';
import {getUserCallingCode} from './src/utils/loggedInUserType';
import MainMusicPlayer from './src/Components/Modal/MainMusicPlayer';
import ListenElsewhereModal from './src/Components/Modal/ListenElsewhereModal';
import NoConnectionModal from './src/Components/Modal/NoConnectionModal';
import SingleUserModal from './src/Components/Modal/SingleUserModal';
import NotActiveAccount from './src/Components/Modal/NotActiveAccount';

const App = () => {
  const dispatch = useDispatch();
  const [networkState, setNetworkState] = useState(false);

  const getUserProfile = useSelector(state => state.getUserProfile);
  const {userProfile, error} = getUserProfile;
  const userLogin = useSelector(state => state.userLogin);
  const getListenerLikedMedia = useSelector(
    state => state.getListenerLikedMedia,
  );
  const getUserFollowerList = useSelector(state => state.getUserFollowerList);
  const {
    loading: followerLoading,
    error: followerError,
    data: followerData,
  } = getUserFollowerList;
  const getUserLikedAlbums = useSelector(state => state.getUserLikedAlbums);
  const {error: albumError, data: albumData} = getUserLikedAlbums;

  const notActiveAccount = useSelector(state => state.notActiveAccount);
  const {showModal} = notActiveAccount;
  const {
    loading: listenerLoading,
    error: listenerError,
    data: listenerData,
  } = getListenerLikedMedia;
  const {
    loading: loginLoading,
    error: loginError,
    type: userType,
    token: loginToken,
  } = userLogin;
  const logoutUserWhenTokenExpires = useSelector(
    state => state.logoutUserWhenTokenExpires,
  );
  const {message} = logoutUserWhenTokenExpires;

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(200);

  useEffect(() => {
    const removeListener = NetInfo.addEventListener(networkState => {
      console.log(networkState.isConnected, networkState);
      if (networkState.isConnected) {
        setNetworkState(false);
      } else {
        setNetworkState(true);
      }
    });
    return () => {
      removeListener();
    };
  }, []);

  // BOTTOM SHEET CONTENT
  const playerContext = usePlayerContext();
  // BOTTOM SHEET CONTENT
  const renderContent = () => <BottomSheets onPress={Bs} />;
  // SplashScreen
  useEffect(() => {
    SplashScreen.hide();
    // if (accessTokenLoading === false) {

    // }
  }, []);
  //GETTING USERS PROFILE
  useEffect(() => {
    const getUserProfile = async () => {
      const userProfile = await loadDataFromStorage('user_Info');
      if (userProfile === null || !userProfile) {
        dispatch(get_User_Profile());
      }
      // console.log('USER INFO ON LOAD', userProfile);
    };
    getUserProfile();
    // if (userProfile && userProfile === {}) {
    if (listenerError || listenerData.length <= 0)
      dispatch(get_Listener_Liked_Media(page, size));
    // }
    if (followerError || followerData.length <= 0) {
      dispatch(get_User_Follower_List());
    }
    if (albumError || albumData.length <= 0) {
      dispatch(get_User_Liked_Album());
    }
  }, [loginToken]);

  useEffect(() => {
    // if (!listenerData && !listenerError && listenerData.length > 0) {
    const newMediaIds = listenerData?.map(item => item?.id);
    dispatch({
      type: STORE_USER_LIKED_LIST,
      payload: newMediaIds,
    });
    // }
  }, [listenerData]);
  useEffect(() => {
    const newFollowerIds = followerData?.map(item => item.id);
    dispatch({
      type: STORE_USER_FOLLOWER_LIST,
      payload: newFollowerIds,
    });
  }, [followerData]);

  useEffect(() => {
    const newAlbumsId = albumData?.map(item => item.id);
    dispatch({
      type: STORE_USER_LIKED_ALBUM,
      payload: newAlbumsId,
    });
  }, [albumData]);
  // GOOGLE AUTH
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '903231873189-9vikdp8ttgm1juieffcphn0nc09f29pp.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
      iosClientId:
        '677790329476-9150e6pnlhs4l6h3nea7kal9maik1m1q.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    dispatch({type: CLOSE_COMMENT_MODAL});
    dispatch({type: CLOSE_GOOGLE_SEARCH_MODAL});
    dispatch({type: CLOSE_LISTEN_SONG_ELSEWHERE_MODAL});
    dispatch({type: CLOSE_MEDIA_COMMENT_MODAL});
    dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL});
    dispatch({type: CLOSE_MEDIA_PLAYLIST_MODAL_FORM});
    dispatch({type: CLOSE_SINGLE_ARTIST_MODAL});
    dispatch({type: CLOSE_MUSIC_PLAYER});
    dispatch({type: CLOSE_SINGLE_LISTENER_MODAL});
    dispatch({type: CLOSE_SINGLE_USER_PROFILE_MODAL});
    dispatch({type: CLOSE_NOTIFICATION_FILTER_MODAL});
    dispatch({type: CLOSE_SONG_BOTTOM_SHEET});
  }, []);

  //GET user location
  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log('USER REAL POSITION', position);
        if (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const userPosition = {
            lat,
            lng,
          };
          dispatch(store_User_Coordinates(userPosition));
          Geocoder.geocodePosition(userPosition)
            .then(res => {
              // console.log('USER REAL LOCATION', res[0]);
              const callingCode = getUserCallingCode(res[0].countryCode);
              const data = {
                city: res[0].subAdminArea,
                state: res[0].adminArea,
                country: res[0].country,
                countryCode: res[0].countryCode,
                callingCode,
              };
              dispatch(store_User_Location(data));
            })
            .catch(err => console.log(err));
        }
      },
      error => {
        console.log(error.code, error.message, 'ERROR');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    if (RESULTS.GRANTED) getUserLocation();
  }, []);

  // PERMISSION
  useEffect(() => {
    requestLocation();
  }, []);
  useEffect(() => {
    dispatch(closeModalPlayer());
  }, []);
  // TrackPlayer
  useEffect(() => {
    TrackPlayer.setupPlayer()
      .then(() => {
        // console.log('Player Ready');

        TrackPlayer.updateOptions({
          stopWithApp: false,
          capabilities: [
            Capability.Pause,
            Capability.Play,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
          compactCapabilities: [
            Capability.Pause,
            Capability.Play,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
        playerContext.setPlayerStateReady();
      })
      .catch(err => {
        console.log('errrrr', err);
      });
  });

  return (
    <>
      <PlayerContextProvider>
        <RootRoute />
        {/* <MusicPlayer /> */}
        <SongBottomModal />
        <MainMusicPlayer />
        <ModalOverlay />
        <GoogleModal />
        <Comment_Modal />
        <NoConnectionModal
          visible={networkState}
          closeNetworkModal={() => setNetworkState(false)}
        />
        <SingleUserModal />
        <Media_Comment_Modal />
        <CreatePlaylistModal />
        <MediaPlaylistModalForm />
        <ListenElsewhereModal />
        <MainErrorPopUp
          clearTime={5000}
          errorState={message}
          clearError={() => dispatch({type: CLEAR_LOGOUT_TOKEN_MESSAGE})}>
          {message}
        </MainErrorPopUp>
        <NotActiveAccount
          visible={showModal}
          closeModal={() => dispatch({type: HIDE_NOT_ACTIVE_ACCOUNT_MODAL})}
        />
      </PlayerContextProvider>
    </>
  );
};

export default App;

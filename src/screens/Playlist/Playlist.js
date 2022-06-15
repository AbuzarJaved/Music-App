import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader/CommonHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import PlaylistContainer from './component/PlaylistContainer';
import data from '../../data2';
import MyPlaylistContainer from './component/MyPlaylistContainer';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DeleteIcon from '../../Components/Icons/DeleteIcon';
import EditIcon from '../../Components/Icons/EditIcon';
import {
  get_All_Playlists,
  get_All_User_Playlist,
  store_Active_Playlist_Details,
} from '../../redux/actions/MediaActions/PlayListActions/index';
import {CLEAR_PLAYLIST_ERROR} from '../../redux/constants';
import ErrorScreen from '../../Components/ErrorScreen/ErrorScreen';

const {width, height} = Dimensions.get('window');

const PlaylistScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const getAllUserPlaylist = useSelector((state) => state.getAllUserPlaylist);
  const getAllPlaylist = useSelector((state) => state.getAllPlaylist);
  const {
    data: playlistData,
    error: myPlaylistError,
    loading: myPlaylistLoading,
  } = getAllUserPlaylist;
  const {
    loading: playlistLoading,
    error: playlistError,
    data: allPlaylistData,
  } = getAllPlaylist;
  
  
  const playlistNavigate = (val) => {
    dispatch(store_Active_Playlist_Details(val));
    navigation.navigate('SinglePlayList');
  };

  const dataList2 = playlistData.map((data, index) => (
    <MyPlaylistContainer {...data} key={data.id} />
  ));
  const func = () => {
    navigation.navigate('Library');
  };
  useEffect(() => {
    dispatch(get_All_Playlists(page, size, true));
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(get_All_Playlists(page, size,true));
  //   }, []),
  // );

  const getPlaylistDataAgain = () => {
    dispatch(get_All_Playlists(page, size, true));
  };

  let popularPlaylistView = null;
  let myPlaylistView = null;
  if (playlistLoading) {
    popularPlaylistView = (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <ActivityIndicator
          style={{
            alignSelf: 'center',
            textAlign: 'center',
          }}
          size={40}
          color="#f68128"
        />
      </View>
    );
  } else if (playlistError) {
    popularPlaylistView = (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{width: '100%'}}
        onPress={() => getPlaylistDataAgain()}>
        <Text
          style={{
            color: '#999',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {playlistError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: 5,
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  } else {
    popularPlaylistView = allPlaylistData.map((data, index) => (
      <PlaylistContainer
        {...data}
        key={index}
        onPress={() => playlistNavigate(data)}
      />
    ));
  }
  if (myPlaylistLoading) {
    myPlaylistView = (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <ActivityIndicator
          style={{
            alignSelf: 'center',
            textAlign: 'center',
          }}
          size={40}
          color="#f68128"
        />
      </View>
    );
  } else if (myPlaylistError) {
    myPlaylistView = (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{width: '100%'}}
        onPress={() => dispatch(get_All_User_Playlist(page, size))}>
        <Text
          style={{
            color: '#999',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {myPlaylistError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: 5,
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  } else {
    myPlaylistView = playlistData.map((data, index) => (
      <MyPlaylistContainer
        {...data}
        key={data.id}
        onPress={() => playlistNavigate(data)}
      />
    ));
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <CustomHeader title="Playlists" func={func} />
          {/* ModalView */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setModal(false)}>
            <View style={styles.modalView}>
              <View style={styles.modalContentView}>
                {/* MODAL BAR */}
                <TouchableOpacity onPress={() => setModal(false)}>
                  <View style={styles.bar} />
                </TouchableOpacity>
                {/* OPTIONS */}
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => null}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <EditIcon color="#999" width={24} height={24} />
                  <Text
                    style={{
                      color: '#eee',
                      padding: 10,
                      fontSize: 15,
                      marginLeft: 5,
                    }}>
                    Edit Playlist
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => null}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <DeleteIcon color="#999" width={24} height={24} />
                  <Text
                    style={{
                      color: '#eee',
                      padding: 10,
                      fontSize: 15,
                      marginLeft: 5,
                    }}>
                    Delete Playlist
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={{
                width,
                paddingHorizontal: 20,
                marginTop: 20,

                paddingBottom: 40,
              }}>
              <Text style={styles.headerText}>Popular Playlist</Text>
              <TouchableOpacity activeOpacity={0.6} style={styles.viewAll}>
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="chevron-forward" size={18} color="#999" />
              </TouchableOpacity>
              {/* ScrollView */}
              <View style={styles.carouselView}>
                <ScrollView
                  horizontal={true}
                  scrollEventThrottle={16}
                  showsHorizontalScrollIndicator={false}>
                  {popularPlaylistView}
                  {/* {playlistErrorView}
                  {dataList} */}
                </ScrollView>
              </View>
              {/* My Playlist View */}
              <View style={styles.myPlaylist}>
                <Text style={styles.headerText}>My Playlists</Text>
                {/* Add buttonPlaylist */}
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.addBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('CreatePlaylistForm')}>
                    <Icon
                      name="md-add"
                      color="#eee"
                      size={36}
                      style={{paddingLeft: 2}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: '#999',
                      fontSize: 18,
                      fontFamily: 'Helvetica-Medium',
                      marginLeft: 20,
                    }}>
                    New Playlist
                  </Text>
                </View>
                {/* My playlists */}

                <View style={{marginTop: 30}}>
                  {/* {playlistLoadingView} */}
                  {/* {dataList2} */}
                  {myPlaylistView}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    // marginTop: 10,
    width,
    flex: 1,
    // height,
    // paddingHorizontal: 20,
  },
  headerText: {
    color: '#f68128',
    // marginVertical: 5,
    fontSize: 15,
    fontFamily: 'Helvetica-ExtraBold',
  },
  viewAll: {
    width: '100%',

    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewAllText: {
    color: '#999',
    fontSize: 10,
    fontFamily: 'Helvetica-Medium',
    // position: 'absolute',
    right: 0,
    marginRight: 5,
  },
  carouselView: {
    width: '100%',
    marginTop: 20,
    // flex: 1,
  },
  myPlaylist: {
    width: '100%',
    marginTop: 10,
    flex: 1,
  },
  addBtn: {
    backgroundColor: '#f68128',

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60 / 2,
    width: 60,
    height: 60,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '20%',
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
  modalContentView: {
    width: '100%',
    height: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

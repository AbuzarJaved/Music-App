import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader/CommonHeader';
import SingleArtist from './component/SingleArtist';
import NotificationsHeader from '../Notifications/component/NotificationsHeader';
import SingleFilterView from './component/SingleFilterView';
import ArtistContainer from '../../Components/LibrarySongs/components/ArtistComponent';
import {alphaBets} from '../../data5';
import {useDispatch, useSelector} from 'react-redux';
import {get_All_Artist} from '../../redux/actions/artistActions';
import {get_User_Follower_List} from '../../redux/actions/userActions';
import LoadingAnime from '../../Components/Loading/Loading';
import ErrorScreen from '../../Components/ErrorScreen/ErrorScreen';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const data = [];

const ArtistScreen = () => {
  const dispatch = useDispatch();
  const getAllArtists = useSelector(state => state.getAllArtists);
  const {artists, error, loading, totalElements, totalPages} = getAllArtists;
  const getUserFollowerList = useSelector(state => state.getUserFollowerList);
  const {
    loading: followLoading,
    error: followError,
    data: followData,
  } = getUserFollowerList;

  // Modal
  const [filter, setFilter] = useState(false);
  const [filterValue, setFilterValue] = useState('All');
  const [filteredData, setFilteredData] = useState(artists);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(200);

  const showFilter = () => {
    setFilter(!filter);
  };
  const fiterArtistData = val => {
    if (val !== 'All' && val !== '') {
      const filtered = followData
        .filter(item => item.accountUserType === 'ARTIST')
        .filter(item =>
          item.username?.toLowerCase().startsWith(val.toLowerCase()),
        );
      return filtered;
    } else {
      return followData;
    }
  };

  const setDefaultData = () => {
    setFilterValue('All');
    // setFilteredData(artists)
  };
  const chooseFilterValue = val => {
    setFilterValue(val);
    fiterArtistData(val);
  };

  const getArtists = () => {
    dispatch(get_User_Follower_List(page, size));
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(get_User_Follower_List(page, size));
    }, []),
  );

  // const loadMoreData = () => {
  //   console.log('hello');
  //   if (page <= totalPages - 1) {
  //     setPage(page + 1);
  //     dispatch(get_User_Follower_List(page, size));
  //     setFilteredData(prevData => prevData.concat(artists));
  //     if (filteredData !== artists) {
  //       setFilteredData(filteredData.concat(artists));
  //     }
  //   }
  //   console.log(page, 'PAGEr');
  //   setFilteredData(filteredData.concat(artists));
  // };
  // const renderLoader = () => {
  //   return (
  //     <View style={styles.loader}>
  //       <ActivityIndicator color="#F68128" size="large" />
  //     </View>
  //   );
  // };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* <CustomHeader title="Artists" /> */}
          <CustomHeader title="Favourite Artists" />
          {/* ModalView */}

          {/* <ScrollView
          contentContainerStyle={{width}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}> */}
          {followLoading && <LoadingAnime width={70} height={70} />}
          {error && (
            <ErrorScreen errorTitle={error} onPress={() => getArtists()} />
          )}
          <View style={styles.content}>
            <View style={styles.filterStyle}>
              <SingleFilterView
                title="All"
                value={filterValue}
                onPress={() => setDefaultData()}
              />
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 10,
                }}
                data={alphaBets}
                horizontal={true}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                  <>
                    <SingleFilterView
                      {...item}
                      value={filterValue}
                      onPress={() => chooseFilterValue(item.title)}
                    />
                  </>
                )}
              />
            </View>

            <View style={{flex: 1}}>
              {/* {filteredData.length === 0 && (
              <Text
                style={{
                  color: '#f68128',
                  textAlign: 'center',
                  fontSize: 15,
                  marginTop: '20%',
                }}>
                You don't have any favorites artist yet. Start Liking
              </Text>
            )} */}

              <FlatList
                contentContainerStyle={{
                  marginTop: 20,
                  paddingHorizontal: 15,
                  paddingBottom: 10,
                }}
                data={fiterArtistData(filterValue)}
                // data={fiterArtistData(filterValue)}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({item}) => (
                  <ArtistContainer {...item} user={item} />
                )}
                // onEndReached={loadMoreData}
                // onEndReachedThreshold={0.1}
                // ListFooterComponent={renderLoader}
              />
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ArtistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    width,
    flex: 1,
    // marginTop: 80,
    // paddingTop: 10,
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
    padding: 10,
  },
  filterStyle: {
    paddingLeft: 25,
    // height: 50,
    paddingTop: 15,
    flexDirection: 'row',
  },
  loader: {
    marginTop: 20,
    alignItems: 'center',
  },
});

//  <Modal
//    animationType="slide"
//    transparent={true}
//    visible={modal}
//    onRequestClose={() => setModal(false)}>
//    <View style={styles.modalView}>
//      <View style={styles.modalContentView}>
//        <TouchableOpacity onPress={() => setModal(false)}>
//          <View style={styles.bar}></View>
//        </TouchableOpacity>

//        <Text
//          style={{
//            marginVertical: 10,
//            color: '#eee',
//            fontSize: 15,
//            paddingLeft: 20,
//          }}>
//          Do you really want to delete this artist
//        </Text>
//        <View
//          style={{
//            flexDirection: 'row',
//            justifyContent: 'space-around',
//            marginTop: 10,
//          }}>
//          <TouchableOpacity
//            activeOpacity={0.6}
//            hitSlop={{top: 50, left: 50, right: 50, bottom: 50}}
//            onPress={() => deleteArtist(id)}>
//            <Text style={{color: '#eee', padding: 10, fontSize: 15}}>Yes</Text>
//          </TouchableOpacity>
//          <TouchableOpacity
//            activeOpacity={0.6}
//            hitSlop={{top: 50, left: 50, right: 50, bottom: 50}}
//            onPress={() => notDeleteArtist()}>
//            <Text style={{color: '#eee', padding: 10, fontSize: 15}}>No</Text>
//          </TouchableOpacity>
//        </View>
//      </View>
//    </View>
//  </Modal>;

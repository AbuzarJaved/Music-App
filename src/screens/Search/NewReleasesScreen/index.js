import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CommonHeader from '../../../Components/CustomHeader/CommonHeader';
import {useSelector, useDispatch} from 'react-redux';
import {get_New_Releases} from '../../../redux/actions/MediaActions/SearchActions/index';
import {play_Media} from '../../../redux/actions/MediaActions/getMediaActions';
import {store_User_Location} from '../../../redux/actions/userActions';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {alphaBets} from '../../../data5';
import CustomAlphaBtn from '../../../Components/Button/CustomAlphabetFilterView';
import LoadingAnime from '../../../Components/Loading/Loading';
import MediaSong from '../../../Components/LibrarySongs/MediaSongs';
import Divider from '../../../Components/Divider/Divider';
import LoginBtn from '../../../Components/Button/LoginBtn';
import {usePlayerContext} from '../../../PlayerContext/PlayerContext';
import {openModalPlayer} from '../../../redux/actions/musicPlayerActions';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const index = () => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState('All');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);

  const getNewReleases = useSelector(state => state.getNewReleases);
  const {loading, error, data: mediaData} = getNewReleases;
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;
  useFocusEffect(
    useCallback(() => {
      dispatch(get_New_Releases(page, size));
    }, []),
  );

  const {playMusic} = usePlayerContext();

  const allSongs = {
    currentTrack: mediaData[0],
    mediaSongs: mediaData,
  };

  const playSongs = () => {
    dispatch(play_Media(city, state, country, mediaData[0]?.id));
    playMusic([...mediaData]);
    dispatch(openModalPlayer(allSongs));
  };

  const fiterArtistData = val => {
    if (val !== 'All' && val !== '') {
      const filtered = mediaData.filter(item =>
        item.title?.toLowerCase().startsWith(val.toLowerCase()),
      );
      return filtered;
    } else {
      return mediaData;
    }
  };

  const chooseFilterVal = val => {
    setFilterValue(val);
  };
  let mainView = null;
  if (error) {
    mainView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_New_Releases(page, size))}>
        <Text
          style={{
            color: '#999',
            fontSize: scale(15),
            textAlign: 'center',
            marginTop: 40,
          }}>
          {error}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: scale(15),
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  } else {
    mainView = (
      <FlatList
        data={fiterArtistData(filterValue)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingBottom: 10,
          // height: '100%',
          paddingHorizontal: 10,
          //   flex: 1,
        }}
        renderItem={({item, index}) => (
          <MediaSong
            {...item}
            allSongs={mediaData}
            key={index}
            showLikeBtn={true}
            indexes
            index={index}
          />
        )}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CommonHeader title="New Realeases" />
        {loading && <LoadingAnime width={60} height={60} />}
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <CustomAlphaBtn
              title="All"
              value={filterValue}
              onPress={() => setFilterValue('All')}
            />
            <FlatList
              contentContainerStyle={{
                paddingVertical: 20,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={alphaBets}
              keyExtractor={item => item.title}
              renderItem={({item, index}) => (
                <CustomAlphaBtn
                  {...item}
                  value={filterValue}
                  onPress={() => chooseFilterVal(item.title)}
                />
              )}
            />
          </View>
          {/* <Divider  mb={10} bc="#555" /> */}
          <View
            style={{
              width: '40%',
              //   marginBottom: 10,
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <LoginBtn
              title="Play All"
              icon="play"
              height={35}
              onPress={() => playSongs()}
            />
          </View>
          <Divider mt={10} bc="#555" />

          {mainView}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#000',
  },
  content: {
    width: '100%',
    // height: '100%',
    // flex: 1,
  },
});

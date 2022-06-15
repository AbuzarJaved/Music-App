import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader/CommonHeader';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import SongContainer from '../../../Components/LibrarySongs/GeneralSong';
import data from '../../../data';
import {useSelector, useDispatch} from 'react-redux';
import MediaSong from '../../../Components/LibrarySongs/MediaSongs';
import {
  get_User_Media_Listening_History,
  get_Artist_Media,
  get_Media,
} from '../../../redux/actions/MediaActions/getMediaActions';
import {alphaBets} from '../../../data5';
import {usePlayerContext} from '../../../PlayerContext/PlayerContext';
import {openModalPlayer} from '../../../redux/actions/musicPlayerActions';
import Divider from '../../../Components/Divider/Divider';
import LoginBtn from '../../../Components/Button/LoginBtn';
import CustomAlphaBtn from '../../../Components/Button/CustomAlphabetFilterView';
import {play_Media} from '../../../redux/actions/MediaActions/getMediaActions';
import LoadingAnime from '../../../Components/Loading/Loading';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

const ArtistFavoriteScreen = () => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState('All');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const getMedia = useSelector(state => state.getMedia);
  const {loading, error, data: artistMedias} = getMedia;
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;
  const {playMusic} = usePlayerContext();

  const allSongs = {
    currentTrack: artistMedias[0],
    mediaSongs: artistMedias,
  };
  const chooseFilterVal = val => {
    setFilterValue(val);
  };
  const playSongs = () => {
    dispatch(play_Media(city, state, country, artistMedias[0]?.id));
    playMusic([...artistMedias]);
    dispatch(openModalPlayer(allSongs));
  };
  const fiterArtistData = val => {
    if (val !== 'All' && val !== '') {
      const filtered = artistMedias.filter(item =>
        item.title?.toLowerCase().startsWith(val.toLowerCase()),
      );
      return filtered;
    } else {
      return artistMedias;
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(get_Media(page, size));
    }, []),
  );

  let mainView = null;
  if (error) {
    mainView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_Media(page, size))}>
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
            marginTop: scale(20),
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
            allSongs={artistMedias}
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <View style={styles.container}>
          <CustomHeader title={`Songs (${artistMedias.length})`} />
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
            {/* FLATLIST */}
            {mainView}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ArtistFavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    // paddingTop: 80,
  },
  content: {
    // marginTop: 100,
    width,
    flex: 1,
    height,
    // paddingHorizontal: 25,
  },
});

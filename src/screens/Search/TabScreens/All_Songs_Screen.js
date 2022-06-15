import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SongDetail from './Component/SongDetail';
import data from '../../../data';
import {usePlayerContext} from '../../../PlayerContext/PlayerContext';
import PlayListContainer from '../../Playlist/component/PlaylistContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import data3 from '../../../data3';
import {useSelector, useDispatch} from 'react-redux';
import {get_Media} from '../../../redux/actions/MediaActions/getMediaActions';
import NetworkError from '../../NetworkErrorScreen.js/NetworkError';
import LoadingAnime from '../../../Components/Loading/Loading';
import MediaSong from '../../../Components/LibrarySongs/MediaSongs';

const {width, height} = Dimensions.get('window');
const All_Songs_Screen = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const getMedia = useSelector((state) => state.getMedia);
  const {error: mediaError, loading: mediaLoading, data: mediaData} = getMedia;
  const {isEmpty, currentMusicTrack} = usePlayerContext();
  const artists = mediaData.map((item, index) => item.artist);

  const trendingView = mediaData?.map((song, index) => (
    <MediaSong
      // data={song}
      {...artists}
      {...song}
      allSongs={mediaData}
      key={index}
      showLikeBtn={true}
    />
  ));
  // console.log({...artists}, 'Artists');

  let mediaLoadingView = null;
  let networkView = null;
  if (mediaLoading) {
    mediaLoadingView = <LoadingAnime width={70} height={70} />;
  }
  if (mediaError) {
    networkView = <NetworkError errorTitle={mediaError} onPress={getMedias} />;
  }

  return (
    <View
      style={[
        {backgroundColor: '#000', width, height, flex: 1},
        isEmpty || !currentMusicTrack
          ? {paddingBottom: 60}
          : {paddingBottom: 120},
      ]}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 20,
          width: '100%',
          paddingLeft: 20,
        }}>
        {trendingView}
      </ScrollView>

      {/* <FlatList
        data={mediaData}
        
        contentContainerStyle={{padding: 20}}
        keyExtractor={(item) => item.mediaIdentity}
        renderItem={({song}) => (
          <MediaSong {...artists} {...song} showLikeBtn={true} />
        )}
      /> */}
    </View>
  );
};

export default All_Songs_Screen;

const styles = StyleSheet.create({
  viewAll: {
    width: '100%',

    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sectionCont: {
    marginVertical: 5,
    width,
    paddingHorizontal: 25,
  },
  headerText: {
    color: '#ddd',
    fontSize: 15,
    paddingVertical: 5,
    fontFamily: 'Gilroy-ExtraBold',
  },
  viewAllText: {
    color: '#999',
    fontSize: 10,
    fontFamily: 'Gilroy-Bold',

    right: 0,
    marginRight: 5,
  },
  carouselView: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FeaturedSong from '../component/FeaturedSong';
import {shortData, media, supporters} from '../../../../data5';
import GeneralSongs from '../../../../Components/LibrarySongs/GeneralSong';
import MediaContainer from '../component/MediaContainer';
import SupportersCont from '../component/SupportersCont';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getLoggedInUserProfile} from '../../../../utils/loggedInUserType';
import MediaSong from '../../../../Components/LibrarySongs/MediaSongs';
import AlbumContainer from '../../../../Components/LibrarySongs/components/AlbumComponent';
import {
  get_Artist_Trending,
  get_Media,
} from '../../../../redux/actions/MediaActions/getMediaActions';
import {
  get_All_User_Album,
  store_Active_Album_Details,
} from '../../../../redux/actions/MediaActions/AlbumActions/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const ProfileOverView = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const navigation = useNavigation();

  const getMedia = useSelector(state => state.getMedia);
  const {loading, error, data: trendingData} = getMedia;

  const getAllUserAlbum = useSelector(state => state.getAllUserAlbum);
  const {
    data: albumData,
    loading: albumLoading,
    error: albumError,
  } = getAllUserAlbum;

  const getData = () => {
    dispatch(get_Media(page, size));
    dispatch(get_All_User_Album(page, size));
  };

  const albumNavigate = val => {
    dispatch(store_Active_Album_Details(val));
    navigation.navigate('SingleAlbum');
  };

  const artistSongsView = trendingData
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 5)
    .map((song, index) => (
      <MediaSong
        // data={song}
        // {...artists}
        {...song}
        allSongs={trendingData}
        key={index}
        showLikeBtn={true}
        indexes
        index={index}
      />
    ));
  const popularSongs = shortData.map((item, index) => (
    <GeneralSongs key={index} {...item} />
  ));
  const mediaView = media.map((item, index) => (
    <MediaContainer key={index} {...item} />
  ));
  const supportersView = supporters.map((item, index) => (
    <SupportersCont key={index} {...item} />
  ));

  let artistTtrendingView = null;
  let artistAlbumView = null;
  let mainStatusView = null;

  if (trendingData.length <= 0 && !loading && !error) {
    artistTtrendingView = (
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '800',
            fontFamily: 'Helvetica-ExtraBold',
            fontSize: scale(13),
            marginTop: 30,
            textAlign: 'center',
          }}>
          You don't have any trending song yet.
        </Text>
      </View>
    );
  } else if (trendingData.length >= 0 && !loading && !error) {
    artistTtrendingView = trendingData
      .sort((a, b) => b.hits - a.hits)
      .slice(0, 5)
      .map((song, index) => (
        <MediaSong
          // data={song}
          // {...artists}
          {...song}
          allSongs={trendingData}
          key={index}
          showLikeBtn={true}
          indexes
          index={index}
        />
      ));
  }
  if (albumData.length <= 0 && !albumLoading && !albumError) {
    artistAlbumView = (
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '800',
            fontFamily: 'Helvetica-ExtraBold',
            fontSize: scale(13),
            marginTop: 30,
            textAlign: 'center',
          }}>
          You don't have any album yet.
        </Text>
      </View>
    );
  } else if (albumData.length >= 0 && !albumLoading ) {
    artistAlbumView = albumData
      ?.slice(0, 5)
      .map((data, index) => (
        <AlbumContainer
          {...data}
          key={index}
          onPress={() => albumNavigate(data)}
        />
      ));
  }
  if (loading || albumLoading) {
    mainStatusView = (
      <View style={{alignSelf: 'center', marginTop: 20}}>
        <ActivityIndicator size={30} color="#F68128" />
      </View>
    );
  } else if (error || albumError) {
    mainStatusView = (
      <TouchableOpacity activeOpacity={0.7} onPress={() => getData()}>
        <Text
          style={{
            color: '#999',
            fontSize: scale(13),
            textAlign: 'center',
            marginTop: 10,
          }}>
          {error || albumError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: scale(11),
            textAlign: 'center',
            marginTop: hp('1.7%'),
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        {/* Popular Section */}
        <Text style={[styles.sectionHeader, {marginTop: 20}]}>
          Top (5) Streamed Songs
        </Text>
        <View>
          {mainStatusView}
          {artistTtrendingView}
        </View>
        <Text style={[styles.sectionHeader, {marginTop: 20}]}>
          Top (5) Albums
        </Text>
        <View>
          {mainStatusView}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            bounces={false}>
            {artistAlbumView}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ProfileOverView;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: 10,
  },
  sectionHeader: {
    fontSize: '12@s',
    fontFamily: 'Helvetica-Bold',
    color: '#eee',
    marginBottom: 20,
  },
  sectionContainer: {
    width: '100%',
  },
});

{
  /* Media Section */
}
{
  /* <Text style={[styles.sectionHeader, {marginTop: 20}]}>Media</Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          bounces={false}>
          {mediaView}
        </ScrollView> */
}
{
  /* Top Contributors  */
}
{
  /* <Text style={[styles.sectionHeader, {marginTop: 20}]}>
          Top Supporters
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}>
          {supportersView}
        </ScrollView> */
}

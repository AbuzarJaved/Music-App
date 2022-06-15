import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CarouselItem from '../../Components/Carousel/CarouselItem';
import WhatsHotSongs from '../../Components/LibrarySongs/WhatsHotSongs';
import GeneralSongs from '../../Components/LibrarySongs/GeneralSong';
import datas from '../../data';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import {useSelector, useDispatch} from 'react-redux';
import MediaSong from '../../Components/LibrarySongs/MediaSongs';
import {
  get_Media,
  get_Trending_Media,
} from '../../redux/actions/MediaActions/getMediaActions';
import {get_New_Releases} from '../../redux/actions/MediaActions/SearchActions/index';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import LoadingAnime from '../../Components/Loading/Loading';
import MediaSongs from '../../Components/LibrarySongs/MediaSongs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const HomeContent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(30);
  const getNewReleases = useSelector(state => state.getNewReleases);
  const {
    data: mediaData,
    error: newReleaseError,
    loading: newReleasesLoading,
  } = getNewReleases;
  const getTrendingMedia = useSelector(state => state.getTrendingMedia);
  const {
    data: trendingData,
    error: trendingDataError,
    loading: trendingDataLoading,
  } = getTrendingMedia;
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;

  // const newMedia = [
  //   ...mediaData?.forEach(function (obj) {
  //     obj.artist = obj.ownerAccountUser.username;

  //     Object.preventExtensions(obj);
  //   }),
  // ];

  // ARTIST FROM LOADED SONGS
  const artists = mediaData.map((item, index) => item.ownerAccountUser);

  const carouselView = mediaData
    .slice(0, 10)
    .map((song, index) => (
      <CarouselItem allSongs={mediaData} {...song} key={index} />
    ));

  const trendingView = trendingData
    .slice(0, 10)
    .sort((a, b) => b.likes - a.likes)
    .map((song, index) => (
      <MediaSong
        // data={song}
        {...artists}
        {...song}
        allSongs={mediaData}
        key={index}
        showLikeBtn={true}
        indexes
        index={index}
      />
    ));

  let mainTrendingView = null;
  let mainReleasesView = null;

  if (mediaData.length <= 0 && !newReleaseError && !newReleasesLoading) {
    mainReleasesView = (
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '800',
            fontFamily: 'Helvetica-ExtraBold',
            fontSize: scale(12),
            marginTop: 30,
            textAlign: 'center',
          }}>
          No new releases yet.
        </Text>
      </View>
    );
  } else if (newReleaseError) {
    mainReleasesView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_New_Releases(page, size))}>
        <Text
          style={{
            color: '#999',
            fontSize: hp('2%'),
            textAlign: 'center',
            marginTop: 10,
          }}>
          {newReleaseError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: hp('1.7%'),
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  } else {
    mainReleasesView = mediaData
      .slice(0, 10)
      .map((song, index) => (
        <CarouselItem
          allSongs={mediaData}
          {...song}
          key={index}
          index={index}
        />
      ));
  }

  if (trendingData <= 0 && !trendingDataError && !trendingDataLoading) {
    mainTrendingView = (
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '800',
            fontFamily: 'Helvetica-ExtraBold',
            fontSize: scale(12),
            marginTop: 30,
            textAlign: 'center',
          }}>
          No trending data in your location.
        </Text>
      </View>
    );
  } else if (trendingDataLoading) {
    mainTrendingView = <ActivityIndicator color="#f68128" size="small" />;
  } else if (trendingDataError) {
    mainTrendingView = (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{paddingBottom: 30}}
        onPress={() =>
          dispatch(get_Trending_Media(page, size, city, state, country))
        }>
        <Text
          style={{
            color: '#999',
            fontSize: scale(13),
            textAlign: 'center',
            marginTop: 10,
          }}>
          {trendingDataError}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: hp('1.7%'),
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  } else {
    mainTrendingView = trendingData
      .slice(0, 10)
      .sort((a, b) => b.hits - a.hits)
      .map((song, index) => (
        <MediaSong
          // data={song}
          {...artists}
          {...song}
          allSongs={trendingData}
          key={index}
          showLikeBtn={true}
          indexes
          index={index}
        />
      ));
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginTop: 10}}>
        {/* CAROUSEL VIEW */}
        <View style={styles.carouselContent}>
          <View style={styles.more}>
            <Text
              style={{
                color: '#fff',
                fontSize: scale(15),
                fontFamily: 'Helvetica-ExtraBold',
              }}>
              New Releases
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('New_Releases')}>
              <Text
                style={{
                  color: '#eee',
                  fontSize: scale(10),
                  fontFamily: 'Helvetica-Medium',
                }}>
                View more
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10, flex: 1}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              scrollEventThrottle={16}>
              {mainReleasesView}
            </ScrollView>
          </View>
        </View>
        {/* TRENDING VIEW */}
        <View style={{marginTop: '7%'}}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.more}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: scale(15),
                  fontFamily: 'Helvetica-ExtraBold',
                }}>
                Trending
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Trending')}>
                <Text
                  style={{
                    color: '#eee',
                    fontSize: scale(10),
                    fontFamily: 'Helvetica-Medium',
                  }}>
                  View more
                </Text>
              </TouchableOpacity>
            </View>
            {/* TREANDING LIST */}
            <View style={{marginTop: '6%', flex: 1}}>{mainTrendingView}</View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default HomeContent;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  more: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

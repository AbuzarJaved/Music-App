import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TrendingTabHeader from './TabsScreen/TabHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import TodayScreen from './TabsScreen/TodayScreen';
import WeekScreen from './TabsScreen/WeekScreen';
import MonthScreen from './TabsScreen/MonthScreen';
import {
  get_Media,
  get_Trending_Media,
} from '../../redux/actions/MediaActions/getMediaActions';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import MediaSong from '../../Components/LibrarySongs/MediaSongs';
import LoadingAnime from '../../Components/Loading/Loading';
import CommonHeader from '../../Components/CustomHeader/CommonHeader';
import {scale, ScaledSheet} from 'react-native-size-matters';

const Trending = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(30);
  const [text, setText] = useState('');
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;
  const getTrendingMedia = useSelector(state => state.getTrendingMedia);
  const {
    data: trendingData,
    error: trendingDataError,
    loading: trendingDataLoading,
  } = getTrendingMedia;

  useFocusEffect(
    useCallback(() => {
      dispatch(get_Trending_Media(page, size, city, state, country));
    }, []),
  );
  const fiterTrendingData = val => {
    if (val !== '') {
      const filtered = trendingData
        ?.sort((a, b) => b.hits - a.hits)
        .filter(item =>
          item.title?.toLowerCase().startsWith(val.toLowerCase()),
        );
      return filtered;
    } else {
      return trendingData;
    }
  };

  let mainTrendingView = null;
  // ARTIST FROM LOADED SONGS
  const artists = trendingData?.map((item, index) => item.ownerAccountUser);

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
          No trending data.
        </Text>
      </View>
    );
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
      .sort((a, b) => b.hits - a.hits)
      .map((song, index) => (
        <MediaSong
          // data={song}
          {...artists}
          {...song}
          allSongs={trendingData}
          key={index}
          showLikeBtn={true}
        />
      ));
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <View style={styles.container}>
        <CommonHeader title="Trending" />
        {trendingDataLoading && <LoadingAnime width={60} height={60} />}
        <View style={styles.content}>
          <View style={styles.search}>
            <Icon name="search" color="#999" size={scale(20)} />
            <TextInput
              style={{
                paddingLeft: 10,
                color: '#999',
                fontSize: scale(12),
                fontFamily: 'Helvetica-Medium',
                width: '80%',
                backgroundColor: 'transparent',
              }}
              placeholder="Search"
              placeholderTextColor="#999"
              value={text}
              onChangeText={val => setText(val)}
            />
          </View>
          <View style={{width: '100%', marginTop: scale(20), flex: 1}}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 20,
                width: '100%',
                paddingBottom: 20,
              }}
              scrollEventThrottle={16}>
              {mainTrendingView}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Trending;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    height: hp('100%'),
    width: wp('100%'),
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
      android: {
        paddingTop: getStatusBarHeight() - 20,
      },
    }),
  },
  content: {
    flex: 1,
    width: '100%',
  },
  search: {
    borderWidth: 1,
    width: '90%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#555',
    borderColor: '#555',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    alignSelf: 'center',
    marginTop: '15@s',
  },
});

//  <StatusBar backgroundColor="#000"/>
//             <TrendingTabHeader/>
{
  /* <TrendingTabHeader /> */
}
{
  /* <TrendingTabHeader /> */
}

{
  /* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 20,
            borderBottomColor: '#1A1A1A',
            borderWidth: 1,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
            activeOpacity={0.7}
            style={{marginRight: 15}}>
            <Icon name="md-arrow-back" size={24} color="#f68128" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search Songs"
            style={{color: '#fff'}}
            value={text}
            placeholderTextColor="#999"
            onChangeText={val => setText(val)}
          />
        </View> */
}

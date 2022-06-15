import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  Text,
  FlatList,
} from 'native-base';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
// SCREENS
import TodayScreen from './TodayScreen';
import WeekScreen from './WeekScreen';
import MonthScreen from './MonthScreen';
import {
  get_Media,
  get_Trending_Media,
} from '../../../redux/actions/MediaActions/getMediaActions';
import {useSelector, useDispatch} from 'react-redux';
import MedialSong from '../../../Components/LibrarySongs/MediaSongs';
import LoadingAnime from '../../../Components/Loading/Loading';
import {scale, ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const TrendingTabHeader = () => {
  // const inputRef = useRef('');
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
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
      const filtered = trendingData?.filter(item =>
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
  } else if (trendingDataLoading) {
    mainTrendingView = <LoadingAnime width={60} height={60} />;
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
    mainTrendingView = (
      <FlatList
        data={fiterTrendingData(text)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 20}}
        renderItem={({songs}) => (
          <MedialSong allSongs={trendingData} {...songs} showLikeBtn={true} />
        )}
      />
    );
  }

  //  trendingData
  //    .sort((a, b) => b.hits - a.hits)
  //    .map((song, index) => (
  //      <MedialSong
  //        // data={song}
  //        {...artists}
  //        {...song}
  //        allSongs={trendingData}
  //        key={index}
  //        showLikeBtn={true}
  //        indexes
  //        index={index}
  //      />
  //    ));

  return (
    <>
      <View style={styles.container}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
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
            // ref={inputRef}
            value={text}
            placeholderTextColor="#999"
            onChangeText={val => setText(val)}
          />
        </View>
      </View>
      <View style={styles.content}>{mainTrendingView}</View>
    </>
  );
};
export default TrendingTabHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 100,
    elevation: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    width: '100%',
  },
});

// const [activeIndex, setActiveIndex] = useState(0);
// const segmentClicked = index => {
//   return setActiveIndex(index);
// };
// let renderViews;

// if (activeIndex == 0) {
//   renderViews = <TodayScreen />;
// }
// if (activeIndex == 1) {
//   renderViews = <WeekScreen />;
// }
// if (activeIndex == 2) {
//   renderViews = <MonthScreen />;
// }

{
  /* <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'rgba(255,255,255,0.061)',
            alignItems: 'center',
            borderRadius: 5,
            height: 50,
            padding: 5,
          }}>

          <TouchableOpacity
            hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}
            activeOpacity={0.6}
            onPress={() => segmentClicked(0)}
            style={[
              activeIndex == 0
                ? {
                    backgroundColor: '#F68128',
                    height: '100%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  },
            ]}>
            <Text
              style={[
                activeIndex == 0
                  ? {
                      color: '#fff',
                      fontFamily: 'Helvetica-Bold',
                      textAlign: 'center',
                    }
                  : {color: '#999', fontFamily: 'Helvetica-Bold'},
              ]}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}
            activeOpacity={0.6}
            onPress={() => segmentClicked(1)}
            style={[
              activeIndex == 1
                ? {
                    backgroundColor: '#F68128',
                    height: '100%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  },
            ]}>
            <Text
              style={[
                activeIndex == 1
                  ? {
                      color: '#fff',
                      fontFamily: 'Helvetica-Bold',
                      textAlign: 'center',
                    }
                  : {color: '#999', fontFamily: 'Helvetica-Bold'},
              ]}>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}
            activeOpacity={0.6}
            onPress={() => segmentClicked(2)}
            style={[
              activeIndex == 2
                ? {
                    backgroundColor: '#F68128',
                    height: '100%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  },
            ]}>
            <Text
              style={[
                activeIndex == 2
                  ? {
                      color: '#fff',
                      fontFamily: 'Helvetica-Bold',
                      textAlign: 'center',
                    }
                  : {color: '#999', fontFamily: 'Helvetica-Bold'},
              ]}>
              Monthly
            </Text>
          </TouchableOpacity>
        </View> */
}

{
  /* <ScrollView style={{paddingTop: 10, paddingHorizontal: 5}}>
          {renderViews}
        </ScrollView> */
}

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
import CommonHeader from '../../../Components/CustomHeader/CommonHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {alphaBets} from '../../../data5';
import CustomAlphaFilter from '../../../Components/Button/CustomAlphabetFilterView';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginBtn from '../../../Components/Button/LoginBtn';
import {useSelector, useDispatch} from 'react-redux';
import {get_Media} from '../../../redux/actions/MediaActions/getMediaActions';
import LoadingAnime from '../../../Components/Loading/Loading';
import MediaSong from '../../../Components/LibrarySongs/MediaSongs';
import Divider from '../../../Components/Divider/Divider';

const {height, width} = Dimensions.get('window');

const ArtistSongsView = () => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState('All');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(100);

  const getMedia = useSelector((state) => state.getMedia);

  const {loading, error, data: mediaData} = getMedia;

  useFocusEffect(
    useCallback(() => {
      dispatch(get_Media(page, size));
      //   dispatch(get_Artist_Trending_Media(city, state, country, page, size));
    }, []),
  );

  const fiterArtistData = (val) => {
    if (val !== 'All' && val !== '') {
      const filtered = mediaData.filter(
        (item) => item.title?.toLowerCase().indexOf(val.toLowerCase()) >= 0,
      );
      return filtered;
    } else {
      return mediaData;
    }
  };

  const chooseFilterVal = (val) => {
    setFilterValue(val);
  };

  let mainView = null;
  if (error) {
    mainView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_Media(page, size))}>
        <Text
          style={{
            color: '#999',
            fontSize: hp('2.2%'),
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
            marginTop: hp('2.2%'),
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingVertical: 20}}
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
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <CommonHeader title="Songs" />
        {loading && <LoadingAnime width={60} height={60} />}
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <CustomAlphaFilter
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
              keyExtractor={(item) => item.title}
              renderItem={({item, index}) => (
                <CustomAlphaFilter
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
              // marginBottom: 10,
              alignSelf: 'flex-start',
              paddingHorizontal: 20,
              marginTop: 10,
            }}>
            <LoginBtn title="Play All" icon="play" height={35} />
          </View>
          <Divider mt={10} bc="#555" />
          <View style={{width: '100%', paddingHorizontal: 15}}>{mainView}</View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ArtistSongsView;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    width: '100%',
    height: '100%',
  },
});

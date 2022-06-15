import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import CustomHeader from '../../../Components/CustomHeader/CommonHeader';
import {useDispatch, useSelector} from 'react-redux';
import MainSuccessPopUp from '../../../Components/Modal/MainSuccessPopUp';
import MainErrorPopUp from '../../../Components/Modal/MainErrorPopUp';
import {get_All_User_Album} from '../../../redux/actions/MediaActions/AlbumActions/index';
import CustomAlphaBtn from '../../../Components/Button/CustomAlphabetFilterView';
import {alphaBets} from '../../../data5';
import LoadingAnime from '../../../Components/Loading/Loading';
import AlbumContainer from '../../../Components/LibrarySongs/components/AllAlbumComponent';

const {width, height} = Dimensions.get('window');

const ArtistAlbum = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [filterValue, setFilterValue] = useState('All');
  const getAllUserAlbum = useSelector(state => state.getAllUserAlbum);
  const {data, loading, error} = getAllUserAlbum;

    useEffect(() => {
      if (data.length <= 0) {
        dispatch(get_All_User_Album(page, size));
      }
    }, []);

  const filterAlbumData = val => {
    if (val !== 'All' && val !== '') {
      const filtered = data.filter(
        item => item.name?.toLowerCase().startsWith(val.toLowerCase()),
        // item => item.title?.toLowerCase().startsWith(val.toLowerCase()) >= 0,
      );
      return filtered;
    } else {
      return data;
    }
  };

  const chooseFilterVal = val => {
    setFilterValue(val);
  };

  let mainView = null;
  if (data && data.length > 0 && !loading) {
    mainView = (
      <FlatList
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          width: '100%',
          alignSelf: 'center',
          paddingBottom: 70,
          paddingHorizontal: 10,
        }}
        numColumns={2}
        data={filterAlbumData(filterValue)}
        keyExtractor={item => item.name}
        renderItem={({item}) => <AlbumContainer {...item} />}
      />
    );
  } else if (loading) {
    mainView = <LoadingAnime width={60} height={60} />;
  } else if (error) {
    mainView = (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_All_User_Album(page, size))}>
        <Text
          style={{
            color: '#999',
            fontSize: scale(13),
            textAlign: 'center',
            marginTop: 10,
          }}>
          {error}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: scale(11),
            textAlign: 'center',
            marginTop: scale(5),
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: '#000', width: '100%'}}>
        <CustomHeader title="Your Albums" />
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
          <View style={{width: '100%'}}>{mainView}</View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ArtistAlbum;

const styles = ScaledSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    width,
    height,
    // alignItems: 'center',
  },
});

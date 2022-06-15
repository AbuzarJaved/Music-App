import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
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

const {width, height} = Dimensions.get('window');

const ListenerFavoriteScreen = () => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState('All');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;
  const {playMusic} = usePlayerContext();
  const chooseFilterVal = val => {
    setFilterValue(val);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <View style={styles.container}>
          <CustomHeader title="Favorite Songs" />
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
                // onPress={() => playSongs()}
              />
            </View>
            <Divider mt={10} bc="#555" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListenerFavoriteScreen;

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

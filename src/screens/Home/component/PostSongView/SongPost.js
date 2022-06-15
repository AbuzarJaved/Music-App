import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Divider from '../../../../Components/Divider/Divider';
import Icon from 'react-native-vector-icons/Ionicons';
import ArtistSongs from '../../../Profile/ProfileTypes/UserDetails/ArtistMostPlayedCont';
import {useSelector, useDispatch} from 'react-redux';
import {getLoggedInUserProfile} from '../../../../utils/loggedInUserType';
import {choose_Post_Song} from '../../../../redux/actions/MediaActions/getMediaActions';
// import { FlatList } from 'react-native-gesture-handler';

const SongPost = props => {
  const dispatch = useDispatch();
  const artistData = getLoggedInUserProfile('ARTIST');
  const [searchValue, setSearchValue] = useState('');

  const getMedia = useSelector(state => state.getMedia);
  const {data: mediaData} = getMedia;
  // const {
  //   artistProfile: {stageName},
  // } = artistData;
  // const artistsSongs = mediaData.filter(x => x.artist.stageName === stageName);

  const chooseSongDetails = (val = {}) => {
    dispatch(choose_Post_Song(val));
    props.closeModal();
  };

  const fiterArtistData = val => {
    if (val && val !== '') {
      const filtered = mediaData.filter(
        item => item.title?.toLowerCase().indexOf(val.toLowerCase()) >= 0,
      );
      return filtered;
    } else {
      return mediaData;
    }
    // console.log(filtered);
    //  setFilteredData(filtered);
    // return filtered;
  };
  return (
    <View style={styles.container}>
      <View style={styles.cont}>
        <View style={styles.inputCont}>
          <TouchableOpacity activeOpacity={0.8} style={styles.search}>
            <Icon name="search" color="#999" size={24} />
            <TextInput
              style={{
                color: '#fff',
                width: '100%',
                fontFamily: 'Helvetica-Medium',
                paddingLeft: 10,
              }}
              placeholder="Search song"
              placeholderTextColor="#999"
              value={searchValue}
              onChangeText={val => setSearchValue(val)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
            activeOpacity={0.8}
            onPress={() => props.closeModal2()}
            style={styles.closeBtn}>
            <Icon name="close-circle-outline" size={30} color="#f68128" />
          </TouchableOpacity>
        </View>
      </View>
      <Divider bc="#555" />
      <View style={styles.content}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Helvetica-ExtraBold',
            marginBottom: 10,
          }}>
          Your Songs ({`${mediaData.length}`})
        </Text>

        {mediaData.length <= 0 ? (
          <View style={styles.emptyCont}>
            <Text
              style={{
                color: '#999',
                fontWeight: '800',
                fontFamily: 'Helvetica-ExtraBold',
                fontSize: 15,
                marginTop: 20,
              }}>
              You haven't uploaded any Song yet.
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{paddingBottom: 30}}
            showsVerticalScrollIndicator={false}
            // data={artistsSongs}
            data={fiterArtistData(searchValue)}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ArtistSongs
                {...item}
                chooseSongDetails={val => chooseSongDetails(val)}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default SongPost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  inputCont: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cont: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
  },
  search: {
    borderWidth: 1,
    width: '85%',
    borderRadius: 10,
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#555',
    borderColor: '#555',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
  },
  emptyCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

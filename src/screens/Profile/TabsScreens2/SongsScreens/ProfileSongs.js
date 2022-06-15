import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import data from '../../../../data';
import GeneralSongs from '../../../../Components/LibrarySongs/GeneralSong';
import MediaSong from '../../../../Components/LibrarySongs/MediaSongs';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getLoggedInUserProfile} from '../../../../utils/loggedInUserType';
import {
  get_User_Media_Listening_History,
  get_Artist_Media,
  get_Media
} from '../../../../redux/actions/MediaActions/getMediaActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const ProfileSongs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  // const getMedia = useSelector((state) => state.getMedia);
  // const {data: mediaData} = getMedia;
  const getMedia = useSelector((state) => state.getMedia);
  const {loading, error, data: artistMedias} = getMedia;
  const artistData = getLoggedInUserProfile('ARTIST');

  // const {
  //   artistProfile: {stageName},
  // } = artistData;
  // const artistsSongs = mediaData.filter(
  //   (x) => x.artist.stageName === stageName,
  // );
  const artistSongsView = artistMedias.map((song, index) => (
    <MediaSong
      // data={song}
      // {...artists}
      {...song}
      allSongs={artistMedias}
      key={index}
      showLikeBtn={true}
      indexes
      index={index}
    />
  ));
  const artistTotalStream = artistMedias.reduce((a, b) => a + b['hits'], 0);
  console.log(artistTotalStream, 'ARTIST TOTAL STREAM');
  const songView = data.map((item, index) => (
    <GeneralSongs showLikeBtn={true} key={index} {...item} />
  ));

  if (artistMedias.length < 0 && !loading && !error) {
    return (
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
          You haven't uploaded any song yet.
        </Text>
      </View>
    );
  } else if (loading) {
    return (
      <View style={{alignSelf: 'center', marginTop: 20}}>
        <ActivityIndicator size={30} color="#F68128" />
      </View>
    );
  } else if (error) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_Media(page, size))}>
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
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: scale(14),
              color: '#eee',
              fontFamily: 'Helvetica-Bold',
            }}>
            Songs ({artistMedias.length})
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ArtistAllSongScreen')}>
            <Text
              style={{
                color: '#999',
                fontSize: scale(10),
                fontFamily: 'Helvetica-Bold',
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        {artistSongsView}
      </View>
    );
  }
};

export default ProfileSongs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
  },
  emptyCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

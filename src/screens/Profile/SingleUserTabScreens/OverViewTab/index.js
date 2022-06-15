import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
// import FeaturedSong from '../component/FeaturedSong';
import {shortData, media, supporters} from '../../../../data5';
import GeneralSongs from '../../../../Components/LibrarySongs/GeneralSong';
import MediaContainer from '../component/MediaContainer';
import SupportersCont from '../component/SupportersCont';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getLoggedInUserProfile} from '../../../../utils/loggedInUserType';
import MediaSong from '../../../../Components/LibrarySongs/MediaSongs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  get_User_Media_Listening_History,
  get_Single_User_Media_History,
} from '../../../../redux/actions/MediaActions/getMediaActions';
import {scale, ScaledSheet} from 'react-native-size-matters';

const SingleUserProfileOverView = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const navigation = useNavigation();
  const getMedia = useSelector(state => state.getMedia);
  const {data: mediaData} = getMedia;
  const artistData = getLoggedInUserProfile('ARTIST');
  const getSingleUserMediasHistory = useSelector(
    state => state.getSingleUserMediasHistory,
  );
  const {loading, error, medias: listeningData} = getSingleUserMediasHistory;

  const storeActiveUserDetails = useSelector(
    state => state.storeActiveUserDetails,
  );
  const {
    userProfile: {id},
  } = storeActiveUserDetails;

  const allSongs = listeningData?.map(item => item.media);
  // const {
  //   artistProfile: {stageName},
  // } = artistData;
  // const artistsSongs = mediaData.filter(
  //   (x) => x.artist.stageName === stageName,
  // );
  const artistSongsView = listeningData
    ?.sort((a, b) => b.hits - a.hits)
    ?.slice(0, 10)
    ?.map((song, index) => (
      <MediaSong
        // data={song}
        // {...artists}
        {...song.media}
        allSongs={allSongs}
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
  if (listeningData?.length <= 0 && !loading && !error) {
    return (
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
          This user hasn't listened to any song yet.
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
        onPress={() => dispatch(get_Single_User_Media_History(id, page, size))}>
        <Text
          style={{
            color: '#999',
            fontSize: scale(12),
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
        <View style={styles.sectionContainer}>
          {/* Popular Section */}
          <Text style={[styles.sectionHeader, {marginTop: 20}]}>
            Top (10) Played Songs
          </Text>
          <View>{artistSongsView}</View>
        </View>
      </View>
    );
  }
};

export default SingleUserProfileOverView;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: 10,
    paddingTop: 20,
  },
  sectionHeader: {
    fontSize: '14@s',
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

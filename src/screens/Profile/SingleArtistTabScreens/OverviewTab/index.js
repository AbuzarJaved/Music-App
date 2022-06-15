import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
// import FeaturedSong from '../../';
import {shortData, media, supporters} from '../../../../data5';
import GeneralSongs from '../../../../Components/LibrarySongs/GeneralSong';
import MediaContainer from '../component/MediaContainer';
import SupportersCont from '../component/SupportersCont';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getLoggedInUserProfile} from '../../../../utils/loggedInUserType';
import MediaSong from '../../../../Components/LibrarySongs/MediaSongs';
import {
  get_Artist_Trending,
  get_Media,
  get_Single_Artist_Media,
} from '../../../../redux/actions/MediaActions/getMediaActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {max} from 'moment';

const SingleArtistProfileOverView = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const navigation = useNavigation();

  const getSingleArtistMedias = useSelector(
    state => state.getSingleArtistMedias,
  );
  const storeActiveUserDetails = useSelector(
    state => state.storeActiveUserDetails,
  );
  const {
    userProfile: {id},
  } = storeActiveUserDetails;
  const {loading, error, medias: trendingData} = getSingleArtistMedias;



  const artistSongsView = trendingData
    ?.sort((a, b) => b.hits - a.hits)
    ?.slice(0, 10)
    ?.map((song, index) => (
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

  if (trendingData?.length <= 0 && !loading && !error) {
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
          Artist doesn't have any trending song yet.
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
        onPress={() => dispatch(get_Single_Artist_Media(id, page, size))}>
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
        <View style={styles.sectionContainer}>
          {/* Popular Section */}
          <Text style={[styles.sectionHeader, {marginTop: 20}]}>
            Top (10) Streamed Songs
          </Text>
          <View>{artistSongsView}</View>
        </View>
      </View>
    );
  }
};

export default SingleArtistProfileOverView;

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

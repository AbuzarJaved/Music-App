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
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {getLoggedInUserProfile} from '../../../../utils/loggedInUserType';
import {
  get_User_Media_Listening_History,
  get_Single_User_Media_History,
} from '../../../../redux/actions/MediaActions/getMediaActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const SingleUserProfileSongs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const navigation = useNavigation();
  const getSingleUserMediasHistory = useSelector(
    state => state.getSingleUserMediasHistory,
  );
  const storeActiveUserDetails = useSelector(
    state => state.storeActiveUserDetails,
  );
  const {
    userProfile: {id},
  } = storeActiveUserDetails;
  const {loading, error, medias: listeningData} = getSingleUserMediasHistory;

  const allSongs = listeningData?.map(item => item.media);
  // const {
  //   artistProfile: {stageName},
  // } = artistData;
  // const artistsSongs = mediaData.filter(
  //   (x) => x.artist.stageName === stageName,
  // );
  const songsView = listeningData
    ?.sort((a, b) => a.hits - b.hits)
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

  // const songView = data.map((item, index) => (
  //   <GeneralSongs showLikeBtn={true} key={index} {...item} />
  // ));

  if (listeningData?.length <= 0 && !loading && !error) {
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
    return <View style={styles.container}>{songsView}</View>;
  }
};

export default SingleUserProfileSongs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  emptyCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

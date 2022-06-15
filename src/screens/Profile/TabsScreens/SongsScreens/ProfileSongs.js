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
import {get_User_Media_Listening_History} from '../../../../redux/actions/MediaActions/getMediaActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const ProfileSongs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const navigation = useNavigation();
  const getUserMediaListeningHistory = useSelector(
    state => state.getUserMediaListeningHistory,
  );
  const {loading, error, data: listeningData} = getUserMediaListeningHistory;

  const allSongs = listeningData.map(item => item.media);
  // const {
  //   artistProfile: {stageName},
  // } = artistData;
  // const artistsSongs = mediaData.filter(
  //   (x) => x.artist.stageName === stageName,
  // );
  const songsView = listeningData.map((song, index) => (
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

  if (listeningData.length <= 0 && !loading && !error) {
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
          You haven't listened to any song yet.
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
        onPress={() => dispatch(get_User_Media_Listening_History(page, size))}>
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
        <Text
          style={[
            styles.sectionHeader,
          ]}>{`Songs (${listeningData?.length})`}</Text>
        {songsView}
      </View>
    );
  }
};

export default ProfileSongs;

const styles = ScaledSheet.create({
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
  sectionHeader: {
    fontSize: '14@s',
    fontFamily: 'Helvetica-Bold',
    color: '#eee',
    marginBottom: 20,
  },
});

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CommentReply from '../../component/FollowActivitiesComp/FollowUser';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {get_User_Activities} from '../../../../redux/actions/userActions';

const FollowScreen = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(200);
  const getAllUsersActivities = useSelector(
    state => state.getAllUsersActivities,
  );
  const {loading, error, data} = getAllUsersActivities;
  const getData = () => {
    dispatch(get_User_Activities(page, size));
  };

  const followArray = data.filter(item => item.activityType === 'FOLLOW');

  let mainView = null;
  if (loading) {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          marginTop: scale(20),
        }}>
        <ActivityIndicator size={30} color="#F68128" />
      </View>
    );
  } else if (error) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => getData()}>
        <Text
          style={{
            color: '#999',
            fontSize: scale(13),
            textAlign: 'center',
            marginTop: 20,
          }}>
          {error}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: scale(11),
            textAlign: 'center',
            marginTop: 20,
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  } else if (followArray.length <= 0 && !loading && !error) {
    return (
      <View style={{alignSelf: 'center', width: '100%', paddingHorizontal: 20}}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '800',
            fontFamily: 'Helvetica-ExtraBold',
            fontSize: scale(13),
            marginTop: 30,
            textAlign: 'center',
          }}>
          You haven't followed any user yet.
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{width: '100%', marginTop: scale(5)}}>
        <FlatList
          data={followArray}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: scale(100),
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item =>
            `${item?.media?.id}${Math.floor(Math.random() * 100)}`
          }
          renderItem={({item}) => <CommentReply {...item} />}
        />
      </View>
    );
  }
};

export default FollowScreen;

const styles = StyleSheet.create({});

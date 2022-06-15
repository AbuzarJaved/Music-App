import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {get_User_Activities} from '../../../../redux/actions/userActions';
import {scale, ScaledSheet} from 'react-native-size-matters';

import GeneralActivities from '../../component/GeneralActivities';

const Activities = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const getAllUsersActivities = useSelector(
    state => state.getAllUsersActivities,
  );
  const {loading, error, data} = getAllUsersActivities;

  const getData = () => {
    dispatch(get_User_Activities(page, size));
  };

  let mainView = null;


  if (data.length <= 0 && !loading && !error) {
    mainView = (
      <View style={{alignSelf: 'center', width: '100%'}}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '800',
            fontFamily: 'Helvetica-ExtraBold',
            fontSize: scale(13),
            marginTop: 30,
            textAlign: 'center',
          }}>
          You don't have any activities registered yet.
        </Text>
      </View>
    );
  } else if (loading) {
    mainView = (
      <View style={{alignSelf: 'center', marginTop: 20}}>
        <ActivityIndicator size={30} color="#F68128" />
      </View>
    );
  } else if (error) {
    mainView = (
      <TouchableOpacity activeOpacity={0.7} onPress={() => getData()}>
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
            marginTop: 20,
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={styles.container}>
      {mainView}
      {data.length > 0 && (
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            marginBottom: scale(10),
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AllActivities')}>
            <Text
              style={{
                color: '#999',
                fontSize: scale(11),
                fontFamily: 'Helvetica-Bold',
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {data.slice(0, 10).map((item, index) => (
        <GeneralActivities {...item} key={index} />
      ))}

    </View>
  );
  // }
};

export default Activities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});

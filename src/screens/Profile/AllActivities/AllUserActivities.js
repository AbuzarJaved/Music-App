import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {get_User_Activities} from '../../../redux/actions/userActions';
import {useDispatch} from 'react-redux';
import ProfileHeader from '../component/ProfileHeader';
import TabHeader from './TabHeader';

const {width, height} = Dimensions.get('window');

const AllUserActivities = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(200);

  useEffect(() => {
    dispatch(get_User_Activities(page, size));
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View style={styles.container}>
        <ProfileHeader title="All Activities" />
        <View style={styles.content}>
          <TabHeader />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllUserActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  content: {
    flex: 1,
    width: '100%',
    // paddingHorizontal: 20,
  },
});

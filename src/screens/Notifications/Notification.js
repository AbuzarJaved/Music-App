import React, {useRef, useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import LikedComponent from './component/LikedComponent';
import CommentComponent from './component/CommentComponent';
import FollowComponent from './component/FollowComponent';
import NotificationsHeader from './component/NotificationsHeader';
import NotificationsFilterModal from '../../Components/Modal/NotificationFilterModal';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  openNotificationFilterModal,
  closeNotificationFilterModal,
} from '../../redux/actions/notificationFilterActions';
import GeneralBottomSheet from '../../Components/BottomSheet/GeneralBottomSheet';
import {get_User_Notifications} from '../../redux/actions/userActions';
import LoadingAnime from '../../Components/Loading/Loading';
import DiscoveryErrorScreen from '../../Components/ErrorScreen/DiscoveryErrorScreen';

const {width, height} = Dimensions.get('window');

const Notification = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(100);
  const Bs = useRef(null);
  const getAllUsersNotifications = useSelector(
    state => state.getAllUsersNotifications,
  );

  const {loading, error, data} = getAllUsersNotifications;

  const openBottomSheet = () => {
    Bs.current.open();
  };
  const closeBottomSheet = () => {
    Bs.current.close();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(get_User_Notifications(page, size));
    }, []),
  );

  let mainView = null;
  if (error) {
    mainView = (
      <DiscoveryErrorScreen
        errorTitle={error}
        onPress={() => dispatch(get_User_Notifications(page, size))}
      />
    );
  } else if (data.length <= 0 && !loading && !error) {
    mainView = (
      <View style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
        <Text
          style={{
            color: '#fff',
            fontSize: scale(12),
            fontFamily: 'Helvetica-Bold',
          }}>
          You have no notifications registered
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {loading && <LoadingAnime width={60} height={60} />}
        <StatusBar backgroundColor="#000" />
        {/* HEADER */}
        {/* <CustomHeader title="Notifications" /> */}
        {/* CONTENT */}
        {/* <TouchableWithoutFeedback
          onPress={() => dispatch(closeNotificationFilterModal())}> */}
        <View style={{}}>
          {/* SUBHEADER */}
          <NotificationsHeader
            title="Notifications"
            onPress={openBottomSheet}
          />
          {/* <NotificationsFilterModal /> */}
          {/* SUB CONTENT */}
          <ScrollView
            contentContainerStyle={{
              marginTop: 20,
              paddingHorizontal: 15,
              paddingBottom: 80,
              maxWidth: width,
            }}>
            {mainView}
          </ScrollView>
          <GeneralBottomSheet ref={Bs} height={350} radius={20}>
            <NotificationsFilterModal onPress={closeBottomSheet} />
          </GeneralBottomSheet>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    maxWidth: width,
    paddingBottom: 10,
  },
});

{
  /* <Text
              style={{
                color: '#f68128',
                fontFamily: 'Helvetica-Bold',
                fontSize: 16,
              }}>
              Today
            </Text>
            <View
              style={{
                flex: 1,
                borderBottomColor: '#333',
                borderWidth: 1,
                paddingBottom: 20,
              }}>
              <LikedComponent video name="Martinss" type="video" />
              <CommentComponent name="Martins" />
              <FollowComponent name="Martin" />
              <FollowComponent name="Martin" />
              <FollowComponent name="Martin" />
            </View>
            <View style={{flex: 1, marginTop: 20}}>
              <Text
                style={{
                  color: '#f68128',
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 16,
                }}>
                This Week
              </Text>
              <FollowComponent name="Martins" />
              <LikedComponent video name="Martinss" type="video" />
              <CommentComponent name="Martins" />
              <LikedComponent video name="Martinss" type="video" />
              <CommentComponent name="Martins" />
            </View> */
}

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import NotificationsHeader from '../../Components/CustomHeader/CommonHeader';
import {alphaBets} from '../../data5';
import {useDispatch, useSelector} from 'react-redux';
import LoadingAnime from '../../Components/Loading/Loading';
import ErrorScreen from '../../Components/ErrorScreen/ErrorScreen';

const {width, height} = Dimensions.get('window');

const DiscoveredSongs = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <NotificationsHeader showBackBtn={true} title="Discovered Songs" />
          <View style={styles.content}>
            <Text style={{color: '#eee'}}>Discovered</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DiscoveredSongs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    width,
    flex: 1,
    paddingHorizontal: 20,
    // marginTop: 80,
    // paddingTop: 10,
  },
});

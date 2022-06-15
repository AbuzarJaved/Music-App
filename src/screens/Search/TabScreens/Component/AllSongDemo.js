import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SongDetail from './Component/SongDetail';
import data from '../../../data';
import {usePlayerContext} from '../../../PlayerContext/PlayerContext';
import PlayListContainer from '../../Playlist/component/PlaylistContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import data3 from '../../../data3';

const {width, height} = Dimensions.get('window');
const All_Songs_Screen = () => {
  const {isEmpty, currentTrack} = usePlayerContext();
  const dataList = data3.map((item, index) => (
    <PlayListContainer key={index} {...item} />
  ));
  return (
    <View
      style={[
        {backgroundColor: '#000', width, height, flex: 1},
        isEmpty || !currentTrack ? {paddingBottom: 40} : {paddingBottom: 100},
      ]}>
      <ScrollView contentContainerStyle={{width}} bounces={false}>
        {/* SECTIONS */}
        <View style={styles.sectionCont}>
          <Text style={styles.headerText}>Artists</Text>
          <TouchableOpacity activeOpacity={0.6} style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
            <Icon name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
          <View style={styles.carouselView}>
            {/* <ScrollView
              horizontal={false}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}> */}
            {dataList}
            {/* </ScrollView> */}
          </View>
        </View>
        {/* SECTIONS */}
        <View style={styles.sectionCont}>
          <Text style={styles.headerText}>Tracks</Text>
          <TouchableOpacity activeOpacity={0.6} style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
            <Icon name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
          <View style={styles.carouselView}>
            {/* <ScrollView
              horizontal={false}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}> */}
            {dataList}
            {/* </ScrollView> */}
          </View>
        </View>
        {/* SECTIONS */}
        <View style={styles.sectionCont}>
          <Text style={styles.headerText}>Albums</Text>
          <TouchableOpacity activeOpacity={0.6} style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
            <Icon name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
          <View style={styles.carouselView}>
            {/* <ScrollView
              horizontal={false}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}> */}
            {dataList}
            {/* </ScrollView> */}
          </View>
        </View>
        {/* SECTIONS */}
        <View style={styles.sectionCont}>
          <Text style={styles.headerText}>PlayLists</Text>
          <TouchableOpacity activeOpacity={0.6} style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
            <Icon name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
          <View style={styles.carouselView}>
            {/* <ScrollView
              horizontal={false}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}> */}
            {dataList}
            {/* </ScrollView> */}
          </View>
        </View>
      </ScrollView>
      {/* <FlatList
        numColumns={2}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <SongDetail {...item} />}
      /> */}
    </View>
  );
};

export default All_Songs_Screen;

const styles = StyleSheet.create({
  viewAll: {
    width: '100%',

    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sectionCont: {
    marginVertical: 5,
    width,
    paddingHorizontal: 25,
  },
  headerText: {
    color: '#ddd',
    fontSize: 15,
    paddingVertical: 5,
    fontFamily: 'Gilroy-ExtraBold',
  },
  viewAllText: {
    color: '#999',
    fontSize: 10,
    fontFamily: 'Gilroy-Bold',

    right: 0,
    marginRight: 5,
  },
  carouselView: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

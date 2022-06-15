import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import ExpansionIcon from '../../../Components/Icons/ExpansionIcon';
import SearchResult from './SearchResult';
import data from '../../../data';

const BottomSheetContent = ({
  onPress,
  userArea: {state, country},
  stateFilter,
  countryFilter,
}) => {
  // const arrList = data.map((data, index) => (
  //   <SearchResult {...data} index={index} indexes key={index} />
  // ));
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress.current.snapTo(1)}>
        <View style={styles.bar}></View>
      </TouchableOpacity>
      {/* COUNTRY VIEW */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   marginBottom: 10,
          marginTop: 5,
          //   paddingHorizontal: 10,
        }}>
        {/* Text */}
        <View>
          <Text
            style={{
              color: '#eee',
              fontSize: 13,
              fontFamily: 'Helvetica-Regular',
            }}>
            Top Artist in
            <Text
              style={{
                color: '#f68128',
                fontSize: 15,
                textTransform: 'capitalize',
                fontFamily: 'Helvetica-Medium',
              }}>
              &nbsp;&nbsp;
              {countryFilter === 'United States'
                ? `${stateFilter}, ${countryFilter}`
                : `${countryFilter}`}
              {/* {`${stateFilter}, ${countryFilter}`} */}
            </Text>
          </Text>
        </View>
        {/*  */}
        <ExpansionIcon color="#f68128" />
      </View>
      <View style={styles.data}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <SearchResult indexes {...item} index={index} />
          )}
        />

        {/* {arrList} */}

        {/* <SearchResult /> */}
      </View>
    </View>
  );
};

export default BottomSheetContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 900,
  },
  bar: {
    width: 100,
    height: 6,
    backgroundColor: '#f68128',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
  data: {
    marginVertical: 10,
    paddingBottom: 20,
  },
});

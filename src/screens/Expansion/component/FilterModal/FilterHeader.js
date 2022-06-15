import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginBtn from '../../../../Components/Button/LoginBtn';

const FilterHeader = (props) => {
  const submit =() => {
    props.onPress();
    props.apply()
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => props.onPress()}>
          <Icon name="close" size={36} color="#999" />
        </TouchableOpacity>
        <Text style={styles.searchText}>Search filter</Text>
        <View style={styles.btnView}>
          <LoginBtn title="Apply" height={45} onPress={() => submit()} />
        </View>
      </View>
      <View style={styles.content2}>
        <View style={styles.content2_Header}>
          <View style={styles.singleHeader}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => props.changeTab2()}>
              <Text style={[styles.searchHeaderText]}>Country</Text>
            </TouchableOpacity>
            {!props.activeTab && <View style={styles.activeBorder}></View>}
          </View>
          {/* <View style={styles.singleHeader}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => props.changeTab()}>
              <Text style={[styles.searchHeaderText, {textAlign: 'right'}]}>
                Liked
              </Text>
            </TouchableOpacity>
            {props.activeTab && <View style={styles.activeBorder}></View>}
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content2: {
    width: '100%',
    marginTop: 30,
  },
  content2_Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  singleHeader: {
    width: '50%',
  },
  searchText: {
    color: '#999',
  },
  btnView: {
    width: '25%',
    marginTop: 10,
  },
  searchHeaderText: {
    color: '#fff',
    fontFamily: 'Gilroy-ExtraBold',
    fontSize: 18,

    paddingHorizontal: 30,
    marginBottom: 10,
  },
  activeBorder: {
    width: '100%',
    height: 5,
    backgroundColor: '#f68128',
    borderRadius: 10,
  },
});

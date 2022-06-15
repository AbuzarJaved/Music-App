import React, {useEffect, useState, Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Divider from '../../../../Components/Divider/Divider';

import FilterHeader from './FilterHeader';
import GenreSelection from './GenreSelection';
import CountrySelector from '../CountrySelector';
import Icon from 'react-native-vector-icons/Ionicons';
// import csc from 'country-state-city';
import Data from 'city-state-country';
import {Country, State} from 'country-state-city';

const GoogleFilterModal = props => {
  const [activeTab, setActiveTab] = useState(false);
  const [genreValue, setGenreValue] = useState('Hip-Hop & Rap');
  const [countryValue, setCountryValue] = useState('United States');
  const [numData, setNumData] = useState(10);
  const [countryCode, setCountryCode] = useState('US');
  const [statesData, setStatesData] = useState([]);
  const [userState, setUserState] = useState('');

  // console.log(props, 'PROPS FROM GOOGLE FILTER MODAL');

  const changeActiveTab = () => {
    setActiveTab(true);
  };
  const changeActiveTab2 = () => {
    setActiveTab(false);
  };
  const changeGenreValue = val => {
    setGenreValue(val);
  };
  const changeCountryValue = val => {
    setCountryValue(val);
  };
  const changeCountryCode = val => {
    setCountryCode(val);
  };
  const incrementNumber = () => {
    if (props.resultNum < 10) {
      props.chooseResultNum(prevData => prevData + 1);
    }
  };
  const decrementNumber = () => {
    if (props.resultNum > 1) {
      props.chooseResultNum(prevData => prevData - 1);
    }
  };
  const closeModal = () => {
    setActiveTab(false);
  };
  useEffect(() => {
    if (props.countryFilter != '') {
      const data = Data.getAllStatesFromCountry(props.countryFilter);
      // const data = Country.getStatesOfCountry(props.userCountryCode);
      // const data2 = State.getStatesOfCountry(props.userCountryCode);

      if (data) {
        setStatesData(data);
      }
    }
  }, [props.countryFilter]);
  // console.log(csc.getAllStates('NG'));
  // console.log(statesData, 'Country Code');
  // console.log(countryCode, 'Country Code');
  // console.log(Data.getAllStatesFromCountry(countryCode), 'Country Code');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showFilter}
      onRequestClose={() => props.onPress()}>
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <FilterHeader
            onPress={props.onPress}
            activeTab={activeTab}
            changeTab={changeActiveTab}
            changeTab2={changeActiveTab2}
            closeModal={closeModal}
            apply={props.apply}
          />
          <View style={styles.content}>
            {!activeTab && (
              <>
                {/* <GenreSelection
                  genre={genreValue}
                  changeGenre={changeGenreValue}
                /> */}
                <View style={{marginTop: 10, marginBottom: 0}}>
                  <Divider />
                </View>
                <View>
                  {/* <Text style={[styles.searchHeaderText]}> Select Country</Text> */}
                  <CountrySelector
                    countryValue={countryValue}
                    userArea={props.userArea}
                    countryCode={props.userCountryCode}
                    countryFilter={props.countryFilter}
                    changeCountryCode={val => props.chooseCountryCode(val)}
                    changeCountry={val => props.chooseCountryFilter(val)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Divider />
                </View>
                {/* STATES */}

                {/* <View style={{height: '30%',backgroundColor:"#900"}}> */}
                {props.countryFilter === 'United States' && (
                    <>
                  <Text
                    style={[
                      styles.searchHeaderText,
                      {paddingLeft: 25, marginVertical: 5},
                    ]}>
                    States
                  </Text>
                  <View style={styles.stateCont}>
                    {statesData.length <= 0 && (
                      <Text style={{color: '#999'}}>
                        Choose a Country to see states
                      </Text>
                    )}
                    {statesData && (
                      <FlatList
                        data={statesData}
                        keyExtractor={item => item.name}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.stateGenre}
                            onPress={() => props.chooseStateFilter(item.name)}>
                            <View style={[styles.check]}>
                              {props.stateFilter === item.name && (
                                <View style={[styles.activeCheck]}></View>
                              )}
                            </View>
                            <Text
                              style={{
                                color: '#999',
                                fontSize: 17,
                              }}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </>
                )}

                {/* </View> */}
                <View style={{}}>
                  <Divider />
                </View>
                {/* NUMBER */}
                <View style={{flex: 1}}>
                  <Text style={[styles.searchHeaderText]}>Search Results</Text>

                  <View style={styles.numBtnCont}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={styles.singleBtn}
                      onPress={() => decrementNumber()}>
                      <Icon
                        name="remove-circle-outline"
                        size={25}
                        color={props.resultNum > 1 ? '#f68128' : '#999'}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#eee',
                        fontSize: 20,
                        marginHorizontal: 20,
                      }}>
                      {props.resultNum}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={styles.singleBtn}
                      onPress={() => incrementNumber()}>
                      <Icon
                        name="add-circle-outline"
                        size={25}
                        color={props.resultNum < 10 ? '#f68128' : '#999'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoogleFilterModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    height: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    zIndex: 500,
    paddingTop: 10,
    // flex: 1,
  },
  modalContent: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
  },
  searchHeaderText: {
    color: '#fff',
    fontFamily: 'Gilroy-ExtraBold',
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  numBtnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,

    // flex: 1,
    // marginTop: 10,
  },
  stateCont: {
    width: '100%',
    paddingHorizontal: 40,
    // paddingVertical: 20,
    // height: '95%',
    flex: 1,
  },
  stateGenre: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#eee',
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCheck: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: '#f68128',
  },
  content: {
    flex: 1,
  },
});

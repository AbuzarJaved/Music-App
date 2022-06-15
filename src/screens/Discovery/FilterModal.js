import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Divider from '../../Components/Divider/Divider';
import FilterHeader from './FilterHeader';
import CountrySelector from './CountrySelector';
import Data from 'city-state-country';
import {useDispatch, useSelector} from 'react-redux';
import {getGenres} from '../../redux/actions/getGenreActions';
import LoadingAnime from '../../Components/Animations/Small_LoadingAnime';

const FilterModal = props => {
  const dispatch = useDispatch();
  const getGenreList = useSelector(state => state.getGenreList);
  const {loading, error, data} = getGenreList;
  const [activeTab, setActiveTab] = useState(false);
  const [genreName, setGenreName] = useState('');
  const [genreId, setGenreId] = useState('');
  const [countryValue, setCountryValue] = useState('United States');
  const [numData, setNumData] = useState(10);
  const [countryCode, setCountryCode] = useState('United States');
  const [statesData, setStatesData] = useState([]);
  const [userState, setUserState] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);

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
    if (numData < 10) {
      setNumData(prevData => prevData + 1);
    }
  };
  const decrementNumber = () => {
    if (numData > 1) {
      setNumData(prevData => prevData - 1);
    }
  };
  const closeModal = () => {
    setActiveTab(false);
  };
  const chooseGenre = (val, val2) => {
    setGenreName(val);
    setGenreId(val2);
  };
  useEffect(() => {
    const data = Data.getAllStatesFromCountry(props.country);
    // console.log(countryCode,'GOGLE COUNTRY')
    if (data) {
      setStatesData(data);
    }
  }, [props.country]);
  // useEffect(() => {
  //   dispatch(getGenres(page, size));
  // }, [page, size]);

  // let loadingView = null;
  // let errorView = null;
  // if (loading) {
  //   loadingView = <LoadingAnime width={50} height={50} />;
  // }
  // if (error) {
  //   errorView = (
  //     <View style={{width: '100%', alignSelf: 'center'}}>
  //       <Text
  //         style={{
  //           color: '#eee',
  //           fontSize: 12,
  //           textAlign: 'center',
  //           fontFamily: 'Helvetica-Bold',
  //         }}>
  //         {error}
  //       </Text>
  //       <TouchableOpacity activeOpacity={0.7}>
  //         <Text
  //           style={{
  //             color: '#F68128',
  //             fontSize: 13,
  //             textAlign: 'center',
  //             fontFamily: 'Helvetica-ExtraBold',
  //           }}>
  //           Try Again
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

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
          />
          <View style={styles.content}>
            {!activeTab ? (
              <>
                {/* <GenreSelection
                  genre={genreValue}
                  changeGenre={changeGenreValue}
                /> */}
                <View style={{marginTop: 10, marginBottom: 0}}>
                  <Divider />
                </View>
                <View>
                  <Text style={[styles.searchHeaderText]}>
                    Filter by country
                  </Text>

                  <CountrySelector
                    countryValue={props.country}
                    countryCode={props.countryCode}
                    changeCountryCode={val => props.changeCountryCode(val)}
                    changeCountry={val => props.changeCountry(val)}
                    changeState={val => props.changeState(val)}
                  />
                </View>
                <View style={{marginTop: 20}}>
                  <Divider />
                </View>
                {/* STATES */}

                {countryValue === 'United States' && (
                  <>
                    <Text
                      style={[
                        styles.searchHeaderText,
                        {paddingLeft: 25, marginVertical: 10},
                      ]}>
                      Filter by states
                    </Text>
                    <View style={styles.stateCont}>
                      {!statesData && (
                        <Text style={{color: '#999'}}>
                          Choose a Country to see states
                        </Text>
                      )}
                      {statesData && (
                        // <View style={styles.stateCont}>
                        <FlatList
                          data={statesData}
                          contentContainerStyle={{paddingBottom: 30}}
                          keyExtractor={item => item.name}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              activeOpacity={0.6}
                              style={styles.stateGenre}
                              onPress={() => props.changeState(item.name)}>
                              <View style={[styles.check]}>
                                {userState === item.name && (
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
                {/* <View style={{marginTop: 10}}>
                  <Divider />
                </View> */}
              </>
            ) : (
              <View style={styles.genreView}>
                {/* {loadingView}
                {errorView}
                {data && (
                  <FlatList
                    data={data}
                    contentContainerStyle={{paddingBottom: 30}}
                    keyExtractor={(item) => item.genreName}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.stateGenre}
                        onPress={() =>
                          chooseGenre(item.genreName, item.genreIdentity)
                        }>
                        <View style={[styles.check]}>
                          {genreName === item.genreName && (
                            <View style={[styles.activeCheck]}></View>
                          )}
                        </View>
                        <Text
                          style={{
                            color: '#999',
                            fontSize: 17,
                          }}>
                          {item.genreName}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                )} */}
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

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
    // flex:1
  },
  searchHeaderText: {
    color: '#fff',
    fontFamily: 'Helvetica-ExtraBold',
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

    flex: 1,
    // height: '50%',
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
    width: '100%',

    flex: 1,
    height: '100%',
    // paddingBottom: 20,
  },
  genreView: {
    width: '100%',
    paddingHorizontal: 40,

    flex: 1,
  },
});

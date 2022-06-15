import React, {useEffect, useState} from 'react';
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
import {closeGoogleSearchModal} from '../../redux/actions/googleSearchActions';
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoder';
import RNGooglePlaces from 'react-native-google-places';
import Divider from '../../Components/Divider/Divider';
import LoadingAnime from '../../Components/Animations/Small_LoadingAnime';
import SingleGoogleResult from '../../screens/Expansion/component/SingleGoogleResult';

const GoogleSearchModal = (props) => {
  const dispatch = useDispatch();
  const openGoogleSearch = useSelector((state) => state.openGoogleSearch);
  const {isGoogleSearchModalOpen} = openGoogleSearch;
  const [data, setData] = useState([]);
  const [result, setResult] = useState('');
  const [userValue, onChangeUserText] = useState('');

  // console.log(props, 'PROPS');

  useEffect(() => {
    setData([]);
    if (userValue) {
      RNGooglePlaces.getAutocompletePredictions(userValue)
        .then((place) => {
          setData(place);
          // console.log(place, 'place');
        })
        .catch((error) => console.log(error.message));
    }
  }, [userValue]);
  // CHANGING USER LOCATION FROM SEARCH RESULT
  const changeUserLocation = (value) => {
    props.changeUserArea(value);
  };
  const geoCodeAddress = (address) => {
    Geocoder.geocodeAddress(address)
      .then((res) => {
        const result = res[0].position;
        // console.log(result, 'LAT, LONG');
        if (result) {
          // props.changeUserLocation(result);
        }
      })
      .catch((err) => console.log(err));
  };
  // CHANGING USER AREA FROM SEARCH RESULT
  const changeUserArea = (value) => {
    props.changeUserArea(value);
  };
  function setLoc(result1, result2) {
    setResult(result1);
    // console.log('SubArea', result2);
    // props.changeUserArea(result1);
    // console.log(props.show, 'TYP');
    // props.onChangeText('');
    // onChangeUserText('');
    if (result2) {
      geoCodeAddress(result2);
      dispatch(closeGoogleSearchModal());
    }
    setData([]);
  }
  let renderLoadingAnime;
  if (userValue && data.length === 0) {
    renderLoadingAnime = (
      <View
        style={[
          styles.resultView,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <LoadingAnime width={50} height={50} />
      </View>
    );
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isGoogleSearchModalOpen}
      // visible={props.openGoogleSearch}
      onRequestClose={() => dispatch(closeGoogleSearchModal())}
      // onRequestClose={() => props.closeModal()}
    >
      <View style={styles.modalView}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="AreaCode, State, Username"
              style={styles.input}
              value={userValue}
              onChangeText={(text) => onChangeUserText(text)}
            />
            <Icon
              name="search"
              color="#222"
              size={20}
              style={{marginRight: 15}}
            />
          </View>
          {/* CLOSE BTN */}
          <TouchableOpacity
            onPress={() => dispatch(closeGoogleSearchModal())}
            style={{alignSelf: 'center', marginTop: 10}}>
            <Icon name="close-circle-outline" size={36} color="#999" />
          </TouchableOpacity>
        </View>
        {data && data.length > 0 && (
          <View style={styles.resultView}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.fullText}
              renderItem={({item}) => (
                <SingleGoogleResult
                  {...item}
                  onPress={() => {
                    setLoc(item.primaryText, item.fullText);
                  }}
                />
              )}
            />
          </View>
        )}

        {renderLoadingAnime}
      </View>
    </Modal>
  );
};

export default GoogleSearchModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '95%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    zIndex: 500,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#eee',
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: 40,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginTop: 10,
  },
  input: {
    fontSize: 12,
    paddingLeft: 15,
    width: '80%',
  },
  resultView: {
    width: '95%',
    // height: 270,
    // borderRadius: 10,
    // backgroundColor: '#555',
    marginVertical: 10,
    zIndex: 600,
    marginLeft: 5,
    paddingTop: 10,
  },
  primaryText: {
    fontSize: 15,
    color: '#eee',
    textTransform: 'capitalize',
  },
  secondaryText: {
    fontSize: 13,
    color: '#f68128',
    textTransform: 'capitalize',
  },
  singleResult: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

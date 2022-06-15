import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {openGoogleSearchModal} from '../../../redux/actions/googleSearchActions';
import RNGooglePlaces from 'react-native-google-places';

const {width} = Dimensions.get('window');

// {
//   onPress, value, getUserLocation;
// }
const SearchComponent = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const openSearchModal = () => {
  //   RNGooglePlaces.openAutocompleteModal()
  //     .then((place) => {
  //       console.log(place);
  //       // place represents user's selection from the
  //       // suggestions and it is a simplified Google Place object.
  //     })
  //     .catch((error) => console.log(error.message));
  // };
  console.log(props,'From Search');
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          color="#f68128"
          size={32}
          style={{marginRight: 10}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => dispatch(openGoogleSearchModal())}
       
        style={styles.inputContainer}>
        <Icon
          name="search"
          color="#888"
          size={28}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
      {/* UserLocation */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.getUserLocation}
        style={styles.inputContainer}>
        <Icon
          name="md-person-circle"
          color="#f68128"
          size={30}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} style={styles.inputContainer}>
        <Icon
          name="md-options"
          color="#f68128"
          size={30}
          style={{ zIndex: 100}}
          onPress={() => props.onPress()}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    width,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 35 : 20,
    zIndex: 100,
    // elevation: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 50 / 2,
    borderColor: '#eee',
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    width: 50,
    zIndex: 100,
  },
  input: {
    fontSize: 12,
    paddingLeft: 15,
    width: '80%',
  },
});

import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Heatmap} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Markers from '../../Components/CustomMarker/Marker';
import {locations, locations1} from '../../../LocationData';
import SearchComponent from './component/SearchComponent';
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from 'react-native-geolocation-service';
// import {Permission, PERMISSION_TYPE} from '../../utils/AppPermissions';
import Geocoder from 'react-native-geocoder';
import {getLoggedInUserProfile} from '../../utils/loggedInUserType';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import {openGoogleSearchModal} from '../../redux/actions/googleSearchActions';
import {get_Artist_Trending} from '../../redux/actions/MediaActions/getMediaActions';
import BottomSheetContent from './component/BottomSheetContent';
import GoogleSearchModal from '../../Components/Modal/GoogleSearchModal';
import GoogleFilterModal from './component/FilterModal/GoogleFilterModal';
import {
  useFocusEffect,
} from '@react-navigation/native';
import LoadingAnime from '../../Components/Loading/Loading';
import NetworkError from '../NetworkErrorScreen.js/NetworkError';

const {width, height} = Dimensions.get('window');

const Expansion = () => {
  // Show or Hide Modal
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
    markerImage: '',
  });
  const userData = getLoggedInUserProfile('LISTENER');
  const {
    userProfile: {profileUrl},
  } = userData;

  const storeUserCoordinates = useSelector(state => state.storeUserCoordinates);
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const getArtistTrendingMedia = useSelector(
    state => state.getArtistTrendingMedia,
  );
  const {loading:artistLoading,error:artistError,data:artistData} = getArtistTrendingMedia;

  const {city, state, country, countryCode} = storeUserLocation;

  const {lat, lng} = storeUserCoordinates;
  const [openGoogleSearch, setOpenGoogleSearch] = useState(false);
  const [userArea, setUserArea] = useState({
    state: '',
    country: '',
    countryCode: '',
  });
  const [filterValue, setFilterValue] = useState('');
  const [filterColor, setFilterColor] = useState(false);
  const [cityFilter,setCityFilter] = useState('')
  const [userSearchValue, onChangeText] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [countryCodeFilter, setCountryCodeFilter] = useState('');
  const [resultNum, setResultNum] = useState(10);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const showModal = () => {
    setShow(!show);
  };
  const openGoogleModal = () => {
    setOpenGoogleSearch(true);
  };
  const closeGoogleModal = () => {
    setOpenGoogleSearch(false);
  };

  const ShowValue = value => {
    setShow(false);
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(get_Artist_Trending(cityFilter, stateFilter, countryFilter,page,size))
    }, [stateFilter,countryFilter]),
  );

  // const geoCodeUserLocation = () => {
  //   const position = {
  //     lat: userLocation.latitude,
  //     lng: userLocation.longitude,
  //   };
  //   Geocoder.geocodePosition(position)
  //     .then((res) => {
  //       const area = res[0].subAdminArea
  //         ? res[0].subAdminArea
  //         : res[0].adminArea;
  //       setUserArea(area);
  //     })
  //     .catch((err) => console.log(err));
  // };
  const changeUserLocations = data => {
    setUserLocation({latitude: data.lat, longitude: data.lng});
  };
  const changeUserArea = value => {
    setUserArea(value);
  };
  const geocoder = async () => {
    if (countryFilter === 'United States') {
      const loc = await Geocoder.geocodeAddress(
        `${stateFilter},${countryFilter}`,
      );
      if (loc) {
        setUserLocation({
          latitude: loc[0].position.lat,
          longitude: loc[0].position.lng,
          markerImage: profileUrl,
        });
      }
    } else {
      const loc = await Geocoder.geocodeAddress(`${countryFilter}`);

      if (loc) {
        setUserLocation({
          latitude: loc[0].position.lat,
          longitude: loc[0].position.lng,
          markerImage: profileUrl,
        });
      }
    }
    console.log('GEOCODING!!!!!!');
  };
  //
  // REF FRO BOTTOM SHEET
  const Bs = useRef(null);
  const fall = new Animated.Value(1);
  // BOTTOM SHEET CONTENT
  const renderContent = () => (
    <BottomSheetContent
      onPress={Bs}
      userArea={userArea}
      stateFilter={stateFilter}
      countryFilter={countryFilter}
    />
  );
  console.log(
    stateFilter,
    countryFilter,
    countryCodeFilter,
    resultNum,
    'From main component',
  );
  const getUserLocation = () => {
    setUserLocation({
      latitude: lat,
      longitude: lng,
      markerImage: profileUrl,
    });
    setUserArea({
      state,
      country,
      countryCode,
    });
    setStateFilter(state);
    setCountryFilter(country);
    setCountryCodeFilter(countryCode);
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  // useEffect(() => {
  //   geocoder();
  // }, []);

  let mainStatusView = null;
  if(artistLoading){
    mainStatusView = <LoadingAnime width={60} height={60}/>
  }
  else if (artistError){
      mainStatusView = (
        <NetworkError
          errorTitle={artistError}
          onPress={() =>
            dispatch(
              get_Artist_Trending(
                cityFilter,
                stateFilter,
                countryFilter,
                page,
                size,
              ),
            )
          }
        />
      );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
      {mainStatusView}
        <SearchComponent
          onPress={showModal}
          getUserLocation={() => getUserLocation()}
          openModal={() => openGoogleModal()}
        />
        {/* <BottomSheetContent ref={Bs}  /> */}

        {/* BOTTOMSHEET BUTTON */}
        {/* <TouchableOpacity
          style={styles.bottomSheetBtn}
          onPress={() => Bs.current.snapTo(0)}>
          <Text style={{textTransform: 'uppercase'}}>open</Text>
        </TouchableOpacity> */}
        <GoogleFilterModal
          showFilter={show}
          onPress={showModal}
          apply={geocoder}
          stateFilter={stateFilter}
          countryFilter={countryFilter}
          resultNum={resultNum}
          userArea={userArea}
          userCountryCode={countryCodeFilter}
          chooseCountryCode={val => setCountryCodeFilter(val)}
          chooseStateFilter={val => setStateFilter(val)}
          chooseCountryFilter={val => setCountryFilter(val)}
          chooseResultNum={val => setResultNum(val)}
        />
        <GoogleSearchModal
          value={userSearchValue}
          onChangeText={text => onChangeText(text)}
          changeUserArea={() => changeUserArea(area)}
          // changeUserArea={changeUserArea}
          changeUserLocation={data => changeUserLocations(data)}
          visible={openGoogleSearch}
          closeModal={() => closeGoogleModal()}
          // changeUserLocation={changeUserLocations}
        />
        {/* MAPVIEW */}
        {Platform.OS === 'ios' ? (
          <MapView
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            mapType="standard"
            region={{
              // latitude: 24.8317098,
              // longitude: 67.00210948,
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}>
              <Markers item={userLocation.markerImage} />
            </Marker>
            {/* {locations.map((marker, index) => (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            key={index}>
            <Markers item={marker} />
          </Marker>
        ))} */}
            {/* <Heatmap points={locations1} radius={50} /> */}
          </MapView>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            mapType="standard"
            region={{
              // latitude: 24.8317098,
              // longitude: 67.00210948,
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}>
              <Markers item={userLocation.markerImage} />
            </Marker>
            {/* {locations.map((marker, index) => (
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          key={index}>
          <Markers item={marker} />
        </Marker>
      ))} */}
            {/* <Heatmap points={locations1} radius={50} /> */}
          </MapView>
        )}
        <BottomSheet
          ref={Bs}
          snapPoints={['95%', '35%']}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
          borderRadius={10}
          renderContent={renderContent}
          enabledContentTapInteraction={true}
          enabledContentTapInteraction={false}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Expansion;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  filterView: {
    position: 'absolute',
    top: 75,
    right: 10,
    zIndex: 500,
    height: 250,
    width: 180,
    backgroundColor: '#1A1A1A',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  fiterHeaderText: {
    color: '#999',
    textAlign: 'center',
  },
  bottomSheetBtn: {
    position: 'absolute',
    top: 130,
    left: 20,
    zIndex: 100,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#eee',
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// gradient={{colors: ['#f68128', '#feee3e']}}

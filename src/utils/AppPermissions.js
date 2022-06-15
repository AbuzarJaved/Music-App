import {Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import {useDispatch, useSelector} from 'react-redux';
import {LOCATION_PERMISSION_GRANTED} from '../redux/constants';

// PERMISSIONS
// LOCATION
const PLATFORM_LOCATION_PERMISSION = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};
// PHOTO
const PLATFORM_CAMERA_PERMISSIONS = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
};
const REQUEST_PERMISSION_TYPE = {
  location: PLATFORM_LOCATION_PERMISSION,
  camera: PLATFORM_CAMERA_PERMISSIONS,
};
const PERMISSION_TYPE = {
  location: 'location',
  camera: 'camera',
};

class AppPermission {
  checkPermission = async type => {
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return this.requestPermission(permissions);
    } catch (error) {
      return false;
    }
  };

  requestPermission = async () => {
    try {
      const result = await request(permissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };
}

const Permission = new AppPermission();

const requestLocation = async () => {
  // const dispatch = useDispatch();
  if (Platform.OS === 'ios') {
    const checkPermissionIOS = await check(
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE || PERMISSIONS.IOS.LOCATION_ALWAYS,
    );
    if (checkPermissionIOS !== RESULTS.GRANTED) {
      const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (granted === RESULTS.GRANTED) {
        // alert("You've access for the location");
        // dispatch({type: LOCATION_PERMISSION_GRANTED});
        console.log("You've access for the location");
      } else {
        alert("You don't have access for the location");
      }
    }
  } else if (Platform.OS === 'android') {
    const checkLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (checkLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      // alert("You've access for the location");
      // dispatch({type: LOCATION_PERMISSION_GRANTED});
      console.log("You've access for the location");
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: ' Location permission',
            message:
              'Napollo Music requires  Location permission in order to get device location ' +
              'Please grant us, In order to use the apps full functionality',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // alert("You've access for the location");
          // dispatch({type: LOCATION_PERMISSION_GRANTED});
          console.log("You've access for the location");
        } else {
          alert("You don't have access for the location");
        }
      } catch (err) {
        alert(err);
      }
    }
  }
};

export {Permission, PERMISSION_TYPE, requestLocation};

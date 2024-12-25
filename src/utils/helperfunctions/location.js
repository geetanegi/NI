import {Platform, PermissionsAndroid, Alert, Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {store} from '../../redux/store';
import {setLocation} from '../../redux/reducers/location';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    return await checkAndEnableGPS();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return await checkAndEnableGPS();
      } else {
        return {isSuccuss: false, granted: granted, showPopup: true};
      }
    } catch (err) {
      console.warn(err);
      return {isSuccuss: false, showPopup: false};
    }
  }
};

function checkAndEnableGPS() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('GPS is enabled');
        store.dispatch(setLocation(position.coords));
        resolve({isSuccuss: true, granted: true, showPopup: false});
      },
      error => {
        console.log('GPS is not enabled', error);
        resolve(renderPermissionStatus(error));
      },
      {enableHighAccuracy: true, timeout: 40000, maximumAge: 1000},
    );
  });
}

const renderPermissionStatus = err => {
  if (err.code == 1) {
    console.log('permission denied', err.code);
    return {isSuccuss: false, granted: false, showPopup: true};
  } else if (err.code == 2) {
    console.log('GPS off', err.code);
    return {isSuccuss: false, granted: true, showPopup: true};
  } else if (err.code == 3) {
    console.log('time out', err.code);
    return {isSuccuss: false, showPopup: false};
  } else {
    console.log('unknown error', err.code);
    return {isSuccuss: false, showPopup: false};
  }
};

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {environment} from '../utils/constant';
import PopUpMessage from '../components/popup';
import {requestLocationPermission} from '../utils/helperfunctions/location';
import {Platform, PermissionsAndroid, Alert, Linking} from 'react-native';

const LocationSession = ({goBackHandle}) => {
  console.log('rendering LocationSession of location');
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState();
  const [subtitle, setSubTitle] = useState();
  const [Button1Name, setButton1Name] = useState();
  const [popupCallBack, setPopupCallBack] = useState(null);

  useEffect(() => {
    checkLocation();
  }, []);

  const openSettings = () => {
    Linking.openSettings();
  };

  const showGrantPermissionPopup = () => {
    openPopup(
      'Location Permission Required',
      'App needs access to your location to fill the checklist. Please go to app settings and grant permission.',
      true,
      'Open setting',
      () => {
        return () => {
          openSettings();
        };
      },
    );
  };

  const checkLocation = async () => {
    const {isSuccuss, granted, showPopup} = await requestLocationPermission();
    console.log({isSuccuss, granted, showPopup});

    if (showPopup) {
      if (
        granted === PermissionsAndroid.RESULTS.DENIED ||
        granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      )
        showGrantPermissionPopup();
      else {
        openPopup(
          Platform.OS == 'android' ? 'Enable GPS' : 'Enable Location Services',
          Platform.OS == 'android'
            ? 'Please enable GPS in your device settings to use this feature.'
            : 'Please enable Location Services for this app in your device settings to use this feature.',
          true,
          'Continue',
          () => {
            return () => {
              hidePopup();
              checkLocation();
            };
          },
        );
      }
    } else {
      hidePopup();
    }
  };

  useEffect(() => {
    let interval = environment.checkLocationSessionInterval;

    if (showPopup) interval = 2000;

    const intervalId = setInterval(checkLocation, interval);
    return () => clearInterval(intervalId);
  }, [showPopup]);

  const openPopup = (title, subtitle, visibility, button1Name, callback) => {
    setTitle(title);
    setSubTitle(subtitle);
    setShowPopup(visibility);
    setPopupCallBack(callback);
    setButton1Name(button1Name);
  };

  const hidePopup = () => {
    setTitle('');
    setSubTitle('');
    setShowPopup(false);
  };

  const OnCancleClick = async () => {
    hidePopup();
    if (typeof popupCallBack === 'function') popupCallBack();
  };

  return (
    <PopUpMessage
      display={showPopup}
      titleMsg={title}
      subTitle={subtitle}
      onModalClick={OnCancleClick}
      onPressNoBtn={goBackHandle}
      twoButton={true}
      Button2Name={'Go Back'}
      Button1Name={Button1Name}
    />
  );
};

export default LocationSession;

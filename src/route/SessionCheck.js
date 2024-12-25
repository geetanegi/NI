import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {getTokenData} from '../utils/apicalls/tokenApi';
import {environment} from '../utils/constant';
import {isUserLoggedIn} from '../redux/store/getState';
import PopUpMessage from '../components/popup';
import {cleanLogindata} from '../redux/reducers/Logindata';
import {clearLogin} from '../redux/reducers/Login';
import {getAuth} from '../utils/apicalls/getApi';
import {API} from '../utils/endpoints';
import {useDispatch} from 'react-redux';

const SessionCheck = () => {
  // console.log('rendering SessionCheck');
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const [isPaused, setIsPaused] = useState(false);

  const checkSessionState = async (isFirstLoad = false) => {
    console.log('checkSessionState invoked');
    const netInfoState = await NetInfo.fetch();
    if (isUserLoggedIn() && netInfoState.isConnected) {
      const data = await getTokenData();
      if (data?.refreshToken) {
        getAuth(API.CHECK_SESSION)
          .then(() => {
            console.log('CHECK_SESSION response Success');
          })
          .catch(err => {
            console.log('CHECK_SESSION catch', err);
            if (err.status === 401) {
              if (isFirstLoad) gotToLogin();
              openPopup();
            }
          });
      } else {
        console.log('checkSessionState getTokenData data', data);
        if (isFirstLoad) gotToLogin();
        openPopup();
      }
    } else {
      console.log(
        'checkSessionState isUserLoggedIn() && netInfoState.isConnected',
        isUserLoggedIn(),
        netInfoState.isConnected,
      );
    }
  };

  useEffect(() => {
    checkSessionState(true);
  }, []);

  useEffect(() => {
    let intervalId;
    console.log('useEffect isPaused', isPaused);
    if (!isPaused) {
      intervalId = setInterval(
        checkSessionState,
        environment.checkSessionInterval,
      );
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const openPopup = () => {
    setShowPopup(true);
    setIsPaused(true);
  };
  const hidePopup = () => {
    setShowPopup(false);
    setIsPaused(false);
  };
  const gotToLogin = async () => {
    try {
      dispatch(cleanLogindata());
      dispatch(clearLogin());
    } catch (error) {}
  };

  return (
    <PopUpMessage
      display={showPopup}
      titleMsg="Session Expired"
      subTitle="Your session has expired, please login again to continue."
      twoButton={true}
      Button1Name="Login"
      Button2Name="Cancel"
      onModalClick={gotToLogin}
      onPressNoBtn={hidePopup}
    />
  );
};

export default SessionCheck;

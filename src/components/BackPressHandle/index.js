import {BackHandler} from 'react-native';
import React,{ useEffect } from 'react';

function HandleBackPress() {
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); 
  }, []);
}

export default HandleBackPress;
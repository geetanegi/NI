import {View, ImageBackground} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import {images} from '../../../global/theme';

const Splash = () => {
  return (
    <ImageBackground
      source={images.SplashScreen}
      resizeMode={'stretch'}
      style={st.flex}
    />
  );
};

export default Splash;

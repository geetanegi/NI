import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {images} from '../../global/theme';

const MansaImg = () => {
  return (
    <View>
      <Image source={images.logoni} style={{width:'100%'}} />
    </View>
  );
};

export default MansaImg;

const styles = StyleSheet.create({});

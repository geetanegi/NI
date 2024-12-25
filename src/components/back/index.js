import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, images} from '../../global/theme';
import Icon from 'react-native-vector-icons/Feather';
const Back = ({onPress = () => {}, iconColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width: 30}}>
      <Icon
        name={'chevron-left'}
        size={25}
        color={iconColor ? iconColor : colors.white}
      />
    </TouchableOpacity>
  );
};

export default Back;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {colors} from '../../global/theme';
import st from '../../global/styles';

const Button = ({
  title,
  backgroundColor,
  color,
  txtSize,
  onPress = () => {},
  disabled,
  buttonExtendedStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        {
          borderRadius: 8,
          marginTop: 15,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 25,
          paddingVertical: 10,
          //height: 40,
          backgroundColor: backgroundColor ? backgroundColor : colors.white,
          borderWidth: 0.5,
          borderColor: colors.lightText,
          elevation: Platform.OS == 'android' ? 1 : null,
          shadowColor: colors.black,
          shadowOpacity: 0.3,
          shadowOffset: {width: 0, height: 0.5},
          shadowRadius: 8,
        },
        buttonExtendedStyle,
      ]}>
      <Text
        style={[
          st.btntxt,
          {
            color: color ? color : colors.blue,
            fontSize: txtSize ? txtSize : 14,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});

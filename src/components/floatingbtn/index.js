import {StyleSheet, Text, View, TouchableOpacity, Platform, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../global/theme';

const FloatingButton = ({onPress}) => {
  return (
    <Pressable
      onPress={()=>onPress()}
      style={styles.btn}>
      <Icon name={'plus'} size={30} color={colors.white} />
    </Pressable>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
    btn:{
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.lightFrozy,
        elevation: Platform.OS == 'android' ? 1 : 0,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 1,
        shadowRadius: 50,
        borderWidth: 0.5,
        borderColor: colors.lightText,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }
});

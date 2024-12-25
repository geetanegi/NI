import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images, colors} from '../../global/theme';
import Icon from 'react-native-vector-icons/Octicons';
import st from '../../global/styles';
import {useDispatch, useSelector} from 'react-redux';
import {clearLogin} from '../../redux/reducers/Login';

const Header = ({navigation}) => {
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.headersty}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={images.menu}
          style={{width: 20, height: 20, tintColor: 'black'}}
        />
      </TouchableOpacity>

      <View style={st.ml_15}>
        <Text style={[st.tx16]}>Home</Text>
      </View>
      {/* <View style={[st.row, st.align_E]}>
        <TouchableOpacity
          onPress={() => {
            dispatch(clearLogin());
          }}>
          <Icon
            name={'sign-out'}
            size={20}
            color={colors.logogreen}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headersty: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.7,
    borderBottomColor: colors.grey,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0.3},
  },
});

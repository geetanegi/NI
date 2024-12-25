import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { images, colors } from '../../global/theme';
import Icon from 'react-native-vector-icons/Octicons';
import st from '../../global/styles';
import { useDispatch, useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { clearAdminLogin } from '../../redux/reducers/Adminlogin';
import { clearAdminFlow } from '../../redux/reducers/Adminflow';
import LinearGradient from 'react-native-linear-gradient';

const Header = ({ navigation }) => {
  const [lang, setLang] = useState('');
  const dispatch = useDispatch();


  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.lightFrozy, colors.frozy]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 40,
          paddingHorizontal: 15,
          paddingBottom: 15,
        }}>
        <TouchableOpacity onPress={toggleDrawer}>
          <IonIcons name={'ios-filter'} size={25} color={colors.white} />
        </TouchableOpacity>
        <View style={[st.row, st.align_C]}>
          <TouchableOpacity
            onPress={() => {
              dispatch(clearAdminLogin());
              dispatch(clearAdminFlow());
            }}>
            <Icon
              name={'sign-out'}
              size={20}
              color={colors.black}
            // style={{marginRight: 20}}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              if (lang == 'hi') {
                updateLangInStorage('en');
                setLang('en');
              }
              if (lang == 'en') {
                updateLangInStorage('hi');
                setLang('hi');
              }
            }}>
            <Entypo name={'language'} size={20} color={colors.black} />
          </TouchableOpacity> */}
        </View>
      </View>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({});

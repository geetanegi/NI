import {StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';
import Button from '../../../components/button';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native-animatable';

const SelectLanguage = ({navigation}) => {
  const [selectedLang, setSelectedLang] = useState('en');

  const dispatch = useDispatch();


  return (
    <View style={st.container}>
      <View style={[st.pd20, st.flex]}>
        <View style={st.center} animation={'fadeInRight'} delay={500}>
          <View style={st.align_C}>
            <Image source={images.lotus} style={[st.lotus_sty]} />
          </View>
        </View>

        {/* <Button
          title={'हिंदी'}
          txtSize={16}
          backgroundColor={
            selectedLang == 'hi' ? colors.lightBlue : colors.white
          }
          color={selectedLang != 'hi' ? colors.blue : colors.white}
          onPress={() => {
            setSelectedLang('hi');
            updateLangInStorage('hi');
            navigation.navigate('Login');
            dispatch(setOnBoarding(true));
          }}
        /> */}
        <View animation={'fadeInRight'} delay={1000}>
          <Button
            title={'English'}
            backgroundColor={
              selectedLang == 'en' ? colors.lightBlue : colors.white
            }
            color={selectedLang != 'en' ? colors.blue : colors.white}
            onPress={() => {
              setSelectedLang('en');
              updateLangInStorage('en');
              navigation.navigate('Login');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({});

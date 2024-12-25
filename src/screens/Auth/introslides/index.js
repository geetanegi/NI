import {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackActions} from '@react-navigation/native';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';
import { View } from 'react-native-animatable';

const IntroSlides = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = null;
    if (isLoading) {
      timer = setTimeout(() => {
        navigation.dispatch(StackActions.replace('Slide3'));
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  return (
    <TouchableHighlight
      onPress={() => {
        setIsLoading(false);
        navigation.dispatch(StackActions.replace('Slide3'));
      }}
      style={st.container}>
      <View style={st.container}>
        <View style={[st.pd20, st.flex]}>
          <View style={[st.center]} animation={'fadeInRight'} delay={1000}>
            <Image source={images.logoni} style={st.lotus_sty} />
            <View style={{marginTop: '8%'}}>
              <Text style={[st.tx20, st.txAlignC]}>
                Nutrition International
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.bottom_foo]}>
          <View style={styles.dot}></View>
          <View style={[styles.dot, {backgroundColor: '#fff'}]}></View>
          <View style={styles.dot}></View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default IntroSlides;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10,
  },
  bottom_foo: {
    position: 'absolute',
    bottom: 20,
    left: '45%',
    flexDirection: 'row',
  },
});

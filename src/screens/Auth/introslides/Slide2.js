import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React, {useEffect} from 'react';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';

const Slide2 = ({navigation}) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.dispatch(StackActions.replace('Slide3'));
  //   }, 5000);
  // }, [navigation]);

  return (
    <ImageBackground style={st.flex} source={images.bg_img}>
      <View style={[st.pd20]}>
        <View style={[st.align_C]}>
          <Image source={images.lotus} style={st.lotus_sty_intro} />
        </View>
        <View style={[st.align_C]}>
          <Image
            source={images.logo_txt}
            style={[st.logoSty, {marginTop: -20}]}
          />
        </View>
        <View style={[st.seprator, {marginTop: -20}]}></View>
        <Text style={[st.tx20, st.txUpr, st.txAlignC, st.mt_t10]}>
          The Mind Mirror
        </Text>

        <View style={[st.align_C, {marginTop: '15%'}]}>
          <Text style={[st.tx20, st.txAlignC]}>
            Not until we are lost do we {'\n'} begin to understand ourselves.
          </Text>
        </View>
      </View>

      <View style={[styles.bottom_foo]}>
        <View style={styles.dot}></View>
        <View style={styles.dot}></View>
        <View style={[styles.dot, {backgroundColor: '#fff'}]}></View>
      </View>
    </ImageBackground>
  );
};

export default Slide2;

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

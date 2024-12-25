import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {images, colors} from '../../global/theme';
import st from '../../global/styles';

const Footer = () => {
  return (
    <View style={styles.footer_sty}>
      <View style={[st.row,st.align_C, st.mt_t10]}>
        <View style={st.wdh15}>
        <Image source={images.satya} style={{width:55, height:55}} />
        </View>
        <View style={st.wdh65}>
        <Text style={[st.tx14, st.txAlignC]}>{'Footer_txt'}</Text>
        </View>
        <View style={st.wdh20}>
        <Image source={images.footer_logo} style={st.fotr_logoSty} />
        </View>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer_sty: {
    backgroundColor: colors.blue,
    height: 67,
    paddingHorizontal: 15,
  },
});

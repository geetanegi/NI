import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import Icons from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../global/theme';
const EmptyItem = ({txColor, title}) => {
  return (
    <View style={[st.center, {marginTop: '50%'}, st.row]}>
      <Icons color={colors.lightgrey} name="exclamation-circle" size={40} />
      <Text style={[st.tx14No, st.ml_15, {color: colors.lightgrey}]}>
        {title ? title : 'No checklist to view'}
      </Text>
    </View>
  );
};

export default EmptyItem;

const styles = StyleSheet.create({});

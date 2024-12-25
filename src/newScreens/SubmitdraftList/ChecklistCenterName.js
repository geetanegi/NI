import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import st from '../../global/styles';
const ChecklistCenterName = ({
  CenterTypeDisplayName,
  CenterName,
  IsHighlighted,
  getCenterNameColor,
}) => {
  const getchecklistname = CenterTypeDisplayName => {
    return 'Will get data in api...';
  };
  return (
    <View style={[st.row, st.justify_S]}>
      <Text style={st.tx14}>
        {CenterTypeDisplayName}:{' '}
          {CenterName}
      </Text>
    </View>
  );
};
export default ChecklistCenterName;

const styles = StyleSheet.create({});

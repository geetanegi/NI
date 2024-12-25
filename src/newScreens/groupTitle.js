import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import st from '../global/styles';
import {colors} from '../global/theme';
import Button from '../components/button';

const GroupTitle = ({title, showAddButton, onAddClick, index}) => {
  console.log('rendering GroupTitle');
  return (
    <View style={[st.row, st.align_C, st.mt_t10]}>
      <View style={[showAddButton ? st.wdh70 : null,st.row]}>
        <Text style={[st.tx14_B, st.txCap, {color: colors.indian_red}]}>
          {index}
        </Text>
        <Text style={[st.tx14_B, st.txCap, {color: colors.indian_red},{ textTransform: 'none'}]}>
          . {title}
        </Text>
      </View>
      <View style={{}}>
        {showAddButton && (
          <Button
            title={'+ Add'}
            onPress={() => onAddClick()}
            color={colors.white}
            backgroundColor={colors.indian_red}
            buttonExtendedStyle={st.mt_B}
          />
        )}
      </View>
    </View>
  );
};

export default GroupTitle;

const styles = StyleSheet.create({});

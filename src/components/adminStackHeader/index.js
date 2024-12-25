import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Back from '../back';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../global/theme';
import st from '../../global/styles';
import Icon from 'react-native-vector-icons/Feather';
const AdminStackHeader = ({title, goBack, gotoHome}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={[colors.lightFrozy, colors.frozy]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 40,
          paddingHorizontal: 15,
          paddingBottom: 15,
        }}>
        <Back onPress={goBack} />
        <Text style={st.tx16}>{title}</Text>
        <TouchableOpacity onPress={gotoHome}
          style={{
            width: 35,
            height: 35,
            borderRadius: 50,
            backgroundColor: colors.lightFrozy,
            justifyContent:"center",
            alignItems:"center"
          }}>
          <Icon name={'home'} size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AdminStackHeader;

const styles = StyleSheet.create({});

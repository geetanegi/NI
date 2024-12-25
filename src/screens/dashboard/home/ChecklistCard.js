import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import Icons from 'react-native-vector-icons/Entypo';
import {colors, images} from '../../../global/theme';
import LinearGradient from 'react-native-linear-gradient';

const ChecklistCard = ({checklistKey, title, cardindex, gotoEditScreen}) => {
  return (
    <TouchableOpacity
      key={checklistKey}
      cardindex={cardindex}
      onPress={gotoEditScreen}
      style={{marginBottom: 5}}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={[title.Color1, title.Color2]}
        style={[st.animatedCir_1, {borderWidth: 0}]}>
        <View style={st.wdh80}>
          <View style={[st.row, st.align_C]}>
            <Image style={[st.homeimage]} source={images[title?.Enum]} />
            <Text style={[st.tx16, {color: colors.white}]} numberOfLines={1}>
              {title?.Checklist}
            </Text>
          </View>
        </View>
        <View style={[st.wdh20, st.align_E]}>
          <Icons
            color={colors.white}
            name="chevron-right"
            size={22}
            style={[st.justify_A]}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default ChecklistCard;
const styles = StyleSheet.create({});

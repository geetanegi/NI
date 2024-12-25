import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {openDialScreen} from '../../utils/helperfunctions/functions';
import st from '../../global/styles';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../global/theme';
const DialText = ({gradient}) => {
  return (
    <View>
      {gradient != false ? (
        <LinearGradient
          style={st.contact_footer}
          colors={[colors.circle_2, colors.circle_1]}>
          <View style={[st.row, st.align_C]}>
            <Icon
              name={'phone'}
              size={23}
              color={colors.white}
              style={st.mh_10}
            />
            <Text style={[st.tx14, st.txAlignL, st.mr_10]}>
            In case you are facing mental or emotional problems please contact our toll free tele manas number{' '}
              <Text
                style={st.txDecor}
                onPress={() => openDialScreen(18008914416)}>
                1800-891-4416
              </Text>{' '}
              OR{' '}
              <Text style={st.txDecor} onPress={() => openDialScreen(14416)}>
                14416
              </Text>{' '}
              to talk with our mental health professional.
            </Text>
          </View>
        </LinearGradient>
      ) : (
        <View
          style={[
            {
              backgroundColor: colors.blue,
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: colors.white,
              borderRadius: 10,
              alignItems: 'center',
            },
          ]}
          // colors={[colors.circle_2, colors.circle_1]}
        >
          <View>
            <Text style={[st.btntxt, st.txAlignJ, {color: '#fff'}]}>
              In case you are facing mental & emotional problems, please call{' '}
              <Text
                style={st.txDecor}
                onPress={() => openDialScreen(18008914416)}>
                1800-891-4416
              </Text>{' '}
              OR{' '}
              <Text style={st.txDecor} onPress={() => openDialScreen(14416)}>
                14416
              </Text>{' '}
              to get 24x7 free counseling services'
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DialText;

const styles = StyleSheet.create({});

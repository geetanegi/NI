import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../global/styles';
import {colors} from '../../global/theme';
import {openDialScreen} from '../../utils/helperfunctions/functions';

const onModalClick = (value, props) => {
  props.onModalClick(value);
};

const PopUpMessage = props => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={props.display}>
        <View activeOpacity={1} style={st.center}>
          <View style={styles.modalView}>
            <View
              style={[
                st.align_C,
                st.justify_C,
                {
                  backgroundColor: colors.indian_red,
                  height: 60,
                  width: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}>
              <Text style={[st.tx18, st.txAlignC, {color: colors.white}]}>
                {props.titleMsg}
              </Text>
            </View>
            <View style={st.pd20}>
              <Text style={[st.tx14, st.txAlignC]}>{props.subTitle} </Text>

              <View style={[st.row, st.justify_E]}>
                <TouchableOpacity
                  style={[styles.buttonView]}
                  onPress={() => {
                    onModalClick(false, props);
                  }}>
                  <Text style={[st.tx18, {color: colors.white}]}>
                    {props?.twoButton
                      ? props?.Button1Name || 'Yes'
                      : props?.Button1Name || 'Okay'}
                  </Text>
                </TouchableOpacity>
                {props?.twoButton && (
                  <TouchableOpacity
                    style={[styles.buttonView, styles.button2]}
                    onPress={() => {
                      props.onPressNoBtn();
                    }}>
                    <Text style={[st.tx18, {color: colors.white}]}>
                      {props.Button2Name || 'No'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopUpMessage;

const styles = StyleSheet.create({
  buttonView: {
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // width: '45%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.indian_red,
    marginTop: 20,
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
  },
  scorebox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.warning,
  },
  button2: {
    // backgroundColor: colors.logogreen,
  },
});

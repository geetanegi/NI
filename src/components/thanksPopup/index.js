import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../global/styles';
import {colors} from '../../global/theme';
import Icon from 'react-native-vector-icons/AntDesign';
const onModalClick = (value, props) => {
  props.onModalClick(value);
};

const PopUpMessage = props => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={props.display}>
        <View activeOpacity={1} style={st.center}>
          <View style={styles.modalView}>
            <View style={[st.align_C, st.justify_C]}>
              <Icon
                name={'exclamationcircleo'}
                size={100}
                color={colors.blue}
              />
              <Text
                style={[
                  st.tx18,
                  st.txAlignC,
                  st.mt_t10,
                  {color: colors.black},
                ]}>
                {props.titleMsg}
              </Text>
            </View>
            <View style={st.pd20}>
              <View>
                <TouchableOpacity
                  style={[styles.buttonView, {backgroundColor: colors.blue}]}
                  onPress={() => {
                    onModalClick(false, props);
                  }}>
                  <Text style={[st.tx18, {color: colors.white}]}>
                    {'Thanks'}
                  </Text>
                </TouchableOpacity>
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
    backgroundColor: '#fff',
    // marginTop: 20,
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
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
});

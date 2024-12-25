import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import st from '../../global/styles';
import {colors} from '../../global/theme';

const PopUpMessage = ({
  display,
  titleMsg,
  subTitle,
  onModalClick,
  onPress_api,
  dialogColor,
}) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={display}>
        <View style={st.center}>
          <View style={styles.modalView}>
            <View
              style={[
                st.align_C,
                st.justify_C,
                {
                  backgroundColor: dialogColor
                    ? dialogColor
                    : colors.lightFrozy,
                  height: 60,
                  width: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}>
              <Text style={[st.tx18, st.txAlignC]}>{titleMsg}</Text>
            </View>
            <View style={st.pd20}>
              <View style={[st.mt_t10, st.align_C]}>
                <View>
                  <Text style={[st.tx16, st.txAlignC, {color: colors.black}]}>
                    {subTitle}
                  </Text>
                </View>
              </View>

              <View style={[st.row, st.justify_S]}>
                <TouchableOpacity
                  style={[
                    styles.buttonView,
                    {
                      backgroundColor: dialogColor
                        ? dialogColor
                        : colors.lightFrozy,
                    },
                  ]}
                  onPress={() => {
                    onModalClick(false);
                  }}>
                  <Text style={[st.tx18]}>{'No'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.buttonView,
                    {
                      backgroundColor: dialogColor
                        ? dialogColor
                        : colors.lightFrozy,
                    },
                  ]}
                  onPress={() => {
                    if (onPress_api) {
                      onModalClick(false);
                      onPress_api();
                    } else {
                      onModalClick(false);
                    }
                  }}>
                  <Text style={[st.tx18, {color: colors.white}]}>
                    {'Yes'}
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
    elevation: Platform.OS == 'android' ? 2 : 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: Platform.OS == 'android' ? 5 : 0,
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

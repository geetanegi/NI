import {
  Modal,
  StyleSheet,
  Platform,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import {colors} from '../../global/theme';
const {width} = Dimensions.get('window');

const Loader = ({visible, onBackdropPress, onRequestClose}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onBackdropPress={onBackdropPress}
    onRequestClose={onRequestClose}>
    <View style={styles.center}>
      <View style={styles.modalView}>
        <ActivityIndicator  size="large" color="#002C6D" />
        {/* <BallIndicator color={colors.blue} size={30} /> */}
      </View>
    </View>
   </Modal>
);

export default Loader;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.2,
    shadowRadius: 4,
    elevation: Platform.OS == 'android' ? 5 : 0,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
});

import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../../global/theme';

const Alert = ({showModal, setShowModal, children, onClosePress, height}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      style={[styles.center]}
      onBackdropPress={() => setShowModal(!showModal)}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}>
      <View style={[styles.center]}>
        <View style={[styles.modalView,{height:height}]}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
              if (onClosePress) {
                onClosePress();
              }
            }}
            style={styles.closeIconCont}>
            <Icon
              name="closecircle"
              color={colors.lightFrozy}
              size={25}
              style={styles.closeIcon}
            />
          </TouchableOpacity>

          {children}
        </View>
      </View>
    </Modal>
  );
};

export default Alert;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 15,
    // marginTop: Dimensions.get('window').height * 0.3,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0.5},
    shadowRadius: 0.5,
    elevation: Platform.OS == 'android' ? 1 : 0,
  },
  closeIconCont: {
    alignItems: 'flex-end',
  },
  closeIcon: {
    marginTop: 20,
    marginRight: 20,
  },

  btn: {
    marginTop: 20,
    width: '70%',
  },
});

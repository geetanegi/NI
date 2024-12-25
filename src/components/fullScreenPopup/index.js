import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {colors} from '../../global/theme';
import Button from '../button';
import st from '../../global/styles';
const Popup = ({visible, title, onClose, onSave, children}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={st.tx14_B}>{title}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {children}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                title="Save"
                onPress={onSave}
                color={colors.white}
                backgroundColor={colors.indian_red}
              />
              <Button
                style={styles.button}
                title="Cancel"
                onPress={onClose}
                color={colors.white}
                backgroundColor={colors.indian_red}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // elevation: 5,
    backgroundColor: colors.grey,
  },
  header: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 60, // Adjust for button height
    backgroundColor: colors.grey,
  },
  footer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    width: '100%',
    padding: 15,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 100,
  },
});

export default Popup;

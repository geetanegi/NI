import {StyleSheet, Text, View, Pressable, Linking} from 'react-native';
import React from 'react';
import styles from '../../global/styles';
import { environment } from '../../utils/constant';

const PrivacyPolicy = () => {
  const openPrivacyPolicy = () => {
    Linking.openURL(environment.Privacy_policy);
  };
  return (
    <Pressable onPress={() => openPrivacyPolicy()}>
      <Text style={styles.privacyTxt}>Privacy Policy</Text>
    </Pressable>
  );
};

export default PrivacyPolicy;


import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import st from '../../global/styles';
import { colors } from '../../global/theme';
const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <View style={{backgroundColor: colors.indian_red, padding: 5}}>
        <Text style={[st.tx14, st.txAlignC, st.txbold, {letterSpacing: 1, color:colors.white}]}>
          No Internet Connection
        </Text>
      </View>
    );
  }

  return null;
};

export default NetworkStatus;

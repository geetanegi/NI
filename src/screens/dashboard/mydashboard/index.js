import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import st from '../../../global/styles';
import {WebView} from 'react-native-webview';
import {environment} from '../../../utils/constant';
import Loader from '../../../components/loader';

const MyDashboard = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={st.flex}>
      <AuthHeader
        title={'Dashboard'}
        onBack={() => navigation.navigate('Dashboard')}
      />
      <WebView
        source={{
          uri: environment.dashboard,
        }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={e => console.log('error', e)}
      />
      {isLoading && <Loader />}
    </View>
  );
};

export default MyDashboard;


import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import AuthHeader from '../../../components/Auth_Header';
import {API} from '../../../utils/endpoints';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import DeviceInfo from 'react-native-device-info';
import {colors} from '../../../global/theme';
import {getNoAuth} from '../../../utils/apicalls/getApi';

const VersionApp = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [appVer, setAppVer] = useState();

  const versionHandle = async () => {
    try {
      setIsLoading(true);
      getNoAuth(API.VERSION)
        .then(data => {
          setData(data);
        })
        .catch(err => {
          throw err;
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.log('versionHandle catch', err);
      setIsLoading(false);
    }
  };

  const fetchAppVersion = async () => {
    try {
      const version = await DeviceInfo.getVersion();
      setAppVer(version);
    } catch (error) {
      console.error('Error getting app version:', error);
    }
  };

  useEffect(() => {
    versionHandle();
    fetchAppVersion();
  }, []);

  return (
    <View style={st.container}>
      <AuthHeader
        title={`App Version`}
        onBack={() => navigation.navigate('Main')}
      />

      <View style={[st.align_C, st.justify_C, st.flex]}>
        <Text style={st.tx14_B}>
          Api Version:{' '}
          <Text style={st.tx14}>
            {data?.apiVersion}
            {'\n'}
          </Text>
        </Text>
        <Text style={st.tx14_B}>
          App Version: <Text style={st.tx14}>{appVer}</Text>
        </Text>
      </View>

      <View style={{backgroundColor:colors.indian_red}}>
        <Text style={[st.tx12, st.txAlignC, st.pd10,{color:colors.white}]}>{data?.message}</Text>
      </View>

      {isLoading && <Loader />}
    </View>
  );
};

export default VersionApp;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import AuthHeader from '../../../components/Auth_Header';
import st from '../../../global/styles';

const ViewPdf = ({navigation, route}) => {
  const url = route?.params?.url;

  const source = {
    uri: url,
    cache: true,
  };

  return (
    <View style={st.flex}>
      <AuthHeader title={''} onBack={() => navigation.goBack()} auth={true} />
      <Pdf
        source={source}
        trustAllCerts={Platform.OS === 'ios'}
        onLoadComplete={(numberOfPages, filePath) => {}}
        onPageChanged={(page, numberOfPages) => {}}
        onError={error => {
          // alert(error);
        }}
        onPressLink={uri => {}}
        style={styles.pdf}
      />
    </View>
  );
};

export default ViewPdf;

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

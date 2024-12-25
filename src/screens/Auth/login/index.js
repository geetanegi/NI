import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  Linking,
} from 'react-native';

import React, {useState, useRef, useEffect} from 'react';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';
import Button from '../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../../../redux/reducers/Login';
import MansaImg from '../../../components/mansa';
import {API} from '../../../utils/endpoints';
import Loader from '../../../components/loader';
import {
  ValidateMobile,
  ValueEmpty,
  ValidatePassword,
} from '../../../utils/helperfunctions/validations';
import {View} from 'react-native-animatable';
import AdminInput from '../../../components/adminInput';
import DeviceInfo from 'react-native-device-info';
import {setLogindata} from '../../../redux/reducers/Logindata';
import PopUpMessage from '../../../components/popup';
import {onLogin} from '../../../utils/helperfunctions/tiggerfunction';
import {requestLocationPermission} from '../../../utils/helperfunctions/location';
import {postNoAuth} from '../../../utils/apicalls/postApi';
import {storeTokenData} from '../../../utils/apicalls/tokenApi';
import useNetworkStatus from '../../../hooks/networkStatus';
import {environment} from '../../../utils/constant';
import PrivacyPolicy from '../../../components/PrivacyPolicy';

const INITIALINPUT = {
  userNumber: '',
};

const Login = ({navigation}) => {
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [myDeviceInfo, setMyDeviceInfo] = useState('');
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState('');
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [warning, setWarning] = useState(false);
  const isConnected = useNetworkStatus();
  const feedbackUrl = environment.feedbackUrl; 
  const beneficiaryRegistration= environment.BeneficiaryRegistration;

  const dispatch = useDispatch();

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const feedbackformRedirect = () => {
    Linking.openURL(feedbackUrl);
  };

  const BeneficiaryformRedirect = () => {
    Linking.openURL(beneficiaryRegistration);
  };
  
  const validation = () => {
    Keyboard.dismiss();
    const validNumber = ValidateMobile(inputs?.userNumber);
    let isValid = true;

    const emptyPassword = ValueEmpty(inputs?.password);
    const validPassword = ValidatePassword(inputs?.password);

    if (validNumber != 'success') {
      handleError(validNumber, 'userNumber');
      isValid = false;
    } else {
      handleError('', 'userNumber');
    }
    if (emptyPassword) {
      handleError('*Required', 'password');
      isValid = false;
    } else {
      if (validPassword == 'success') {
        handleError('', 'password');
      } else {
        handleError(validPassword, 'password');
        isValid = false;
      }
    }
    if (isValid) {
      handleSubmitPress();
    }
  };

  const onPopupMessageModalClick = value => {
    if (warning == true) {
      handleSubmitPress();
      setPopupMessageVisibility(value);
    } else {
      setPopupMessageVisibility(value);
    }
  };

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        twoButton={warning ? true : false}
        onPressNoBtn={() => {
          setWarning(false);
          setPopupMessageVisibility(false);
        }}
      />
    );
  };

  const handleSubmitPress = async () => {
    const url = API.LOGIN_AUTH;
    const params = {
      phoneNumber: inputs?.userNumber,
      password: inputs?.password,
      deviceId: myDeviceInfo.deviceId,
      deviceName: myDeviceInfo.deviceName,
      isOverrideMultipleDeviceWarning: warning,
    };
    setIsLoading(true);
    postNoAuth(url, params)
      .then(result => {
        //console.log('LOGIN_AUTH response then', result);
        setIsLoading(false);
        storeTokenData(result);
        dispatch(setLogindata(result));
        dispatch(setLogin(true));
        setWarning(false);
        onLogin();
      })
      .catch(err => {
        //console.log('LOGIN_AUTH catch', err);
        setIsLoading(false);
        if (err?.status === 303) {
          setTitle('Warning!');
          setWarning(true);
        } else {
          setTitle('Oops!');
          setWarning(false);
        }
        setSubtitle(err?.message);
        setPopupMessageVisibility(true);
      })
      .finally(() => {
        //console.log('LOGIN_AUTH finally');
        setIsLoading(false);
      });
  };

  const getInfoHandle = async () => {
    let deviceId = DeviceInfo.getDeviceId();
    const deviceName = await DeviceInfo.getDeviceName();
    const data = {
      deviceId,
      deviceName,
    };
    setMyDeviceInfo(data);
    await requestLocationPermission();
  };

  useEffect(() => {
    getInfoHandle();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[st.container]}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <MansaImg />

        <View style={st.pd_H20}>
          <View style={[st.cardsty, st.shadowProp]}>
            <View style={st.mt_t10}>
              <AdminInput
                placeholder={'Enter Mobile Number'}
                onChangeText={text => handleOnchange(text, 'userNumber')}
                onFocus={() => handleError(null, 'userNumber')}
                error={errors?.userNumber}
                iconName={'smartphone'}
                label={'Mobile Number'}
                keyboardType={'numeric'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={'Enter Password'}
                onChangeText={text => handleOnchange(text, 'password')}
                onFocus={() => handleError(null, 'password')}
                error={errors?.password}
                iconName={'lock'}
                password
                label={'Password'}
              />
            </View>
            <View style={[st.mt_B10, st.mt_v]}>
              <Button
                disabled={!isConnected}
                title={'Login'}
                backgroundColor={!isConnected ? colors.grey : colors.indian_red}
                color={colors.white}
                onPress={() => {
                  // dispatch(setLogin(true));
                  validation();
                }}
              />
            </View>
            <View style={[st.mt_B10, st.mt_v, st.align_C]}>
              <Pressable
                onPress={() => {
                  feedbackformRedirect();
                }}>
                <View style={[st.align_C, st.row]}>
                  <Text style={[st.tx14_B, st.txDecor, {color: colors.blue}]}>
                    {'Submit Training Assesment'}
                  </Text>
                  {/* <Icons style={{color: colors.indian_red}} name="long-arrow-alt-right" size={24} /> */}
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  BeneficiaryformRedirect();
                }}>
                <View style={[st.align_C, st.row,st.mt_v]}>
                  <Text style={[st.tx14_B, st.txDecor, {color: colors.blue}]}>
                    {'Register Beneficiary'}
                  </Text>
                  {/* <Icons style={{color: colors.indian_red}} name="long-arrow-alt-right" size={24} /> */}
                </View>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={st.align_C}>
          <Image source={images.logo} style={st.logoSty} />
          <PrivacyPolicy />
        </View>
      </ScrollView>

      {isLoading && <Loader />}
      {show_alert_msg()}
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  gustBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  logincon: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: colors.white,
    padding: 20,
    flex: 1,
  },
});

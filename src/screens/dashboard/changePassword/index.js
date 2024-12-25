import {StyleSheet, ScrollView, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import {colors} from '../../../global/theme';
import {View} from 'react-native-animatable';
import AdminInput from '../../../components/adminInput';
import AuthHeader from '../../../components/Auth_Header';
import Button from '../../../components/button';
import {
  ValueEmpty,
  ValidatePassword,
} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import PopUpMessage from '../../../components/popup';
import {API} from '../../../utils/endpoints';
import DeviceInfo from 'react-native-device-info';
import {storeTokenData} from '../../../utils/apicalls/tokenApi';
import useNetworkStatus from '../../../hooks/networkStatus';
import {putAuth} from '../../../utils/apicalls/putApi';

const INITIALINPUT = {
  oldPass: '',
  newPass: '',
  confrimPass: '',
};

const ChangePassword = ({navigation}) => {
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [myDeviceInfo, setMyDeviceInfo] = useState();

  const isConnected = useNetworkStatus();

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();
    const emptyOldPass = ValueEmpty(inputs?.oldPass);
    const validOldPass = ValidatePassword(inputs?.oldPass);
    const emptyNewPass = ValueEmpty(inputs?.newPass);
    const validNewPass = ValidatePassword(inputs?.newPass);
    const emptyConfrimPass = ValueEmpty(inputs?.confrimPass);

    let isValid = true;

    if (emptyOldPass) {
      handleError('*Required', 'oldPass');
      isValid = false;
    } else {
      if (validOldPass == 'success') {
        handleError('', 'oldPass');
      } else {
        handleError(validOldPass, 'oldPass');
        isValid = false;
      }
    }

    if (emptyNewPass) {
      handleError('*Required', 'newPass');
      isValid = false;
    } else {
      if (validNewPass == 'success') {
        handleError('', 'newPass');
      } else {
        handleError(validNewPass, 'newPass');
        isValid = false;
      }
    }

    if (emptyConfrimPass) {
      handleError('*Required', 'confrimPass');
      isValid = false;
    } else if (inputs?.newPass?.trim() != inputs?.confrimPass?.trim()) {
      handleError('Password are not matched', 'confrimPass');
      isValid = false;
    } else {
      handleError('', 'confrimPass');
    }

    if (isValid) {
      handleSubmitPress();
    }
  };

  const handleSubmitPress = async () => {
    const url = API.Change_Password;
    const data = {
      // deviceId: myDeviceInfo?.deviceId,
      // deviceName: myDeviceInfo?.deviceName,
      // password: {
      oldPassword: inputs?.oldPass,
      newPassword: inputs?.newPass,
      // },
    };
    try {
      setIsLoading(true);
      putAuth(url, data)
        .then(data => {
          storeTokenData(data);
          setTitle('Congratulations');
          setSubtitle('Password changed successfully.');
          setPopupMessageVisibility(true);

          setInputs(INITIALINPUT);
        })
        .catch(err => {
          console.log({err});
          if (err?.status === 422) {
            setTitle('Oops!');
            setSubtitle(err.message);
            setPopupMessageVisibility(true);
          } else {
            throw err;
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.log('Change password api CATCH', err);
      setIsLoading(false);
      setTitle('Oops!');
      setSubtitle(err?.message || 'Somthing went wrong');
      setPopupMessageVisibility(true);
    }
  };

  const getDeviceInfoHandle = async () => {
    let deviceId = await DeviceInfo.getDeviceId();
    const deviceName = await DeviceInfo.getDeviceName();
    const data = {
      deviceId,
      deviceName,
    };
    setMyDeviceInfo(data);
  };

  useEffect(() => {
    getDeviceInfoHandle();
  }, []);

  const onPopupMessageModalClick = value => {
    if (title == 'Oops!') {
      setPopupMessageVisibility(value);
    } else {
      setPopupMessageVisibility(value);
      navigation.goBack();
    }
    setTitle('');
    setSubtitle('');
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
      />
    );
  };

  return (
    <View style={st.container}>
      <AuthHeader
        title={'Change Your Password'}
        onBack={() => navigation.goBack()}
      />

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={st.pd20}>
          <View animation={'fadeInRight'} delay={500}>
            <AdminInput
              label={'Old Password'}
              placeholder={'Enter here'}
              onChangeText={text => handleOnchange(text, 'oldPass')}
              onFocus={() => handleError(null, 'oldPass')}
              error={errors?.oldPass}
              iconName={'lock'}
              value={inputs?.oldPass}
              password
            />
          </View>
          <View animation={'fadeInRight'} delay={1000}>
            <AdminInput
              label={'New Password'}
              placeholder={'Enter here'}
              onChangeText={text => handleOnchange(text, 'newPass')}
              onFocus={() => handleError(null, 'newPass')}
              error={errors?.newPass}
              iconName={'lock'}
              value={inputs?.newPass}
              password
            />
          </View>
          <View animation={'fadeInRight'} delay={1500}>
            <AdminInput
              label={'Confirm Password'}
              placeholder={'Enter here'}
              onChangeText={text => handleOnchange(text, 'confrimPass')}
              onFocus={() => handleError(null, 'confrimPass')}
              error={errors?.confrimPass}
              iconName={'lock'}
              value={inputs?.confrimPass}
              password
            />
          </View>
        </View>
      </ScrollView>
      <View style={st.pd20} animation={'fadeInRight'} delay={2000}>
        <Button
          disabled={!isConnected}
          title={'Submit'}
          backgroundColor={!isConnected ? colors.grey : colors.indian_red}
          color={colors.white}
          onPress={() => {
            validation();
          }}
        />
      </View>
      {show_alert_msg()}
      {isLoading && <Loader />}
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});

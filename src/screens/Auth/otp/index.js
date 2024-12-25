import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';
import {ENUM} from '../../../utils/enum/checklistEnum';
import Back from '../../../components/back';
import Input from '../../../components/input';
import Button from '../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../../../redux/reducers/Login';
import MansaImg from '../../../components/mansa';
import AuthHeader from '../../../components/Auth_Header';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import {
  ValueEmpty,
  handleAPIErrorResponse,
} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';

const INITIALINPUT = {
  userNumber: '',
};

const Login = ({navigation, route}) => {
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const phone = route?.params?.phone;

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();
    const validNumber = ValueEmpty(inputs?.userNumber);
    let isValid = true;

    if (validNumber) {
      handleError('*Required', 'userNumber');
      isValid = false;
    } else {
      handleError('', 'userNumber');
    }

    if (isValid) {
      handleSubmitPress();
      //  dispatch(setLogin(true));
    }
  };

  const handleSubmitPress = async () => {
    console.log({inputs});
    const url = `${API.OTP}${phone}/${inputs?.userNumber}`;
    const params = {
      contact: inputs?.userNumber,
    };
    try {
      setIsLoading(true);
      const result = await postApi(url);
      if (result?.status == 200) {
        const data = result.data;
        console.log({data});
        dispatch(setLogin(true));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  return (
    <View style={st.container}>
      <AuthHeader title={''} onBack={() => navigation.goBack()} auth={true} />
      <ScrollView>
        <View style={st.pd20}>
          <View style={st.mt_t10}>
            <Input
              placeholder={'Enter OTP'}
              onChangeText={text => handleOnchange(text, 'userNumber')}
              onFocus={() => handleError(null, 'userNumber')}
              maxLength={10}
              error={errors?.userNumber}
              iconName={images.mobile}
              label={'Enter OTP'}
            />
          </View>

          <Button
            title={ENUM.Status.SUBMIT}
            backgroundColor={colors.lightBlue}
            color={colors.white}
            onPress={() => {
              validation();
            }}
          />

          <View style={[st.mt_t10]}>
            {/* <Text style={[st.tx14, st.txAlignC, {color: colors.blue}]}>
            {'DONt_ACC'}
          </Text> */}
          </View>

          <View style={[st.align_C, {marginVertical: '10%'}]}>
            <View style={[st.box, {zIndex: 999}]}>
              <Text
                style={[
                  st.tx18,
                  st.txAlignC,
                  {marginTop: 3, color: colors.black},
                ]}>
                {'Or'}
              </Text>
            </View>
            <View
              style={[
                st.seprator,
                {width: '100%', position: 'absolute', top: 15},
              ]}
            />
          </View>

          <TouchableOpacity
            onPress={() => dispatch(setLogin(true))}
            style={[styles.gustBtn, st.row, st.align_C, st.mt_t10]}>
            <Image source={images.guest} />
            <View style={{marginLeft: '15%'}}>
              <Text style={[st.tx14, st.txAlignC, {color: colors.black}]}>
                {'GUEST'}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={[
              st.black_box,
              {flex: null, marginTop: '4%', backgroundColor: '#18A0FB'},
            ]}>
            <Text
              style={[
                st.tx14,
                st.txAlignC,
                // {marginTop: '10%', },
              ]}>
              {'LOGIN_CON'}
            </Text>
          </View>
          <View
            style={[
              st.tringle,
              {
                marginTop: -8,
                marginLeft: '23%',
                borderBottomColor: '#18A0FB',
                transform: [{rotate: '-60deg'}],
              },
            ]}
          />
          <View style={st.mt_t10} />
          <MansaImg />
        </View>
      </ScrollView>
      {isLoading && <Loader />}
    </View>
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
});

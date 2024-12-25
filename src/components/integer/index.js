import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import React from 'react';
import st from '../../global/styles';
import {colors, images} from '../../global/theme';
import Icon from 'react-native-vector-icons/Feather';
// import Icon1 from 'react-native-vector-icons/Fontisto';
import { size, family } from '../../global/fonts';
const Integer = ({
  label,
  iconName,
  error,
  inputsty,
  password,
  labelColor,
  textSty,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={st.mt_B}>
      {label && (
        <Text
          style={[st.tx16, {color: !labelColor ? labelColor : colors.white}]}>
          {label}
        </Text>
      )}
      <View style={[style.inputContainer, inputsty,{paddingLeft: iconName?40:15 }]}>
        {iconName && (
          <Icon
            name={iconName}
            style={{
              position: 'absolute',
              top: 10,
              left: 15,
              width: 25,
              height: 25,
              color: colors.grey,
            }}
            color={colors.grey}
            size={20}
          />
        )}
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={style.inputtxt}
          {...props}
          placeholderTextColor={'#777'}
          keyboardType = 'numeric'
        />

        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye' : 'eye-off'}
            style={{fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={[{color: colors.danger, fontSize: 12}]}>{error}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: colors.grey,
  },

  inputContainer: {
    // backgroundColor: colors.white,
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight:15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 10,
    borderWidth:1.5, 
    borderColor:colors.grey,
    height:50,
  },
  inputtxt:{
    fontSize: size.subtitle,
    color: colors.black,
    fontFamily: family.regular,
    flex:1
  }
});

export default Integer;

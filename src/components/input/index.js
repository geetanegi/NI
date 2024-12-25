import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import React from 'react';
import st from '../../global/styles';
import {colors, images} from '../../global/theme';

const Input = ({
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
          style={[st.tx16, {color: labelColor ? labelColor : colors.white}]}>
          {label}
        </Text>
      )}
      <View style={[style.inputContainer, inputsty]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={[st.tx14, st.flex, textSty,{color:colors.black}]}
          {...props}
          placeholderTextColor={'#1C2439'}
        />

        {iconName && (
          <Image
            source={iconName}
            style={{
              position: 'absolute',
              top: 10,
              right: 15,
              width: 25,
              height: 25,
              color:colors.blue
            }}
            tintColor={colors.blue}
          />
        )}

        {/* {password && (
            <Icon
              onPress={() => setHidePassword(!hidePassword)}
              name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
              style={{ fontSize: 22}}
            />
          )} */}
      </View>
      {error && (
        <Text style={[{color: colors.danger, fontSize: 12, marginLeft:15}]}>{error}</Text>
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
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 10,
    height:48
  },
});

export default Input;

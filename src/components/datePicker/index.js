import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../global/theme';
import moment from 'moment';
import st from '../../global/styles';
import Icon from 'react-native-vector-icons/Feather';
import {DateRenderType} from '../../utils/enum/common';

const MydatePicker = ({
  disabled,
  handleChange,
  minDate,
  selectedValue,
  maxDate,
  renderType,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const pickerDate = selectedValue
    ? selectedValue instanceof Date
      ? selectedValue
      : new Date(selectedValue)
    : new Date();
  const displayDate = selectedValue
    ? moment(selectedValue).format('DD-MM-YYYY')
    : placeholder
    ? placeholder
    : '';

  console.log('MyDatePicker rendering', {
    selectedValue,
    pickerDate,
    displayDate,
  });

  const handleDateChange = newDate => {
    setOpen(false);
    handleChange(newDate);
  };

  const renderControl = () => {
    if (renderType === DateRenderType.TextWithCalendar) {
      return (
        <>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={st.row}
            disabled={disabled}>
            <Text style={[st.txheader]}>{displayDate}</Text>
            {!disabled && (
              <Icon
                name={'calendar'}
                size={20}
                color={colors.white}
                style={st.ml_15}
              />
            )}
          </TouchableOpacity>
        </>
      );
    } else if (renderType === DateRenderType.DateWithCalendar) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={[st.row, st.justify_C, styles.datePicsty]}
            disabled={disabled}>
            <Text
              style={[st.tx14, st.mr_10, st.align_C, {color: colors.black}]}>
              {displayDate}
            </Text>
            {!disabled && (
              <Icon
                name={'calendar'}
                size={20}
                color={colors.black}
                style={st.ml_15}
              />
            )}
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <>
          <TouchableOpacity
            disabled={disabled}
            style={[
              st.inputsty,
              st.justify_C,
              st.mt_t10,
              disabled && styles.disabled,
            ]}
            onPress={() => setOpen(true)}>
            <Text
              style={[
                st.tx14,
                {
                  color: disabled
                    ? '#888'
                    : selectedValue
                    ? colors.black
                    : colors.grey,
                },
              ]}>
              {selectedValue ? displayDate : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </>
      );
    }
  };
  return (
    <>
      {renderControl()}
      <DatePicker
        modal
        open={open}
        mode={'date'}
        date={pickerDate}
        minimumDate={minDate}
        maximumDate={maxDate}
        onConfirm={handleDateChange}
        onCancel={() => {
          setOpen(false);
        }}
        disabled={disabled}
      />
    </>
  );
};

export default MydatePicker;

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  datePicsty: {
    backgroundColor: '#E6E6E6',
    padding: 5,
    width: 160,
  },
});

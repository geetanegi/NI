import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Image,
} from 'react-native';
import React from 'react';
import {ENUM} from '../utils/enum/checklistEnum';
import {TouchableOpacity} from 'react-native';
import {colors} from '../global/theme';
import st from '../global/styles';
import DateControl from './DateControl';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DateRenderType} from '../utils/enum/common';
import {useSelector} from 'react-redux';
import ImageOption from './ImageOption';

const ItemResponse = React.memo(
  ({
    itemId,
    responseTypeId,
    renderType,
    options,
    handleChange,
    isResponse2,
    response,
    isReadOnly = false,
    inputTitle = false,
    itemEnum,
    CharLimit,
  }) => {
    //console.log('Rendering ItemResponse'
    // , {
    //   itemId,
    //   responseTypeId,
    //   renderType,
    //   options,
    //   handleChange,
    //   isResponse2,
    //   response,
    //   isReadOnly,
    //   itemEnum,
    // }
    // );

    const isSelected = id => {
      if (response && id) return response.some(res => res == id);
    };

    if (isReadOnly && options?.length > 0) {
      //console.log(itemId, isReadOnly, options);
      options = options.filter(op => isSelected(op.id));
    }
    if (renderType == ENUM.RenderType.NONE) return null;
    else if (renderType == ENUM.RenderType.RADIO_BUTTON) {
      return (
        <View style={styles.optionContainer}>
          {options.length > 0 ? (
            options.map(op => {
              const isOpSelected = isSelected(op.id);
              return (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    handleChange(op.id, !isOpSelected);
                    Keyboard.dismiss();
                  }}>
                  {!isReadOnly ? (
                    isOpSelected ? (
                      <FontAwesome
                        color={colors.logogreen}
                        name="dot-circle-o"
                        size={23}
                      />
                    ) : (
                      <Icon name="circle" size={20} color={colors.black} />
                    )
                  ) : (
                    <View></View>
                  )}
                  <Text style={[st.tx14, st.ml_15]}>{op?.text}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={[st.mt_t10, st.tx14, {color: colors.grey}]}>
              No Response
            </Text>
          )}
        </View>
      );
    } else if (renderType == ENUM.RenderType.CHECKBOX_MULTI_SELECT) {
      return (
        <View style={styles.optionContainer}>
          {options.map(op => {
            const isOpSelected = isSelected(op.id);
            return (
              <TouchableOpacity
                style={[styles.option, styles.checkboxOption]}
                onPress={() => {
                  handleChange(op.id, !isOpSelected);
                  Keyboard.dismiss();
                }}>
                <Icon
                  name={isOpSelected ? 'check-square' : 'square'}
                  size={20}
                  color={colors.black}
                />
                <Text style={[st.tx14, st.ml_15]}>{op?.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else if (renderType == ENUM.RenderType.DATE) {
      let date = null; //MonitoringDate;
      if (!(response && response.length > 0)) date = null;
      else date = new Date(response[0]);
      return (
        <DateControl
          disabled={isReadOnly}
          handleChange={handleChange}
          itemEnum={itemEnum}
          value={date}
          renderType={DateRenderType.Textbox}
        />
      );
    } else if (renderType == ENUM.RenderType.IMAGE) {
      return (
        <View style={styles.optionContainer}>
          {options.length > 0 ? (
            options.map(op => {
              const isOpSelected = isSelected(op.id);
              return (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    handleChange(op.id, !isOpSelected);
                    Keyboard.dismiss();
                  }}>
                  {!isReadOnly ? (
                    isOpSelected ? (
                      <FontAwesome
                        color={colors.logogreen}
                        name="dot-circle-o"
                        size={23}
                      />
                    ) : (
                      <Icon name="circle" size={20} color={colors.black} />
                    )
                  ) : (
                    <View></View>
                  )}
                  <ImageOption imageData={op?.text} />
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={[st.mt_t10, st.tx14, {color: colors.grey}]}>
              No Response
            </Text>
          )}
        </View>
      );
    } else {
      return (
        <View style={st.mt_t10}>
          {inputTitle && <Text style={st.tx12}>{inputTitle}:</Text>}
          <TextInput
            style={[st.inputsty, st.tx14, isReadOnly && styles.disabled]}
            keyboardType={
              renderType == ENUM.RenderType.TEXTBOX_NUMBER ||
              responseTypeId == ENUM.ResponseType.NUMBER
                ? 'numeric'
                : 'default'
            }
            maxLength={CharLimit}
            onChangeText={handleChange}
            editable={!isReadOnly}
            value={response?.length >= 0 ? response[0] : ''}
            placeholder="Enter here"
            placeholderTextColor={colors.grey}
          />
        </View>
      );
    }
  },
);

export default ItemResponse;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  optionContainerimg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    width: 'auto',
    minWidth: '30%', // Adjust the minimum width as per your requirement
    marginTop: 5,
    flexDirection: 'row',
    paddingRight: 8,
  },
  imgoption: {
    width: 'auto',
    minWidth: '30%', // Adjust the minimum width as per your requirement
    marginTop: 5,
    // flexDirection: 'row',
    paddingRight: 8,
  },
  checkboxOption: {
    minWidth: '50%',
  },
  optionText: {
    paddingLeft: 4,
  },

  disabled: {
    backgroundColor: '#f0f0f0', // Example disabled background color
    color: '#888', // Example disabled text color
  },
});

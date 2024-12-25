import {Text, View} from 'react-native';
import React from 'react';
import st from '../../global/styles';
import {ENUM} from '../../utils/enum/checklistEnum';
import moment from 'moment';

const HighLightedResponse = ({item, ItemId, QEnum}) => {

  let response = item?.Items?.find(i => i.ItemId === ItemId);
  let highlightResponse = response?.Response;
  if (QEnum === ENUM.QuestionEnum.H2H_MON_CHILD_IDENTIFICATION_DATE_OF_BIRTH) {
    highlightResponse = response?.Response ? moment(new Date(response?.Response)).format('DD-MM-YYYY') : '';
  }

  return (
    <View style={st.mr30}>
      <Text style={st.tx12}> {highlightResponse}</Text>
    </View>
  );
};

export default HighLightedResponse;

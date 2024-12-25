import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HighLightedResponse from './HighLightedResponse';
import st from '../../global/styles';
import {useSelector} from 'react-redux';
import {ENUM} from '../../utils/enum/checklistEnum';

const CheckListHighLighted = ({ChecklistId, item}) => {
  const data = useSelector(state =>
    state.checklist.data?.find(i => i.ChecklistId === ChecklistId),
  );

  const getHightlightedQus = data?.Groups?.flatMap(g =>
    g.Items.filter(i => i.IsHighlighted),
  );

  return (
    <View>
      {getHightlightedQus?.map((j, n) => {
        return (
          <View key={n}>
            <View style={st.row}>
              <Text style={st.tx12}>{ENUM.ShortName[j.Enum]} : </Text>
              <HighLightedResponse item={item} ItemId={j.ItemId} QEnum={j.Enum}/>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CheckListHighLighted;

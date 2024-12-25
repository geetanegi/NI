import {StyleSheet, View, TouchableOpacity, Text, BackHandler} from 'react-native';
import React from 'react';
import st from '../../global/styles';
import Icons from 'react-native-vector-icons/Entypo';
import {colors} from '../../global/theme';
import moment from 'moment';
import ChecklistCenterName from './ChecklistCenterName';
import {useSelector} from 'react-redux';
import SyncStatus from './SyncStatus';
import CheckListHighLighted from './CheckListHighLighted';
import { useFocusEffect } from '@react-navigation/native';

const SubmitdraftCard = ({gotoEditScreen, item, index, ChecklistId, gotoHomeScreen}) => {
  const colorFromRedux = useSelector(state => state.color?.data?.data);
  let MonitoringDate = moment(item?.MonitoringDate).format('Do MMMM YYYY');

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );

  const handleBackPress = () => {
    gotoHomeScreen();
    return true;
  };

  const getBorderColor = item => {
    const findbycentercheclistid = colorFromRedux?.find(
      items => items.checklist === item?.Enum,
    );
    return findbycentercheclistid?.color;
  };
  console.log('Rendering SubmitdraftCard', ChecklistId);
  return (
    <TouchableOpacity cardindex={index} onPress={gotoEditScreen}>
      <View
        key={index}
        style={[
          st.draftBox,
          st.shadowProp,
          {borderLeftColor: getBorderColor(item)},
        ]}>
        <View>
          <View>
            <Text style={[st.tx14_B, st.txAlignL]}>{item?.ChecklistName}</Text>
            <View style={{position: 'absolute', right: 0, top: -10}}>
              <Icons
                color={colors.black}
                name="chevron-right"
                size={22}
                style={[st.justify_A, st.mt_t10]}
              />
            </View>
          </View>
          <ChecklistCenterName
            CenterName={item?.CenterName}
            CenterTypeDisplayName={item?.CenterTypeDisplayName}
          />
          <CheckListHighLighted ChecklistId={ChecklistId} item={item} />
          <Text style={[st.tx12, {color: item?.Color1}]}>{MonitoringDate}</Text>
        </View>
      </View>

      <SyncStatus SyncStatus={item?.syncStatus} />
    </TouchableOpacity>
  );
};

export default React.memo(SubmitdraftCard);
const styles = StyleSheet.create({});

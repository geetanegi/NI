import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import st from '../../global/styles';
import {
  setStartDate,
  setEndDate,
  clearArchive,
} from '../../redux/reducers/Archive';
import {Button} from 'react-native-elements';
import {colors} from '../../global/theme';
import MydatePicker from '../../components/datePicker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useNetworkStatus from '../../hooks/networkStatus';
import {DateRenderType} from '../../utils/enum/common';

const ArchiveFilters = ({handleSearchPress}) => {
  console.log('rendering ArchiveFilters');
  const dispatch = useDispatch();
  const isConnected = useNetworkStatus();

  const {startDate, endDate} = useSelector(state => state.archive?.data);
  console.log('ArchiveFilters', {startDate, endDate});

  return (
    <View style={styles.Container}>
      <View style={[st.row]}>
        <View style={[st.flex, st.row, st.justify_S]}>
          <MydatePicker
            handleChange={date => {
              dispatch(setStartDate(date.toISOString()));
            }}
            selectedValue={startDate}
            maxDate={new Date()}
            renderType={DateRenderType.DateWithCalendar}
            placeholder={'From Date'}
          />
          <MydatePicker
            handleChange={date => {
              dispatch(setEndDate(date.toISOString()));
            }}
            selectedValue={endDate}
            minDate={startDate ? new Date(startDate) : null}
            maxDate={new Date()}
            renderType={DateRenderType.DateWithCalendar}
            placeholder={'To Date'}
          />
        </View>
      </View>
      <View style={[st.row, st.justify, st.mt_t10, st.mt_B10]}>
        <TouchableOpacity
          disabled={!isConnected}
          onPress={handleSearchPress}
          style={[st.mybtn, st.mr_10, !isConnected && st.disabledButton]}>
          <Text style={[st.tx14, {color: colors.white}]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(clearArchive());
          }}
          style={[st.mybtn, {backgroundColor: colors.green}]}>
          <Text style={[st.tx14, {color: colors.white}]}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArchiveFilters;

const styles = StyleSheet.create({
  Container: {
    borderBottomWidth: 2,
    borderBottomColor: colors.grey,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
});

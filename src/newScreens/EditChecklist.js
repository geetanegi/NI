import {View} from 'react-native';
import React, {useEffect, useState} from 'react';

import ChecklistGroup from './checklistGroup';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearStateEditChecklist} from '../redux/reducers/editChecklistReducer';
import TopSection from './checklistTopSection';
import st from '../global/styles';
import {ENUM} from '../utils/enum/checklistEnum';
import moment from 'moment';
import ChecklistPopup from './checklistPopup';
import LocationSession from './LocationSession';

export default function EditChecklist({navigation, route}) {
  let headerDate = moment(route.params.CreatedOn).format('DD/MM/YYYY');
  console.log('rendering EditChecklist');
  const statusCheck = ENUM.Status;
  const checklist = useSelector(state =>
    state.checklist?.data?.find(c => c.ChecklistId === route?.params?.item),
  );

  const checklistStatus = useSelector(
    state => state.editChecklist?.data.StatusEnum,
  );

  const isReadyOnly = checklistStatus == statusCheck.SUBMIT ? true : false;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log('closing EditChecklist => Clear edit state');
      dispatch(clearStateEditChecklist());
    };
  }, []);

  const goBackHandle = () => {
    navigation.goBack();
  };

  const gotoSubmiitedScreen = () => {
    navigation.navigate('SubmitdraftList',{
      checkListStaus: statusCheck.SUBMIT,
      header: statusCheck.HEADERSUBMIT,
      showheader: true,
    })
  }

  return (
    <>
      <ChecklistPopup />
      <TopSection
        checklist={checklist}
        color1={checklist.Color1}
        color2={checklist.Color2}
        checklistName={checklist.Checklist}
        goBackHandle={goBackHandle}
        gotoSubmiitedScreen={gotoSubmiitedScreen}
        isReadyOnly={isReadyOnly}
        headerDate={headerDate}
      />
      <LocationSession goBackHandle={goBackHandle} />
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps={'handled'}>
        <View style={st.pd10}>
          {checklist.Groups.map((group, gIndex) => (
            <ChecklistGroup
              checklistId={checklist.ChecklistId}
              key={`Group_${group.GroupId}`}
              parentKey={`Group_${group.GroupId}`}
              index={gIndex}
              group={group}
              isReadOnly={isReadyOnly}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // padding: 10,
    // marginBottom: 10
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

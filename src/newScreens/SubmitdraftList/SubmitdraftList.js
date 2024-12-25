import {View, RefreshControl, FlatList, Text} from 'react-native';
import React, {useState} from 'react';
import AuthHeader from '../../components/Auth_Header';
import {useDispatch, useSelector} from 'react-redux';
import SubmitdraftCard from './SubmitdraftCard';
import {setEditChecklist} from '../../redux/reducers/editChecklistReducer';
import {syncTaskName} from '../../utils/services/backgroundTaskEnum';
import {startBackgroundService} from '../../utils/services/backgroundService';
import st from '../../global/styles';
import EmptyItem from '../../components/component-parts/emptyItem';

const SubmitdraftList = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const showheader = route?.params?.showheader;

  let checklist = useSelector(state =>
    state.saveCheckList?.data?.filter(
      c => c.StatusEnum === route?.params?.checkListStaus,
    ),
  );

  function sortFunction(a, b) {
    var dateA = new Date(a.UpdatedOn).getTime();
    var dateB = new Date(b.UpdatedOn).getTime();
    return dateA < dateB ? 1 : -1;
  }

 let sortdata = checklist.sort(sortFunction);
  if (route?.params?.count > 0) {
    checklist = sortdata.slice(0, route?.params?.count);
  } else {
    checklist = sortdata;
  }

  const gotoEditScreen = React.useCallback(item => {
    dispatch(setEditChecklist(item));
    navigation.navigate('editChecklist', {
      item: item.ChecklistId,
      CreatedOn: item.UpdatedOn
        ? item.UpdatedOn
        : item.CreatedOn
        ? item.CreatedOn
        : moment(),
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    console.log('on refresh called');
    setRefreshing(true);
    startBackgroundService(syncTaskName.syncGetSavedChecklist);
    setRefreshing(false);
  }, []);

  const gotoHomeScreen =  React.useCallback(() => {
    navigation.navigate('Main');
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <SubmitdraftCard
        item={item}
        gotoEditScreen={() => gotoEditScreen(item)}
        gotoHomeScreen={() => gotoHomeScreen()}
        index={index}
        ChecklistId={item.ChecklistId}
      />
    );
  };

  const ListEmptyComponent = () => {
    return <EmptyItem />;
  };

  return (
    <View style={[st.flex]}>
      {showheader == true && (
        <AuthHeader
          title={route?.params?.header}
          onBack={() => gotoHomeScreen()}
        />
      )}

      <FlatList
        data={checklist}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          'checklist_' +
          item?.ClientId?.toString() +
          '_' +
          item?.CenterChecklistId?.toString()
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={st.pd10}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default React.memo(SubmitdraftList);

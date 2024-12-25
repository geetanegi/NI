import {View, RefreshControl, FlatList, Alert} from 'react-native';
import React, {useState} from 'react';
import AuthHeader from '../../components/Auth_Header';
import {useDispatch, useSelector} from 'react-redux';
import SubmitdraftCard from './SubmitdraftCard';
import {setEditChecklist} from '../../redux/reducers/editChecklistReducer';
import st from '../../global/styles';
import EmptyItem from '../../components/component-parts/emptyItem';
import {setArchive} from '../../redux/reducers/Archive';
import {API} from '../../utils/endpoints';
import {postAuth} from '../../utils/apicalls/postApi';
import ArchiveFilters from './ArchiveFilters';
import {getArchiveFilters} from '../../redux/store/getState';
import {fetchArchiveData} from '../../utils/apicalls/checklistApi';
import PopUpMessage from '../../components/popup';

const ArchiveList = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [title, setTitle] = useState('Alert');
  const [subtitle, setSubtitle] = useState('');
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);

  const dispatch = useDispatch();

  const {archiveList} = useSelector(state => state.archive?.data);
  const {startDate, endDate} = useSelector(state => state.archive.data);

  console.log({startDate, endDate});

  function sortFunction(a, b) {
    var dateA = new Date(a.UpdatedOn).getTime();
    var dateB = new Date(b.UpdatedOn).getTime();
    return dateA < dateB ? 1 : -1;
  }

  //archiveList = archiveList?.sort(sortFunction) || [];

  const gotoEditScreen = React.useCallback(item => {
    dispatch(setEditChecklist(item));
    navigation.navigate('editChecklist', {item: item.ChecklistId});
  }, []);

  const handleSubmitPress = () => {
    if (startDate) {
      if (endDate) {
        try {
          setRefreshing(true);
          fetchArchiveData()
            .catch(err => {
              throw err;
            })
            .finally(() => {
              setRefreshing(false);
            });
        } catch (err) {
          console.log(err);
          Alert.alert(
            'Error while fetching data from server. Please retry or contact administrator',
          );
          setRefreshing(false);
        }
      } else {
        setSubtitle('Please select `To Date`');
        setPopupMessageVisibility(true);
      }
    } else {
      setSubtitle('Please select `From Date`');
      setPopupMessageVisibility(true);
    }
  };

  const onRefresh = React.useCallback(() => {
    console.log('on refresh called');
    handleSubmitPress();
  }, []);

  const gotoHomeScreen = React.useCallback(() => {
    navigation.navigate('Main');
  });

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        twoButton={false}
      />
    );
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

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
      <AuthHeader title={'Archive list'} onBack={() => gotoHomeScreen()} />
      <ArchiveFilters handleSearchPress={handleSubmitPress} />
      <FlatList
        data={archiveList}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          'Archive_' +
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
      {show_alert_msg()}
    </View>
  );
};

export default React.memo(ArchiveList);

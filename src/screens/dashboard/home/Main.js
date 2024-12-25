import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/Header';
import st from '../../../global/styles';
import {useDispatch, useSelector} from 'react-redux';
import {ENUM} from '../../../utils/enum/checklistEnum';
import SubmitdraftList from '../../../newScreens/SubmitdraftList/SubmitdraftList';
import ChecklistCard from './ChecklistCard';
import {syncTaskName} from '../../../utils/services/backgroundTaskEnum';
import {reStartBackgroundService} from '../../../utils/services/backgroundService';
import {clearStateEditChecklist} from '../../../redux/reducers/editChecklistReducer';
import {useFocusEffect} from '@react-navigation/native';
import PopUpMessage from '../../../components/popup';
import {IsBackgroundSyncRunning} from '../../../utils/services/backgroundService';
import {environment} from '../../../utils/constant';
import {errors} from '../../../utils/enum/messages';
import {syncMasterChecklist} from '../../../utils/services/syncTask';
import useNetworkStatus from '../../../hooks/networkStatus';
import Loader from '../../../components/loader';
// import { backAction } from '../../../utils/helperfunctions/functions';
const Home = ({navigation}) => {
  const saveCheckList_data = useSelector(state => state.checklist?.data);
  const dispatch = useDispatch();
  const draftScreenRoute = {
    checkListStaus: ENUM.Status.DRAFT,
    count: 3,
  };

  const onRefresh = React.useCallback(() => {
    reStartBackgroundService(syncTaskName.syncMasterChecklist);
  }, []);

  const [month, setMon] = useState('');
  const [year, setyear] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState('');
  const [twoButton, setTwoButton] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [syncStatus, setSyncStatus] = useState();
  const isConnected = useNetworkStatus();
  const [showLoader, setShowLoader] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

  // backAction = () => {
  //   Alert.alert('Exit Nutrition International ?', 'Are you sure you want to exit ?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {text: 'YES', onPress: () => BackHandler.exitApp()},
  //   ]);
  //   return true;
  // };

  const backAction = () => {
    openPopupMessage(
      'Exit Nutrition International ?',
      `Are you sure you want to exit ?`,
      true,
    );
    return true;
  };

  const checklistData = saveCheckList_data?.map(
    ({Checklist, ChecklistId, Color1, Color2, Enum}) => {
      return {Checklist, ChecklistId, Color1, Color2, Enum};
    },
  );

  let saveCheckList_length = useSelector(
    state =>
      state.saveCheckList?.data?.filter(c => c.StatusEnum === ENUM.Status.DRAFT)
        ?.length,
  );

  const getMasterDataSyncStatus = async () => {
    setShowLoader(false);
    const checkSyncStatus = IsBackgroundSyncRunning();
    setSyncStatus(checkSyncStatus);

    console.log('syncStatus', checkSyncStatus);
    if (checkSyncStatus === false) {
      startSync();
    }
  };

  const startSync = () => {
    if (checklistData == undefined && isConnected) {
      setShowLoader(true);
      syncMasterChecklist();
      reStartBackgroundService(syncTaskName.all);
    } else {
      setShowLoader(false);
    }
  };

  //Start Sync to get data if checklist data is not fetched yet
  useEffect(() => {
    getdate();
    startSync();
  }, []);

  //Start Sync to get data if checklist data is not fetched yet and Internet connection is restored
  useEffect(() => {
    startSync();
  }, [isConnected]);

  //Start Sync to get data if checklist data is still not fetched yet
  useEffect(() => {
    let interval = environment.checkBackgroundSync;
    let intervalId;
    if (checklistData == undefined) {
      intervalId = setInterval(getMasterDataSyncStatus, interval);
    } else {
      setShowLoader(false);
    }
    return () => clearInterval(intervalId);
  }, [checklistData, syncStatus]);

  const getdate = () => {
    var myDate = new Date();
    var mon = myDate.toLocaleString('default', {month: 'short'});
    var yrs = myDate.getFullYear();
    setMon(mon);
    setyear(yrs);
  };

  function onChecklistClickOpenChecklist(ChecklistId) {
    dispatch(clearStateEditChecklist());
    navigation.navigate('editChecklist', {item: ChecklistId});
  }

  const onPopupMessageModalClick = value => {
    BackHandler.exitApp();
    setPopupMessageVisibility(value);
    setTitle('');
    setSubtitle('');
  };

  const openPopupMessage = (title, subtitle, isTwoButton) => {
    setTitle(title);
    setSubtitle(subtitle);
    setTwoButton(isTwoButton);
    setPopupMessageVisibility(true);
  };

  const show_alert_msg = () => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        twoButton={twoButton}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        onPressNoBtn={() => {
          setPopupMessageVisibility(false);
        }}
      />
    );
  };

  return (
    <View style={[st.flex]}>
      <Header navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={st.pd10}>
          <View style={st.mt_B}>
            <Text style={[st.txheading, st.align_C]}>
              {ENUM.STATICKEYWORDS.Current_Month} {month} {year}
            </Text>
          </View>
          {syncStatus == false && checklistData == undefined ? (
            <View style={[st.center, st.mt_50]}>
              <Text style={[st.tx12, st.txAlignC]}>
                {errors.GET_MASTERDATA_FAILED_ERROR}
              </Text>
            </View>
          ) : checklistData == undefined ? (
            showLoader ? (
              <Loader />
            ) : (
              <View style={[st.center, st.mt_50]}>
                <Text style={[st.tx12, st.txAlignC]}>
                  {errors.GET_MASTERDATA_WAITING_ERROR}
                </Text>
              </View>
            )
          ) : (
            <View>
              {checklistData?.map((item, ind) => {
                return (
                  <ChecklistCard
                    key={`master_${ind}`}
                    checklistKey={`master_${ind}`}
                    title={item}
                    cardindex={ind}
                    gotoEditScreen={() =>
                      onChecklistClickOpenChecklist(item.ChecklistId)
                    }
                  />
                );
              })}
            </View>
          )}
        </View>

        {(saveCheckList_length && checklistData != undefined) > 0 && (
          <View style={st.borderStyle} />
        )}
        {(saveCheckList_length && checklistData != undefined) > 0 && (
          <View>
            <View style={[st.mt_t10, st.row, st.justify_S, st.pd_H20]}>
              <Text style={[st.txheading]}>
                {ENUM.STATICKEYWORDS.RECENT_DRAFTS}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SubmitdraftList', {
                    checkListStaus: ENUM.Status.DRAFT,
                    showheader: true,
                    header: ENUM.Status.DRAFT,
                  })
                }>
                <Text style={[st.tx12]}>{ENUM.STATICKEYWORDS.VIEW_MORE}</Text>
              </TouchableOpacity>
            </View>
            <SubmitdraftList
              navigation={navigation}
              showheader={false}
              route={{params: draftScreenRoute}}
            />
          </View>
        )}
      </ScrollView>
      {show_alert_msg()}
    </View>
  );
};

export default Home;

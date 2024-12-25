import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  BackHandler,
} from 'react-native';
import AuthHeader from '../components/Auth_Header';
import useNetworkStatus from '../hooks/networkStatus';
import st from '../global/styles';
import {colors} from '../global/theme';
import {SaveEditChecklist} from '../utils/helperfunctions/checklistHelper';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSaveCheckList,
  deleteSaveCheckList,
} from '../redux/reducers/SaveCheckList';
import PopUpMessage from '../components/popup';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {deleteAuth} from '../utils/apicalls/deleteApi';
import {API} from '../utils/endpoints';
import moment from 'moment';
import {setMonitoringDate} from '../redux/reducers/editChecklistReducer';
import {ENUM} from '../utils/enum/checklistEnum';
const TopSection = ({
  checklist,
  color1,
  color2,
  checklistName,
  goBackHandle,
  isReadyOnly,
  headerDate,
  gotoSubmiitedScreen,
}) => {

  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState('');
  const [twoButton, setTwoButton] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [popupCallBack, setPopupCallBack] = useState(null);
  const [isConfimedShow, setIsConfimedShow] = useState(false);
  const isConnected = useNetworkStatus();

  const dispatch = useDispatch();

  const isChangedItem =
    useSelector(state => state.editChecklist.data?.isChangedItem) || false;

  const {CenterChecklistId, ClientId, MonitoringDate, SyncStatus, StatusEnum} =
    useSelector(state => {
      return {
        CenterChecklistId: state.editChecklist.data?.CenterChecklistId,
        ClientId: state.editChecklist.data?.ClientId,
        MonitoringDate: state.editChecklist.data?.MonitoringDate,
        SyncStatus: state.editChecklist.data?.syncStatus,
        StatusEnum: state.editChecklist.data?.StatusEnum,
      };
    });

  let monitoringDate = null; //MonitoringDate;

  if (!MonitoringDate) monitoringDate = new Date();
  else monitoringDate = new Date(MonitoringDate);
  console.log('monitoringDate monitoringDate', monitoringDate);

  const enableDeleteBtn =
    (isConnected && !!CenterChecklistId) || !CenterChecklistId;

  const saveChecklistData = (isSubmit, isConfimed) => {
    const {isSuccess, validation, confirmation} = SaveEditChecklist(
      checklist,
      isSubmit,
      isConfimed,
    );
    if (!isSuccess) {
      console.log('validateChecklist', validation);
      if (validation?.length > 0) {
        openPopupMessage('Validation failed', validation.join(',\n\n'), false);
        return;
      }
      if (!confirmation) {
        setIsConfimedShow(true);
        openPopupMessage(
          'Are you sure?',
          `Checklist once submitted can't be changed. Do you wish to continue?`,
          true,
          () => {
            return () => {
              saveChecklistData(true, true);
            };
          },
        );
        return;
      }
    } else {
      if (isSubmit) {
        gotoSubmiitedScreen();
      } else {
        goBackHandle();
      }
      Toast.show(
        `${
          isSubmit
            ? 'Checklist Submitted Successfully'
            : 'Draft Saved Successfully'
        }`,
        Toast.LONG,
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isChangedItem) {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          goBackFromCheckList,
        );
        return () => backHandler.remove();
      }
    }, [isChangedItem]),
  );

  const onPopupMessageModalClick = value => {
    if (isChangedItem && twoButton) {
      goBackHandle();
    }
    setTitle('');
    setSubtitle('');
    setTwoButton(false);
    setPopupMessageVisibility(value);
    setPopupCallBack(null);
    setIsConfimedShow(false);
  };

  const openPopupMessage = (title, subtitle, isTwoButton, callback) => {
    setTitle(title);
    setSubtitle(subtitle);
    setTwoButton(isTwoButton);
    setPopupMessageVisibility(true);
    setPopupCallBack(callback);
  };

  const successDeletedHandle = () => {
    goBackHandle();
    Toast.show('Deleted successfully');
  };

  const checklistDeleteHandle = () => {
    try {
      deleteAuth(API.DELETE_CHECKLIST + CenterChecklistId)
        .then(result => {
          deleteChecklistFromReux();
        })
        .catch(err => {
          throw err;
        });
    } catch (err) {
      console.log(err);
      openPopupMessage(
        'Oops!',
        'Something went wrong, Please try again',
        false,
      );
    }
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
          console.log('typeof popupCallBack', typeof popupCallBack);
          if (typeof popupCallBack === 'function') popupCallBack();
        }}
        onPressNoBtn={() => {
          setPopupMessageVisibility(false);
        }}
      />
    );
  };

  const clearDraft = () => {
    dispatch(clearSaveCheckList());
  };
  const deleteChecklistFromReux = () => {
    dispatch(deleteSaveCheckList([ClientId]));
    successDeletedHandle();
  };

  const goBackFromCheckList = () => {
    if (isChangedItem == true) {
      openPopupMessage(
        'Are you sure?',
        'Your unsaved changes will be discarded. Do you want to exit?',
        true,
        () => {
          return () => {
            goBackHandle();
          };
        },
      );
      return true;
    } else {
      goBackHandle();
    }
  };

  const handleOnMonitoringDateChange = monitoringDate => {
    //dispatch save MonitoringDate to editChecklist
    dispatch(setMonitoringDate(monitoringDate));
  };

  return (
    <>

        <AuthHeader
        code1={color2}
        code2={color1}
        title={`${checklistName}`}
        subtitle={'Visit/Monitoring Date : '}
        checklistEnum={checklist?.Enum}
        onBack={() => {
          if (isChangedItem) {
            goBackFromCheckList();
          } else {
            goBackHandle();
          }
        }}
        isReadyOnly={isReadyOnly}
        monitoringDate={monitoringDate}
        onMonitoringDateChange={handleOnMonitoringDateChange}
      />
      <View style={[st.row, st.justify, st.mt_t10, st.mt_B10, st.mr_10]}>
        {!isReadyOnly && (
          <>
            {!!ClientId && (
              <TouchableOpacity
                disabled={!enableDeleteBtn}
                onPress={() => {
                  openPopupMessage(
                    'Are you sure?',
                    'Do you want to delete it?',
                    true,
                    () => {
                      return () => {
                        if (CenterChecklistId) checklistDeleteHandle();
                        else deleteChecklistFromReux();
                      };
                    },
                  );
                }}
                style={[
                  st.mybtn,
                  st.mr_10,
                  {
                    backgroundColor: enableDeleteBtn
                      ? colors.danger
                      : colors.grey,
                  },
                ]}>
                <Text style={[st.tx14, {color: colors.white}]}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                saveChecklistData(false, false);
              }}
              style={[st.mybtn, st.mr_10]}>
              <Text style={[st.tx14, {color: colors.white}]}>Save Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!isConnected}
              onPress={() => {
                saveChecklistData(true, false);
              }}
              style={[
                st.mybtn,
                {backgroundColor: colors.green},
                !isConnected && st.disabledButton,
              ]}>
              <Text style={[st.tx14, {color: colors.white}]}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
        {(SyncStatus == ENUM.SERVERSTATUS.INPROGRESS ||
          SyncStatus == ENUM.SERVERSTATUS.FAILED ||
          SyncStatus == ENUM.SERVERSTATUS.NOTSTARTED) &&
          StatusEnum === ENUM.Status.SUBMIT && (
            <TouchableOpacity
              disabled={!isConnected}
              onPress={() => {
                saveChecklistData(true, false);
              }}
              style={[
                st.mybtn,
                {backgroundColor: colors.green},
                !isConnected && st.disabledButton,
              ]}>
              <Text style={[st.tx14, {color: colors.white}]}>Submit</Text>
            </TouchableOpacity>
          )}
      </View>
      {show_alert_msg()}
    </>
  );
};

const styles = StyleSheet.create({});

export default TopSection;

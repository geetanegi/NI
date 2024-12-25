import {API} from '../endpoints';
import {
  getSavedChecklistbyNotStartedAndFailed,
  getChecklistResponseById,
  getSavedChecklistData,
  getArchiveFilters,
  getChecklistResponseByClientId,
} from '../../redux/store/getState';
import {ENUM} from '../enum/checklistEnum';
import {
  updateSaveChecklistSyncStatus,
  addSaveCheckList,
  clearSaveCheckList,
  deleteSaveCheckList,
} from '../../redux/reducers/SaveCheckList';
import {store} from '../../redux/store/index';
import {setCheckList} from '../../redux/reducers/Checklist';
import {setColor} from '../../redux/reducers/Color';
import {setProfile} from '../../redux/reducers/Profile';
import {setImage} from '../../redux/reducers/Image';
import {postAuth} from './postApi';
import {getAuth} from './getApi';
import {errors} from '../enum/messages';
import {setArchive} from '../../redux/reducers/Archive';

const saveSingleChecklist = async res => {
  try {
    //Update sync status to In Progrss
    const reduxPayload = {
      syncStatus: ENUM.SERVERSTATUS.INPROGRESS,
      id: res.ClientId,
      syncAttempt: res.syncAttempt,
    };
    store.dispatch(updateSaveChecklistSyncStatus(reduxPayload));

    //Save Data
    var payloads = {
      CenterChecklistId: res.CenterChecklistId,
      ChecklistId: res.ChecklistId,
      ClientId: res.ClientId,
      Status_Enum: res.StatusEnum,
      CenterName: res.CenterName,
      CreatedOn: res.CreatedOn,
      UpdatedOn: res.UpdatedOn,
      SubmittedOn: res.SubmittedOn,
      MonitoringDate: res.MonitoringDate,
      Items: res.Items,
    };
    console.log('saveSingleChecklist', JSON.stringify(payloads));

    await postAuth(API.SAVE_CHECKLIST, payloads)
      .then(data => {
        //console.log('SAVE_CHECKLIST data', data);
        const checklistfromserver = {
          ...data[0],
          syncStatus: ENUM.SERVERSTATUS.COMPLETED,
          syncAttempt: 0,
          ErrorMessage: '',
        };
        store.dispatch(addSaveCheckList(checklistfromserver));
      })
      .catch(error => {
        console.log('SAVE_CHECKLIST catch', error);
        throw error;
      });
  } catch (e) {
    console.log('SAVE_CHECKLIST catch', e, res);
    let errorMessage =
      res.StatusEnum == ENUM.Status.SUBMIT
        ? errors.SUBMIT_CHECKLIST_FAILED_ERROR
        : errors.SAVE_CHECKLIST_FAILED_ERROR;

    errorMessage =
      errorMessage +
      '\n\n' +
      (Array.isArray(e.message) ? e.message[0] : e.message);

    let newStatus = res.StatusEnum;
    let newSyncAttempt = res.syncAttempt + 1;
    if (e.status === 401) newSyncAttempt = res.syncAttempt;
    else if (res.syncAttempt == 2 && res.StatusEnum == ENUM.Status.SUBMIT)
      newStatus = ENUM.Status.DRAFT;

    updatedChecklist = {
      ...res,
      syncStatus: ENUM.SERVERSTATUS.FAILED,
      syncAttempt: newSyncAttempt,
      StatusEnum: newStatus,
      ErrorMessage: errorMessage,
    };
    store.dispatch(addSaveCheckList(updatedChecklist));
  }
};

export const saveChecklistfromRedux = async isSyncInProgrss => {
  const getSavedChecklistStartedAndFailed =
    getSavedChecklistbyNotStartedAndFailed(isSyncInProgrss);

  for (let i = 0; i < getSavedChecklistStartedAndFailed.length; i++) {
    await saveSingleChecklist(getSavedChecklistStartedAndFailed[i]);
  }
};

export const getMasterChecklist = async () => {
  try {
    const result = await getAuth(API.GET_CHECKLIST)
      .then(data => {
        let colorcode = [];
        data.forEach(async res => {
          code = {
            color: res.Color1,
            checklist: res.Enum,
          };
          colorcode.push(code);
        });
        const body = {
          data: colorcode,
        };
        store.dispatch(setColor(body));

        store.dispatch(setCheckList(data));
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    console.log('sync getMasterChecklist has error', err);
  }
};

export const getProfileData = async () => {
  try {
    const result = await getAuth(API.GET_USER_PROFILE)
      .then(data => {
        store.dispatch(setProfile(data));
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    console.log('sync getProfileData has error', err);
  }
};

export const getResponseImageData = async () => {
  try {
    const result = await getAuth(API.GET_RESPONSE_IMAGES)
      .then(data => {
        store.dispatch(setImage(data));
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    console.log('sync getResponseImageData has error', err);
  }
};




export const getSavedChecklist = async () => {
  console.log('--get saved checklist called-------');
  const url = API.GET_SUBMITED_CHECKLIST;
  try {
    const result = await getAuth(API.GET_SUBMITED_CHECKLIST)
      .then(data => {
        if (data.length == 0) {
          store.dispatch(clearSaveCheckList());
        } else {
          data?.forEach(async res => {
            const groupChecklistQuestion = getChecklistResponseByClientId(
              res.ClientId,
            );

            if (
              !groupChecklistQuestion ||
              res?.UpdatedOn > groupChecklistQuestion?.UpdatedOn
            ) {
              const checklistfromserver = {
                ...res,
                syncStatus: ENUM.SERVERSTATUS.COMPLETED,
              };
              store.dispatch(addSaveCheckList(checklistfromserver));
            }
          });
          
          const listSavedInRedux = getSavedChecklistData();
          let list = [];
          listSavedInRedux?.forEach(res => {
            const itemResponse = data?.find(
              i => i.CenterChecklistId === res.CenterChecklistId,
            );
            if (itemResponse == undefined && res.CenterChecklistId !== null) {
              list.push(res.ClientId);
            }
          });
          if (list.length > 0) {
            store.dispatch(deleteSaveCheckList(list));
          }
        }
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    console.log('sync getSavedChecklist has error', err);
  }
};

export const fetchArchiveData = async () => {
  const url = API.ARCHIVED;
  const {startDate, endDate} = getArchiveFilters();
  
  const params = {
    StartDate: startDate,
    EndDate: endDate,
  };

  //Validate Param here
  return postAuth(url, params)
    .then(result => {
      store.dispatch(setArchive(result));
    })
    .catch(err => {
      throw err;
    });
};

import {store} from '.';
import {ENUM} from '../../utils/enum/checklistEnum';
export const getEditChecklistState = () => store.getState().editChecklist.data;
export const getLocationData = () => store.getState().location.data;

export const getMasterChecklistById = id =>
  store.getState().checklist.data?.find(c => c.ChecklistId === id);

export const getMasterChecklist = () => store.getState().checklist?.data;

export const getSavedChecklistData = () => store.getState().saveCheckList?.data;

export const getProfileData = () => store.getState().profile?.data;

export const getSavedChecklistbyNotStartedAndFailed = isGetInProgress => {
  let savedchecklistdata = store
    .getState()
    .saveCheckList?.data?.filter(
      res =>
        res.syncStatus === ENUM.SERVERSTATUS.NOTSTARTED ||
        (res.syncStatus === ENUM.SERVERSTATUS.FAILED && res.syncAttempt < 3) ||
        (isGetInProgress && res.syncStatus === ENUM.SERVERSTATUS.INPROGRESS),
    );

  function sortFunction(a, b) {
    var dateA = new Date(a.UpdatedOn).getTime();
    var dateB = new Date(b.UpdatedOn).getTime();
    return dateA < dateB ? 1 : -1;
  }

  sortdata = savedchecklistdata.sort(sortFunction);
  return sortdata;
};

export const getSavedChecklistbyCenterChecklistIdnull = () => {
  store
    .getState()
    .saveCheckList?.data?.filter(res => res.CenterChecklistId === null);
};

export const getSavedChecklistlength = () => {
  store.getState().saveCheckList?.data?.length;
};

export const getImageDatalength = () => {
  store.getState().image?.data?.length;
};
export const getChecklistResponseById = id =>
  store.getState().saveCheckList?.data?.find(c => c.CenterChecklistId === id);

export const getChecklistResponseByClientId = clientId =>
  store.getState().saveCheckList?.data?.find(c => c.ClientId === clientId);

export const isUserLoggedIn = () => {
  const loginData = store.getState().login?.data;
  console.log('isUserLoggedIn', loginData, !!loginData);
  return !!loginData;
};

export const getArchiveFilters = () => {
  const {startDate, endDate} = store.getState().archive.data;
  return {startDate, endDate};
};

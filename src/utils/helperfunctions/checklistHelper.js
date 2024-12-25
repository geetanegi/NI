import {addSaveCheckList} from '../../redux/reducers/SaveCheckList';
import {clearMultipleItemResponse} from '../../redux/reducers/editChecklistReducer';
import {store} from '../../redux/store';
import {getEditChecklistState} from '../../redux/store/getState';
import {ENUM} from '../enum/checklistEnum';
import {reStartBackgroundService} from '../services/backgroundService';
import {syncTaskName} from '../services/backgroundTaskEnum';
import {validateChecklist, validateDraftChecklist} from './checklistValidation';
import {getLocationData} from '../../redux/store/getState';
import {getProfileData} from '../../redux/store/getState';

export const isTrueValue = (value, responseTypeId) => {
  let checkValue =
    Array.isArray(value) && value?.length >= 0 ? value[0] : value;
  if (
    responseTypeId == ENUM.ResponseType.BOOLEAN ||
    responseTypeId == ENUM.ResponseType.BOOL_WITH_DONT_KNOW
  ) {
    return checkValue == ENUM.BooleanValues.YES;
  } else if (responseTypeId == ENUM.ResponseType.NUMBER) {
    const numberValue = parseFloat(checkValue);
    return !isNaN(numberValue) && numberValue > 0;
  } else if (responseTypeId == ENUM.ResponseType.NO_RESPONSE) {
    return true;
  } else if (responseTypeId == ENUM.ResponseType.IMAGE) {
    if (checkValue !== ENUM.BooleanValues.NO && checkValue !== undefined) {
      return ENUM.BooleanValues.YES;
    }
  } else if(
    responseTypeId == ENUM.ResponseType.MONTH_MEAL_FREQUENCY &&
    checkValue
  ){
    return true;
  }
  return false;
};

export const getFlatItems = items => {
  if (!Array.isArray(items)) return items;
  let flatList = [];
  for (let i = 0; i < items.length; i++) {
    flatList.push(items[i]);
    if (Array.isArray(items[i].Items)) {
      const clildList = getFlatItems(items[i].Items);
      flatList.push(...clildList);
    }
  }
  return flatList;
};

export const generateClientId = userId => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const randomTwoDigit = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0');

  return `${userId}_${year}${month}${day}_${hours}${minutes}${seconds}_${randomTwoDigit}`;
};

export const getDefaultChecklistRespnse = (
  userid,
  checklist,
  isSubmit,
  checklistResponse,
) => {
  let centerName;
  if (
    checklist.Enum == ENUM.Checklist.BASELINE ||
    checklist.Enum == ENUM.Checklist.GALIDRAA ||
    checklist.Enum == ENUM.Checklist.SELF_ASSESSMENT_HINDI
  ) {
    const profileData = {...getProfileData()};
    centerName =
      !checklistResponse?.CenterName && profileData?.Location?.BlockData?.block;
  }
  if (
    checklist.Enum == ENUM.Checklist.SELF_ASSESSMENT_HINDI
  ) {
    const profileData = {...getProfileData()};
    centerName =
      !checklistResponse?.CenterName && profileData?.BeneficiaryData?.VillageName;
  }
  return {
    ClientId: checklistResponse?.ClientId || generateClientId(userid),
    CenterChecklistId: checklistResponse?.CenterChecklistId || null,
    ChecklistId: checklist.ChecklistId,
    ChecklistName: checklist.Checklist,
    CenterId: checklistResponse?.CenterId || null,
    CenterName: centerName ? centerName : checklistResponse?.CenterName || null,
    CenterTypeDisplayName: checklist.CenterTypeDisplayName,
    Enum: checklist.Enum,
    syncStatus: ENUM.SERVERSTATUS.NOTSTARTED,
    syncAttempt: 0,
    ErrorMessage: '',
    StatusEnum: isSubmit ? ENUM.Status.SUBMIT : ENUM.Status.DRAFT,
    CreatedBy: userid,
    UpdatedOn: !isSubmit
      ? new Date().toISOString()
      : checklistResponse?.UpdatedOn || new Date().toISOString(),
    CreatedOn: checklistResponse?.CreatedOn || new Date().toISOString(),
    SubmittedOn: isSubmit ? new Date().toISOString() : null,
    isChangedItem: false,
    MonitoringDate:
      checklistResponse?.MonitoringDate || new Date().toISOString(),
  };
};
//---   image(multiselect----bydefault null select---)
//----   if he selecte any other.. uncheck... na
//----

export const getDefaultItemRespnse = (
  itemId,
  groupId,
  itemResponseIndex = 0,
) => {
  return {
    ItemId: itemId,
    GroupId: groupId,
    ItemResponseId: null,
    ItemResponseIndex: itemResponseIndex,
    Response: [],
    Response2: [],
    UpdatedBy: null,
  };
};

export const createItemResponse = (itemResponse, newResponse, newResponse2) => {
  let {latitude, longitude} = {...getLocationData()};

  return {
    ...itemResponse,
    Response: newResponse,
    Response2: newResponse2,
    GeoTag_Lat: latitude,
    GeoTag_Long: longitude,
    UpdatedOn: new Date().toISOString(),
  };
};

export const getFirstResponseByItemId = (
  response,
  itemId,
  itemResponseIndex = 0,
) => {
  const defaultResponse = false;
  if (!response?.Items?.length > 0 || !itemId) return defaultResponse;
  const itemResponse = response.Items.find(
    i => i.ItemId === itemId && i.ItemResponseIndex == itemResponseIndex,
  );
  if (!itemResponse?.Response?.length > 0) return defaultResponse;
  return itemResponse.Response[0];
};
export const getFirstResponse2ByItemId = (response, itemId) => {
  const defaultResponse = false;
  if (!response?.Items?.length > 0 || !itemId) return defaultResponse;
  const itemResponse = response.Items.find(i => i.ItemId === itemId);
  if (!itemResponse?.Response2?.length > 0) return defaultResponse;
  return itemResponse.Response2[0];
};
export const getAllResponseByItemId = (response, itemId) => {
  const defaultResponse = [];
  if (!response?.Items?.length > 0 || !itemId) return defaultResponse;
  const itemResponse = response.Items.find(i => i.ItemId === itemId);
  if (!itemResponse?.Response?.length > 0) return defaultResponse;
  return itemResponse.Response;
};

export const SaveEditChecklist = (checklist, isSubmit, isConfimed) => {
  let checklistResponse = {...getEditChecklistState()};
  const profileData = {...getProfileData()};
  try {
    let validation;
    if (isSubmit) {
      validation = validateChecklist(checklist, checklistResponse);
    } else {
      validation = validateDraftChecklist(checklist, checklistResponse);
    }

    if (validation?.length > 0) {
      return {isSuccess: false, validation};
    }

    if (!isConfimed && isSubmit) {
      return {isSuccess: false, confirmation: false};
    }
    let checklistDefaultResponse = getDefaultChecklistRespnse(
      profileData.UserId, //TODO: Replace with userid
      checklist,
      isSubmit,
      checklistResponse,
    );
    const savedChecklistData = {
      ...checklistResponse,
      ...checklistDefaultResponse,
    };

    store.dispatch(addSaveCheckList(savedChecklistData));
    reStartBackgroundService(syncTaskName.syncPostSavedChecklist);

    return {isSuccess: true, confirmation: true};
  } catch (error) {
    console.log('saveChecklistData ERROR', error);
    return {isSuccess: false, validation: ['Something went wrong']};
  }
};

export const clearGroupResponses = (items, itemResponseIndex = 0) => {
  const itemsToRemove = getFlatItems(items).map(item => {
    return {itemId: item.ItemId, itemResponseIndex};
  });
  store.dispatch(clearMultipleItemResponse(itemsToRemove));
};

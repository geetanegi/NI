import {
  getEditChecklistState,
  getMasterChecklistById,
} from '../../redux/store/getState';
import {ENUM} from '../enum/checklistEnum';
import {
  getFirstResponse2ByItemId,
  getFirstResponseByItemId,
  isTrueValue,
} from './checklistHelper';
import {getAge, isAgeGreaterThan5Months, isValidDate} from './functions';

const responseTypeEnum = ENUM.ResponseType;
const islog = false;

const messages = {
  commonMessageMissingField:
    'Please fill all the Mandatory fields in the Checklist to continue',
  mandatoryField: 'This field is mandatory',
  exceedinglength:
    'This field exceeds the maximum character limit (200) allowed.',
  missingResposne:
    'Minimum {{minimumResponseCount}} responses are needed, but only {{foundResponseCount}} found.',
  invalidBoolean: 'Boolean value is incorrect',
  invalidNumber: 'Number value is incorrect',
  invalidDate: 'Invalid date value',
};

let globalErrors = [];

const validateResponse = (isMandatory, responseTypeId, ResponseToValidate) => {
  let isValidItem = true;
  let hasTrueValue = false;
  let hasMissingRespone = false;
  let errorMessage = '';

  if (islog)
    console.log('validateResponse', {
      isMandatory,
      responseTypeId,
      ResponseToValidate,
    });

  if (responseTypeId == responseTypeEnum.NO_RESPONSE) {
    isValidItem = true;
    hasTrueValue = true;
  } else if (isMandatory && !ResponseToValidate) {
    if (islog) console.log('validateResponse 1');
    hasMissingRespone = true;
    errorMessage = messages.mandatoryField;
    isValidItem = false;
  } else {
    if (islog) console.log('validateResponse else', {responseTypeId});
    switch (responseTypeId) {
      case responseTypeEnum.DATE:
        if (islog) console.log('validateResponse date');
        if (!isValidDate(ResponseToValidate)) {
          errorMessage = messages.invalidDate;
          isValidItem = false;
        }
        break;
      case responseTypeEnum.TEXT:
      case responseTypeEnum.AWC_CODE:
      case responseTypeEnum.AWW_NAME:
      case responseTypeEnum.FACILITY_NAME:
      case responseTypeEnum.VHSND_NAME:
      case responseTypeEnum.FACILITY_TYPE:
        if (islog) console.log('validateResponse 2');
        if (ResponseToValidate.length > 200) {
          if (islog) console.log('validateResponse 3');
          errorMessage = messages.exceedinglength;
          isValidItem = false;
        }
        break;
      case responseTypeEnum.BOOLEAN:
      case responseTypeEnum.BOOL_WITH_DONT_KNOW:
        if (islog) console.log('validateResponse 4');
        if (
          ResponseToValidate != ENUM.BooleanValues.YES &&
          ResponseToValidate != ENUM.BooleanValues.NO &&
          ResponseToValidate != ENUM.BOOL_WITH_DONT_KNOW_Values.DontKnow
        ) {
          if (islog) console.log('validateResponse 5');
          errorMessage = messages.invalidBoolean;
          isValidItem = false;
        } else {
          if (islog) console.log('validateResponse 6');
          hasTrueValue = isTrueValue([ResponseToValidate], responseTypeId);
          if (islog)
            console.log('validateResponse 7', {
              ResponseToValidate,
              hasTrueValue,
            });
        }
        break;
      case responseTypeEnum.NUMBER:
        if (islog) console.log('validateResponse 8', ResponseToValidate);
        const integerPattern = /^-?\d+$/;
        const isValidInt = integerPattern.test(ResponseToValidate);
        if (!isValidInt) {
          if (islog) console.log('validateResponse 9', ResponseToValidate);
          errorMessage = messages.invalidNumber;
          isValidItem = false;
        } else {
          if (islog) console.log('validateResponse 10', ResponseToValidate);
          hasTrueValue = isTrueValue([ResponseToValidate], responseTypeId);
          if (islog)
            console.log('validateResponse 11', {
              ResponseToValidate,
              hasTrueValue,
            });
        }
        break;
      case responseTypeEnum.FEEDING_OPTIONS:
        if (islog) console.log('validateResponse 12');
        break;
      case responseTypeEnum.IMAGE:
        if (islog) console.log('validateResponse 13');
          if (
             ResponseToValidate == ENUM.BooleanValues.BOOL_WITH_DONT_KNOW
           ) {
             errorMessage = messages.invalidBoolean;
             isValidItem = false;
           } else {
             if (islog) console.log('validateResponse 14');
             hasTrueValue = isTrueValue([ResponseToValidate], responseTypeId);
             if (islog)
               console.log('validateResponse 15', {
                 ResponseToValidate,
                 hasTrueValue,
               });
           }
           break;
       
      }
  }
  return {hasMissingRespone, errorMessage, isValidItem, hasTrueValue};
};

const validateItem = (editResponse, i, itemResponseIndex = 0) => {
  let isValidItem = true;
  let hasTrueValue = false;
  let hasMissingRespone = false;

  let ResponseToValidate = getFirstResponseByItemId(
    editResponse,
    i.ItemId,
    itemResponseIndex,
  );
  let errorMessage = '';

  //check mandatory field
  ({hasMissingRespone, errorMessage, isValidItem, hasTrueValue} =
    validateResponse(i.IsMandatory, i.ResponseTypeId, ResponseToValidate));

  if (islog)
    console.log(i.Item, {
      hasMissingRespone,
      errorMessage,
      isValidItem,
      hasTrueValue,
      Response2Type: i.Response2Type,
      hasTrueValue,
    });

  //Validate response2
  if (i.Response2Type && hasTrueValue) {
    if (islog) console.log('Response2', i.Item, i.Response2Type);
    let itemResponse2 = getFirstResponse2ByItemId(editResponse, i.ItemId);
    ({hasMissingRespone, errorMessage, isValidItem} = validateResponse(
      true,
      i.Response2Type,
      itemResponse2,
    ));

    if (hasMissingRespone) {
      isValidItem = false;
      errorMessage = 'Functional number is required';
    }
  }

  //Validate Child Items
  if (i.HasDependentChildItems && hasTrueValue) {
    if (islog) console.log(i.ItemId, 'HasDependentChildItems');
    //isValidItem = validateItems(i.Items, editResponse);
    validateItems(i.Items, editResponse, itemResponseIndex);
  }

  if (!isValidItem) {
    globalErrors.push({
      type: 'Item',
      name: i.Item,
      ...i,
      isValidItem,
      errorMessage,
      hasMissingRespone,
    });
  }

  return isValidItem;
};

const validateItems = (items, editResponse, itemResponseIndex = 0) => {
  let isValid = true;
  items.forEach(i => {
    const isValidItem = validateItem(editResponse, i, itemResponseIndex);
    if (!isValidItem) isValid = false;
  });
  return isValid;
};

const getValidationMessage = checklist => {
  let finalMessages = [];
  //if (islog)
  console.log(
    'globalErrors',
    globalErrors.slice(0, 1).map(ge => {
      return {item: ge.Item, errorMessage: ge.errorMessage};
    }),
  );
  if (globalErrors.some(ge => ge.hasMissingRespone))
    finalMessages.push(messages.commonMessageMissingField);

  globalErrors
    .filter(ge => !ge.hasMissingRespone)
    .forEach(ge => {
      if (ge.type == 'Group' && ge.HasMultipleResponse) {
        finalMessages.push(`Group ${ge.name} : ${ge.errorMessage}`);
      }
    });
  globalErrors
    .filter(ge => !ge.hasMissingRespone)
    .forEach(ge => {
      if (ge.type == 'Item') {
        finalMessages.push(`${ge.name} : ${ge.errorMessage}`);
      }
    });
  return finalMessages;
};

const validateChecklist = (checklist, editResponse) => {
  try {
    globalErrors = [];
    checklist.Groups.forEach(g => {
      let isValidGroup = true;
      let errorMessage = '';

      //H2H monitoring checklist:- if child age is less than 5 months then hide the "Complementory feeding group"
      if (g.Enum == ENUM.ChecklistGroup.H2H_MON_COMPLEMENTARY_FEEDING) {
        let childAgeResponse = editResponse.Items.find(
          i => i.ItemId === g.DependentItemId,
        );
        let ageResponse = 0;
        if (childAgeResponse?.Response?.length > 0)
          ageResponse = childAgeResponse?.Response[0];

        const childAge = getAge(
          ageResponse,
          editResponse?.MonitoringDate || new Date().toISOString(),
        );

        //if (islog)
        console.log('H2H_MON_COMPLEMENTARY_FEEDING: childAge', childAge);
        if (!isAgeGreaterThan5Months(childAge)) return;
      }

      if (g.HasMultipleResponse) {
        const groupResponses = editResponse.Items.filter(
          i => i.GroupId === g.GroupId && !i.IsDeleted,
        );

        let uniqueResponse = [];

        groupResponses.map(i => {
          if (!uniqueResponse.includes(i.ItemResponseIndex))
            uniqueResponse.push(i.ItemResponseIndex);
        });

        let hasMissingResponse = uniqueResponse.length < g.MinResponsCount;

        if (hasMissingResponse) {
          isValidGroup = false;
          errorMessage = messages.missingResposne
            .replace('{{minimumResponseCount}}', g.MinResponsCount)
            .replace('{{foundResponseCount}}', uniqueResponse.length);
        }
      } else {
        validateItems(g.Items, editResponse);
      }
      if (!isValidGroup)
        globalErrors.push({
          type: 'Group',
          name: g.Group,
          ...g,
          isValidGroup,
          errorMessage,
        });
    });

    const valiationMessages = getValidationMessage();

    return valiationMessages;
  } catch (error) {
    console.log('validation exception ', error);
    return ['Something went worng.'];
  }
};

const validateDraftChecklist = (checklist, editResponse) => {
  try {
    let centerName;
    let centerValue;
    globalErrors = [];
    if (
      checklist.Enum == ENUM.Checklist.BASELINE ||
      checklist.Enum == ENUM.Checklist.GALIDRAA ||
      checklist.Enum == ENUM.Checklist.SELF_ASSESSMENT_HINDI
    ) {
      return [];
    }
    for (let g = 0; g < checklist.Groups.length; g++) {
      let centerQuestion = checklist.Groups[g].Items.find(
        i => i.QuestionForCenterName,
      );

      if (centerQuestion) {
        centerValue = getFirstResponseByItemId(
          editResponse,
          centerQuestion.ItemId,
        );
        centerName = centerQuestion?.Item;
        break;
      }
    }
            for (let g = 0; g < checklist.Groups.length; g++) {
      checklist.Groups[g].Items.forEach(i => {
        if (i.IsHighlighted) {
          validateItem(editResponse, i);
        }
      });
    }
    let arrerrmsg = globalErrors.map(i => {
      if (i) return i.Item + ': ' + i.errorMessage;
    });
    if (!centerValue) {
      arrerrmsg = [`Please fill the '${centerName}'`, ...arrerrmsg];
    }
    return arrerrmsg;
  } catch (error) {
    console.log('validateDraftChecklist', error);
    return [
      `Something went wrong, please try again or contact administrator.'`,
    ];
  }
};

const validateMultiResponseGroup = (
  checklistId,
  groupId,
  itemResponseIndex,
) => {
  const groupInexResponses = getEditChecklistState().Items.filter(
    i => i.ItemResponseIndex === itemResponseIndex && i.GroupId === groupId,
  );
  const groupChecklistQuestion = getMasterChecklistById(
    checklistId,
  ).Groups.filter(g => g.GroupId === groupId)[0];

  globalErrors = [];
  validateItems(
    groupChecklistQuestion.Items,
    {Items: groupInexResponses},
    itemResponseIndex,
  );
  console.log(globalErrors);
  if (globalErrors.length > 0) return false;
  return true;
};

const validateEditItem = (item, itemResponseIndex) => {
  let checklistResponse = {...getEditChecklistState()};
  if (item.ResponseTypeId === responseTypeEnum.NO_RESPONSE) return false;
  return validateItem(checklistResponse, item, itemResponseIndex);
};

export {
  validateChecklist,
  validateDraftChecklist,
  validateMultiResponseGroup,
  validateResponse,
  validateEditItem,
};

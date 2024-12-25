import React from 'react';
import GroupTitle from './groupTitle';
import ChecklistItems from './checklistItems';
import GroupMultiResponse from './Group_MultipleResponse/groupMultiResponse';
import {useSelector} from 'react-redux';
import {
  getAge,
  isAgeGreaterThan5Months,
} from '../utils/helperfunctions/functions';

const ChecklistGroup = ({
  checklistId,
  group,
  parentKey,
  index,
  isReadOnly = false,
}) => {
  console.log('rendering ChecklistGroup', parentKey, index, group.Group);

  let showGroup = true;
  const dependentItemResponse = useSelector(state =>
    state.editChecklist.data?.Items?.find(
      i => i.ItemId === group.DependentItemId,
    ),
  );
  const monitoringDate = useSelector(
    state => state.editChecklist.data?.MonitoringDate,
  );

  if (group.DependentItemId) {
    const childAge = getAge(dependentItemResponse?.Response[0], (monitoringDate || new Date().toISOString()));
    showGroup =
      dependentItemResponse?.Response?.length > 0 &&
      isAgeGreaterThan5Months(childAge);
  }

  if (!showGroup) return null;

  return (
    <>
      {group.HasMultipleResponse && (
        <GroupMultiResponse
          group={group}
          checklistId={checklistId}
          parentKey={parentKey}
          index={index}
          isReadOnly={isReadOnly}
          groupItemIndex={`${String.fromCharCode(97 + index)}`}
        />
      )}
      {!group.HasMultipleResponse && (
        <>
          <GroupTitle
            title={group.Group}
            index={`${String.fromCharCode(97 + index)}`}
          />
          <ChecklistItems
            groupId={group.GroupId}
            checklistId={checklistId}
            parentKey={parentKey}
            items={group.Items}
            isReadOnly={isReadOnly}
            groupItemIndex={`${String.fromCharCode(97 + index)}`}
            groupHasMultipleResponse={group.HasMultipleResponse}
            isConditionalGroupItems={group.DependentItemId != null}
          />
        </>
      )}
    </>
  );
};

export default ChecklistGroup;

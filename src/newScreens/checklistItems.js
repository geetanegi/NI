import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ChecklistItem from './checklistItem';
import {colors} from '../global/theme';
import {clearGroupResponses} from '../utils/helperfunctions/checklistHelper';

const ChecklistItems_component = (
  {
    groupId,
    parentKey,
    items,
    itemResponseIndex = 0,
    isReadOnly = false,
    isChildItems = false,
    groupItemIndex,
    groupHasMultipleResponse,
    isConditionalGroupItems = false,
    checklistId
  },
  extendedClass = {},
) => {
  console.log(
    'rendering ChecklistItems',
    'itemResponseIndex',
    itemResponseIndex,
    isConditionalGroupItems,
  );

  useEffect(() => {
    return () => {
      if (isConditionalGroupItems) {
        console.log('Delete group response');
        clearGroupResponses(items);
      }
    };
  });

  return (
    <View style={[isChildItems && styles.childItems, extendedClass]}>
      {items?.map((item, iIndex) => (
        <ChecklistItem
          item={item}
          groupId={groupId}
          parentKey={parentKey + `_item_${iIndex}`}
          iIndex={iIndex}
          itemResponseIndex={itemResponseIndex}
          isReadOnly={isReadOnly}
          isChildItems={isChildItems}
          groupItemIndex={`${groupItemIndex}${groupItemIndex?'.':''}${iIndex+1}`}
          groupHasMultipleResponse={groupHasMultipleResponse}
          checklistId={checklistId}
        />
      ))}
    </View>
  );
};

const ChecklistItems = React.memo(ChecklistItems_component);
export default ChecklistItems;

const styles = StyleSheet.create({
  childItems: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
  },
});

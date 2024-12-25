import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemResponse from './ItemResponse';
import ChecklistItems from './checklistItems';
import {
  getDefaultItemRespnse,
  createItemResponse,
  isTrueValue,
} from '../utils/helperfunctions/checklistHelper';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearMultipleItemResponse,
  editChecklistItemResponse,
} from '../redux/reducers/editChecklistReducer';
import {ENUM} from '../utils/enum/checklistEnum';
import {colors} from '../global/theme';
import st from '../global/styles';
import {validateEditItem} from '../utils/helperfunctions/checklistValidation';
import {Card} from 'react-native-elements';
const ChecklistItem = React.memo(
  ({
    item,
    groupId,
    parentKey,
    iIndex,
    itemResponseIndex = 0,
    isReadOnly = false,
    isChildItems = false,
    groupItemIndex,
    groupHasMultipleResponse,
    checklistId,
  }) => {
    console.log(
      'Rendering ChecklistItem',
      item.Item,
      'itemResponseIndex',
      itemResponseIndex,
    );
    const findbychecklistId = useSelector(state =>
      state.checklist?.data?.find(items => items?.ChecklistId === checklistId),
    );

    const itemdata = item.Item?.split('\n');
    let itemResponse = useSelector(state =>
      state.editChecklist.data?.Items?.find(
        i =>
          i.ItemId === item.ItemId && i.ItemResponseIndex === itemResponseIndex,
      ),
    );

    itemResponse =
      itemResponse ||
      getDefaultItemRespnse(item.ItemId, groupId, itemResponseIndex);

    const dispatch = useDispatch();

    const hasTrueValue = isTrueValue(
      itemResponse.Response,
      item.ResponseTypeId,
    );

    let isValid = validateEditItem(item, itemResponseIndex);

    const handleResponseChange = (response, isSelected) => {
      if (isReadOnly) return;
      let newResponse = itemResponse.Response;
      let newResponse2 = itemResponse.Response2;

      //IS Multiselect Or ImageMultiSelect

      if (item.RenderType === ENUM.RenderType.CHECKBOX_MULTI_SELECT) {
        if (!isSelected) {
          const opIndex = itemResponse.Response.findIndex(
            op => op === response,
          );
          if (opIndex >= 0) {
            let arr = [...itemResponse.Response];
            // If the item exists, remove it
            arr.splice(opIndex, 1);
            newResponse = arr;
          }
        } else {
          // If the item doesn't exist, insert it
          newResponse = [...itemResponse.Response, response];
        }
      } else if (item.RenderType === ENUM.RenderType.DATE) {
        //IS Date
        newResponse = [response.toISOString()];
      } else {
        const tempResponse = response?.trim()
          ? [response].length > 0
            ? [response]
            : []
          : [];
        newResponse = tempResponse;
      }

      //Clear response 2 OR child items if response is false
      if (!isTrueValue(response, item.ResponseTypeId)) {
        if (item.HasDependentChildItems) {
          const childItemIds = item.Items.map(({ItemId}) => {
            return {itemId: ItemId, itemResponseIndex};
          });
          dispatch(clearMultipleItemResponse(childItemIds));
        }
      }

      const payload = {
        data: createItemResponse(itemResponse, newResponse, newResponse2), //changedItemResponse,
        QuestionForCenterName: item.QuestionForCenterName,
      };
      dispatch(editChecklistItemResponse(payload));
    };

    const handleResponse2Change = response => {
      if (isReadOnly) return;
      let changedItemResponse = {...itemResponse};
      const tempResponse = response.trim()
        ? [response].length > 0
          ? [response]
          : []
        : [];
      changedItemResponse.Response2 = tempResponse;
      const payload = {
        data: changedItemResponse,
        QuestionForCenterName: false,
        isChangedItem: true,
      };
      dispatch(editChecklistItemResponse(payload));
    };
    return (
      <View style={[styles.card, isChildItems && styles.childItems]}>
        <View style={!isReadOnly && [styles.cardBorderSty(isValid)]}>
          <View style={st.pd10}>
            {checklistId == 9 || item.ResponseType == 'IMAGE_OPTIONS' ? (
              <View style={st.wdh90}>
                <View style={[st.row]}>
                  <Text style={[st.tx14, st.txCap]}>{groupItemIndex}. </Text>
                  <Text style={[st.tx14]}>{itemdata[0]}</Text>
                </View>
                <View style={[st.row]}>
                  {itemdata.map((card, index) => (
                    <Text style={[st.tx16, st.pdT0]}>
                      {itemdata[index + 1]}
                    </Text>
                  ))}
                </View>
              </View>
            ) : (
              <View style={st.wdh90}>
                <View style={[st.row]}>
                  <Text style={[st.tx14, st.txCap]}>{groupItemIndex}. </Text>
                  <Text style={[st.tx14]}>{item?.Item}</Text>
                </View>
              </View>
            )}
            <ItemResponse
              itemId={item.ItemId}
              responseTypeId={item.ResponseTypeId}
              renderType={item.RenderType}
              options={item.Options}
              handleChange={handleResponseChange}
              response={itemResponse?.Response || []}
              inputTitle={
                item.Response1FieldName
                  ? item.Response1FieldName
                  : item.Response2Type != null
                  ? 'Total Number'
                  : false
              }
              isReadOnly={isReadOnly}
              isChildItems={isChildItems}
              itemEnum={item.Enum}
              CharLimit={item.CharLimit}
            />
            {item.Response2Type != null && (
              <ItemResponse
                itemId={item.ItemId}
                responseTypeId={item.Response2Type}
                handleChange={handleResponse2Change}
                isResponse2={true}
                response={itemResponse?.Response2 || []}
                isReadOnly={isReadOnly || !hasTrueValue}
                inputTitle={
                  item.Response2FieldName
                    ? item.Response2FieldName
                    : 'Enter value'
                }
                isChildItems={isChildItems}
                CharLimit={6}
              />
            )}
            {item.HasDependentChildItems && hasTrueValue && (
              <View style={styles.childItemsView}>
                <ChecklistItems
                  parentKey={parentKey}
                  groupId={groupId}
                  items={item.Items}
                  isReadOnly={isReadOnly}
                  itemResponseIndex={itemResponseIndex}
                  isChildItems={true}
                  groupItemIndex={groupItemIndex}
                  groupHasMultipleResponse={groupHasMultipleResponse}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  },
);

export default ChecklistItem;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    // paddingLeft: 10,
    // paddingVertical: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderTopColor: colors.grey,
    borderBottomColor: colors.grey,
    borderLeftColor: colors.grey,
    borderRightColor: colors.grey,
    backgroundColor: colors.white,
  },
  childItemsView: {
    marginTop: 10,
  },
  childItems: {
    borderWidth: 0,
    marginVertical: 0,
    // marginBottom: 5,
  },
  cardBorderSty: IsValid => ({
    borderRightWidth: 10,
    borderRightColor: IsValid ? colors.green : colors.white,
    borderRadius: 10,
  }),
});

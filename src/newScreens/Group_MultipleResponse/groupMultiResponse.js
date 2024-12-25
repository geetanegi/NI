import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FullScreenPopup from '../../components/fullScreenPopup';
import {useDispatch, useSelector} from 'react-redux';
import {clearMultipleItemResponse} from '../../redux/reducers/editChecklistReducer';
import GroupTitle from '../groupTitle';
import ChecklistItems from '../checklistItems';
import {
  clearGroupResponses,
  getFlatItems,
} from '../../utils/helperfunctions/checklistHelper';
import Button from '../../components/button';
import st from '../../global/styles';
import {colors} from '../../global/theme';
import {validateMultiResponseGroup} from '../../utils/helperfunctions/checklistValidation';
import PopUpMessage from '../../components/popup';

const GroupMultiResponse = ({
  checklistId,
  group,
  parentKey,
  index,
  isReadOnly,
  groupItemIndex,
}) => {
  console.log('Rendering GroupMultiResponse');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [twoButton, setTwoButton] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [beneficiaryIndex, setBeneficiaryIndex] = useState();

  const groupAllResponses = useSelector(state =>
    state.editChecklist.data.Items.filter(i => i.GroupId === group.GroupId).map(
      ({ItemResponseIndex, IsDeleted}) => {
        return {
          ItemResponseIndex,
          IsDeleted: IsDeleted == undefined ? false : IsDeleted,
        };
      },
    ),
  );

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
          if (twoButton) {
            handleRemoveBeneficaryClick(beneficiaryIndex);
          }
        }}
        twoButton={twoButton}
        onPressNoBtn={() => {
          setPopupMessageVisibility(false);
        }}
      />
    );
  };

  //console.log('groupAllResponses.filter(i => i.IsDeleted != true)', groupAllResponses.filter(i => i.IsDeleted == false))
  const groupAllResponse_UniqueIndex = [
    ...new Set(
      groupAllResponses
        .filter(i => i.IsDeleted === false)
        .map(i => i.ItemResponseIndex),
    ),
  ];
  console.log('groupAllResponse_UniqueIndex', groupAllResponse_UniqueIndex);
  const groupResponses = groupAllResponse_UniqueIndex.sort((a, b) => a - b);

  //console.log('groupResponses', groupResponses);

  const [showPopup, setShowPopup] = useState(false);
  const [newResponseIndex, setNewResponseIndex] = useState();
  //console.log('newResponseIndex', newResponseIndex);

  const dispatch = useDispatch();

  const handleAddClick = () => {
    if (isReadOnly) return;

    const groupAllResponses_sorted = groupAllResponses.sort(
      (a, b) => a.ItemResponseIndex - b.ItemResponseIndex,
    );
    //console.log('groupAllResponses_sorted', groupAllResponses_sorted)
    setNewResponseIndex(
      groupAllResponses_sorted.length > 0
        ? groupAllResponses_sorted[groupAllResponses_sorted.length - 1]
            ?.ItemResponseIndex + 1
        : 0,
    );
    setShowPopup(true);
  };

  const handleSaveBeneficaryClick = () => {
    if (
      validateMultiResponseGroup(checklistId, group.GroupId, newResponseIndex)
    ) {
      setShowPopup(false);
    } else {
      setTitle('Oops!');
      setSubtitle(
        'Please fill all the Mandatory fields in the Checklist to continue.',
      );
      setTwoButton(false);
      setPopupMessageVisibility(true);
    }
  };

  const handleRemoveBeneficaryClick = removeResponseIndex => {
    if (isReadOnly) return;
    clearGroupResponses(group.Items, removeResponseIndex);
    setShowPopup(false);
  };

  return (
    <View style={styles.container}>
      <GroupTitle
        title={group.Group}
        showAddButton={group.HasMultipleResponse && !isReadOnly}
        onAddClick={handleAddClick}
        index={`${String.fromCharCode(97 + index)}`}
      />
      {groupResponses.map(gr => (
        <View key={parentKey + `_grIndex_${gr}`} style={styles.oneResponse}>
          <View style={[st.align_E]}>
            {!isReadOnly && (
              <Pressable
                onPress={() =>
                  // handleRemoveBeneficaryClick(gr)
                  {
                    setBeneficiaryIndex(gr);
                    setTitle('Are you sure?!');
                    setSubtitle('Do you want to delete it?');
                    setTwoButton(true);
                    onPopupMessageModalClick(!popupMessageVisibility);
                  }
                }>
                <Text style={[st.tx14, st.txDecor, {color: colors.indian_red}]}>
                  {'Remove'}
                </Text>
              </Pressable>
            )}
          </View>
          <ChecklistItems
            groupId={group.GroupId}
            parentKey={parentKey + `_grIndex_${gr}`}
            items={group.Items}
            itemResponseIndex={gr}
            isReadOnly={true}
            isChildItems={true}
            groupItemIndex={''}
            groupHasMultipleResponse={group.HasMultipleResponse}
          />
        </View>
      ))}
      {showPopup && !isReadOnly && (
        <FullScreenPopup
          title="Add Beneficiary"
          onSave={handleSaveBeneficaryClick}
          onClose={() => handleRemoveBeneficaryClick(newResponseIndex)}>
          <ChecklistItems
            groupId={group.GroupId}
            parentKey={parentKey + `_grIndex_${newResponseIndex}`}
            items={group.Items}
            itemResponseIndex={newResponseIndex}
            isReadOnly={isReadOnly}
            groupItemIndex={''}
            groupHasMultipleResponse={group.HasMultipleResponse}
          />
        </FullScreenPopup>
      )}
      {show_alert_msg()}
    </View>
  );
};

export default GroupMultiResponse;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  oneResponse: {
    // backgroundColor: colors.white,
    marginTop: 15,
  },
});

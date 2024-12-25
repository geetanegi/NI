import {createSlice} from '@reduxjs/toolkit';
import {act} from 'react-test-renderer';

const initialState = {
  // Items: []
  data: {
    Items: [],
  },
};

export const editChecklistSlice = createSlice({
  name: 'EditChecklist',
  initialState,
  reducers: {
    setEditChecklist: (state, action) => {
      state.data = action.payload;
    },

    editChecklistItemResponse: (state, action) => {
      const {data, QuestionForCenterName} = action.payload;

      data['IsDeleted'] = false;
      data.UpdatedOn = new Date().toISOString();
      const itemIndex = state.data.Items.findIndex(
        item =>
          item.ItemId === data.ItemId &&
          item.ItemResponseIndex == data.ItemResponseIndex,
      );
      if (itemIndex >= 0) {
        state.data.Items[itemIndex] = data;
      } else {
        state.data.Items.push(data);
      }

      state.data.UpdatedOn = new Date().toISOString();
      state.data.isChangedItem = true;

      if (QuestionForCenterName) {
        state.data.CenterName =
          data.Response?.length > 0 ? data.Response[0] : null;
      }
    },

    setMonitoringDate: (state, action) => {
      state.data.MonitoringDate = action.payload;
    },

    clearMultipleItemResponse: (state, action) => {
      const itemsToRemove = action.payload;
      state.data.Items = state.data.Items.map(i => {
        if (
          itemsToRemove.some(
            cid =>
              cid.itemId === i.ItemId &&
              cid.itemResponseIndex === i.ItemResponseIndex,
          )
        ) {
          i.IsDeleted = true;
          i.Response = [];
          i.Response2 = [];
          i.UpdatedOn = new Date().toISOString();
        }
        return i;
      });
    },

    clearStateEditChecklist: state => {
      console.log('clearStateEditChecklist');
      state.data = {
        ClientId: null,
        Items: [],
      };
    },
  },
});

export const {
  setEditChecklist,
  editChecklistItemResponse,
  clearMultipleItemResponse,
  clearStateEditChecklist,
  setMonitoringDate
} = editChecklistSlice.actions;

export default editChecklistSlice.reducer;

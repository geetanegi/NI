import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const saveCheckListSlice = createSlice({
  name: 'SaveCheckList',
  initialState,
  reducers: {
    addSaveCheckList: (state, action) => {
      const itemIndex = state.data.findIndex(
        item => item.ClientId === action.payload.ClientId,
      );
      if (itemIndex >= 0) {
        state.data[itemIndex] = action.payload;
      } else {
        state.data.push(action.payload);
      }
    },

    updateSaveChecklistSyncStatus: (state, action) => {
      const {syncStatus, id, syncAttempt, ErrorMessage} = action.payload;
      const itemToUpdate = state.data?.find(item => item.ClientId === id);
      if (itemToUpdate) {
        itemToUpdate.ClientId = id;
        itemToUpdate.syncStatus = syncStatus;
        itemToUpdate.ErrorMessage = ErrorMessage;
        itemToUpdate.syncAttempt = syncAttempt;
      }
    },

    clearSaveCheckList: state => {
      state.data = [];
    },

    deleteSaveCheckList: (state, action) => {
      const data = action.payload;
      let itemToUpdate = state.data;
      data?.forEach(res => {
        itemToUpdate = itemToUpdate?.filter(item => item.ClientId !== res);
      });

      state.data = itemToUpdate;
    },
  },
});

export const {
  addSaveCheckList,
  clearSaveCheckList,
  deleteSaveCheckList,
  updateSaveChecklistSyncStatus,
} = saveCheckListSlice.actions;

export default saveCheckListSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const checklistFlowSlice = createSlice({
  name: 'CheckList',
  initialState,
  reducers: {
    setCheckList: (state, action) => {
      state.data = action.payload;
    },

    clearCheckList: state => {
      state.data = null;
    },
  },
});

export const {setCheckList, clearCheckList} = checklistFlowSlice.actions;

export default checklistFlowSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {
    archiveList: [],
    startDate: null,
    endDate: null,
  },
};

export const ArchiveFlowSlice = createSlice({
  name: 'Archive',
  initialState,
  reducers: {
    setArchive: (state, action) => {
      state.data.archiveList = action.payload;
    },
    setStartDate: (state, action) => {
      state.data.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.data.endDate = action.payload;
    },

    clearArchive: state => {
      state.data = {
        archiveList: [],
        startDate: null,
        endDate: null,
      };
    },
  },
});

export const {setArchive, clearArchive, setStartDate, setEndDate} =
  ArchiveFlowSlice.actions;

export default ArchiveFlowSlice.reducer;

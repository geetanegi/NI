import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const colorFlowSlice = createSlice({
  name: 'Color',
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.data = action.payload;
    },

    clearColor: state => {
      state.data = null;
    },
  },
});

export const {setColor, clearColor} = colorFlowSlice.actions;

export default colorFlowSlice.reducer;

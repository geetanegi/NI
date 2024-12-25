import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const locationSlice = createSlice({
  name: 'Location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.data = action.payload;
    },

    clearLocation: state => {
      state.data = null;
    },
  },
});

export const {setLocation, clearLocation} = locationSlice.actions;

export default locationSlice.reducer;

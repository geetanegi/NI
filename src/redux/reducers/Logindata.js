import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const logindataSlice = createSlice({
  name: 'Logindata',
  initialState,
  reducers: {
    setLogindata: (state, action) => {
      state.data = action.payload;
    },

    cleanLogindata: state => {
      state.data = null;
    },
  },
});

export const {setLogindata, cleanLogindata} = logindataSlice.actions;

export default logindataSlice.reducer;

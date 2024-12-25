import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const PdfSlice = createSlice({
  name: 'Pdf',
  initialState,
  reducers: {
    setPdf: (state, action) => {
      state.data = action.payload;
    },

    clearPdf: state => {
      state.data = null;
    },
  },
});

export const {setPdf, clearPdf} = PdfSlice.actions;

export default PdfSlice.reducer;

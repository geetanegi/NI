import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const imageSlice = createSlice({
  name: 'Image',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.data = action.payload;
    },

    clearImage: state => {
      state.data = null;
    },
  },
});

export const {setImage, clearImage} = imageSlice.actions;

export default imageSlice.reducer;

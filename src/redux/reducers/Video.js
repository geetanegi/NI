import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const videoSlice = createSlice({
  name: 'Video',
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state.data = action.payload;
    },

    clearVideo: state => {
      state.data = null;
    },
  },
});

export const {setVideo, clearVideo} = videoSlice.actions;

export default videoSlice.reducer;

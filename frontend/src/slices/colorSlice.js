import { createSlice } from '@reduxjs/toolkit';

const colorSlice = createSlice({
  name: 'color',
  initialState: {
    availableColors: [], // Initialize with your data
    selectedColor: '',
  },
  reducers: {
    setAvailableColors: (state, action) => {
      state.availableColors = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
  },
});

export const { setAvailableColors, setSelectedColor} = colorSlice.actions;
export const selectAvailableColors = (state) => state.color.availableColors;
export const selectSelectedColor = (state) => state.color.selectedColor;


export default colorSlice.reducer;
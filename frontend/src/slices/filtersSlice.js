import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filter',
  initialState: {
    availableColors: [],
    selectedColor: '',
    availableSizes: [],
    selectedSize: '',
    availableBrands: [],
    selectedBrand: '',
  },
  reducers: {
    setAvailableColors: (state, action) => {
      state.availableColors = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setAvailableSizes: (state, action) => {
      state.availableSizes = action.payload;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    setAvailableBrands: (state, action) => {
      state.availableBrands = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
  },
});

export const {
  setAvailableColors,
  setSelectedColor,
  setAvailableSizes,
  setSelectedSize,
  setAvailableBrands,
  setSelectedBrand,
} = filtersSlice.actions;


export const selectAvailableColors = (state) => state.filters.availableColors;
export const selectSelectedColor = (state) => state.filters.selectedColor;
export const selectAvailableSizes = (state) => state.filters.availableSizes;
export const selectSelectedSize = (state) => state.filters.selectedSize;
export const selectAvailableBrands = (state) => state.filters.availableBrands;
export const selectSelectedBrand = (state) => state.filters.selectedBrand;



export default filtersSlice.reducer;
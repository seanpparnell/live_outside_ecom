// filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    availableColors: [],
    selectedColor: '',
    selectedColorImgPath: '',
    availableSizes: {},
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
    setSelectedColorImgPath: (state, action) => {
      state.selectedColorImgPath = action.payload
    },
    setAvailableSizesForColor: (state, action) => {
      const { color, sizes } = action.payload;
      state.availableSizes[color] = sizes;
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
  setAvailableSizesForColor,
  setSelectedSize,
  setAvailableBrands,
  setSelectedBrand,
  setSelectedColorImgPath
} = filtersSlice.actions;

export const selectAvailableColors = (state) => state.filters.availableColors;
export const selectSelectedColor = (state) => state.filters.selectedColor;
export const selectSelectedColorImgPath = (state) => state.filters.selectedColorImgPath;
export const selectAvailableSizesForColor = (state) => state.filters.availableSizes;
export const selectSelectedSize = (state) => state.filters.selectedSize;
export const selectAvailableBrands = (state) => state.filters.availableBrands;
export const selectSelectedBrand = (state) => state.filters.selectedBrand;

export default filtersSlice.reducer;

// filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    availableColors: [],
    selectedColor: '',
    selectedColorImgPath: '',
    availableSizesQtyForColor: [], // Correct property name
    selectedSize: '',
    selectQtyForSizeColor: {},
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
    setAvailableSizesQtyForColor: (state, action) => {
      state.availableSizesQtyForColor = action.payload
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    setQtyForSizeColor: (state, action) => {
      const { color, size, qty } = action.payload;
      state.qtyForSizeColor[color + size] = qty; // Use a unique key for each color-size combination
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
  setAvailableSizesQtyForColor,
  setSelectedSize,
  setQtyForSizeColor,
  setAvailableBrands,
  setSelectedBrand,
  setSelectedColorImgPath
} = filtersSlice.actions;

export const selectAvailableColors = (state) => state.filters.availableColors;
export const selectSelectedColor = (state) => state.filters.selectedColor;
export const selectSelectedColorImgPath = (state) => state.filters.selectedColorImgPath;
export const selectAvailableSizesQtyForColor = (state) => state.filters.availableSizesQtyForColor; // Corrected property name
export const selectSelectedSize = (state) => state.filters.selectedSize;
export const selectQtyForSizeColor = (state) => state.filters.selectedQtyForSizeColor;
export const selectAvailableBrands = (state) => state.filters.availableBrands;
export const selectSelectedBrand = (state) => state.filters.selectedBrand;

export default filtersSlice.reducer;


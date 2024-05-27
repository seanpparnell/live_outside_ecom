import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: localStorage.getItem("categoryId")
    ? JSON.parse(localStorage.getItem("categoryId"))
    : null,
  subCategories: []
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategoryId: (state, action) => {
      const newId = action.payload;
      state.categoryId = newId;
      localStorage.setItem("categoryId", JSON.stringify(newId));
    },
    addSubCategories: (state, action) => {
      state.subCategories = action.payload;
    }
  },
});

export const { addCategoryId, addSubCategories } = categorySlice.actions;

export default categorySlice.reducer;
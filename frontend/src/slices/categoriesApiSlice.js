import { CATEGORIES_URL, PRODUCTS_IN_CATEGORY } from "../constants";
import { apiSlice } from "./apiSlice";

export const CategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => {
        // console.log("Fetching categories..."); 
        return {
          url: CATEGORIES_URL,
        };
      },
      keepUnusedDataFor: 5,
    }),
    getProductsInCategory: builder.query({
      query: (categoryId) => {
        return {
          url: PRODUCTS_IN_CATEGORY.replace(":id", categoryId),
        };
      },
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsInCategoryQuery } = CategoriesApiSlice;

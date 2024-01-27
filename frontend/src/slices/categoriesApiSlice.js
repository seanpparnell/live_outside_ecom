import { CATEGORIES_URL, PRODUCTS_IN_CATEGORY } from "../constants";
import { apiSlice } from "./apiSlice";

export const CategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsInCategory: builder.query({
      query: (categoryId) => {
        console.log('categoryId:::::', categoryId);
        return {
          url: PRODUCTS_IN_CATEGORY.replace(":id", categoryId.category),
        };
      },
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsInCategoryQuery } = CategoriesApiSlice;

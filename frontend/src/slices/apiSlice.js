import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Category", "Order", "User"],
  endpoints: (builder) => ({}),
});

export const {useGetCategoriesQuery, useGetProductsQuery, useGetProductsInCategoryQuery } = apiSlice;
import { TCategories } from "../../../types";
import { baseApi } from "../../baseApi/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query<TCategories, void>({
      query: () => `/products/categories`,
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoryApi;

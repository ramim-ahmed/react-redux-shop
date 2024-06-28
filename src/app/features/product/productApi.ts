import { TProductApiResponse } from "../../../types";
import { baseApi } from "../../baseApi/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<TProductApiResponse, void>({
      query: () => "/products",
    }),
  }),
});

export const { useFetchProductsQuery } = productApi;

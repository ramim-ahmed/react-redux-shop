import { TProduct, TProductApiResponse } from "../../../types";
import { baseApi } from "../../baseApi/baseApi";
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<TProductApiResponse, void>({
      query: () => `/products/?limit=0&skip=0`,
    }),
    fetchSingleProduct: builder.query<TProduct, string | undefined>({
      query: (id: string) => `/products/${id}`,
    }),
  }),
});

export const { useFetchProductsQuery, useFetchSingleProductQuery } = productApi;

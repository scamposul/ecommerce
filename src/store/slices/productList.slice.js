import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productListSlice = createSlice({
  name: "productList",
  initialState: [],
  reducers: {
    callProducts: (state, action) => {
      const products = action.payload;
      return products;
    },
  },
});

export const { callProducts } = productListSlice.actions;

export default productListSlice.reducer;

export const getProductListThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
  axios
    .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
    .then((res) => dispatch(callProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

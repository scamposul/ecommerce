import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const getCartThunk = () => (dispatch) => {
  return axios
    .get(`https://e-commerce-api.academlo.tech/api/v1/cart`, getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart.products)));
};

export const addToCartThunk = (cart) => (dispatch) => {
  return axios
    .post(
      `https://e-commerce-api.academlo.tech/api/v1/cart`,
      cart,
      getConfig()
    )
    .then(() => dispatch(getCartThunk()));
};

export const purchaseCartThunk = () => (dispatch) => {
  return axios
    .post(
      `https://e-commerce-api.academlo.tech/api/v1/purchases`,
      {},
      getConfig()
    )
    .then(() => dispatch(setCart([])));
};


export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

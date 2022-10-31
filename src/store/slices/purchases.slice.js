import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    },
  },
});

export const getPurchasesThunk = () => (dispatch) => {
  return axios
    .get(
      `https://e-commerce-api.academlo.tech/api/v1/purchases`,
      getConfig()
    )
    .then((res) => dispatch(setPurchases(res.data.data.purchases)));
};


export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;

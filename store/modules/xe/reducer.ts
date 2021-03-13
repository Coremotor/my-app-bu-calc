import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct, TProductState } from "./types";

const initialState: TProductState = {
  products: [],
};

const userSlice = createSlice({
  name: "xe",
  initialState,
  reducers: {
    addProduct(state: TProductState, action: PayloadAction<TProduct>) {
      state.products.push(action.payload);
    },
    removeProduct(state: TProductState, action: PayloadAction<string>) {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = userSlice.actions;

export default userSlice.reducer;

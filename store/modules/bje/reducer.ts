import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBJEProduct, TBJEProductState } from "./types";

const initialState: TBJEProductState = {
  bjeProducts: [],
};

const userSlice = createSlice({
  name: "bje",
  initialState,
  reducers: {
    addBjeProduct(state: TBJEProductState, action: PayloadAction<TBJEProduct>) {
      state.bjeProducts.push(action.payload);
    },
    removeBjeProduct(state: TBJEProductState, action: PayloadAction<string>) {
      state.bjeProducts = state.bjeProducts.filter((bjeProduct) => bjeProduct.id !== action.payload);
    },
  },
});

export const { addBjeProduct, removeBjeProduct } = userSlice.actions;

export default userSlice.reducer;

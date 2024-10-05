import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SingleProduct from "../../types";

export interface CartState {
  cart: SingleProduct[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart?.quantity) {
        itemInCart.quantity++;
      } else {
        state.cart = state.cart.concat({ ...action.payload, quantity: 1 });
      }
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart?.quantity) {
        itemInCart.quantity++;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart?.quantity && itemInCart.quantity > 1) {
        itemInCart.quantity--;
      } else if (itemInCart?.quantity && itemInCart.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SingleProduct from "../../types";

export interface CartState {
  cart: SingleProduct[];
  totalPrice: number;
  totalQuantity: number;
}

interface UpdateQuantityPayload {
  itemId: number;
  quantity: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const calculateTotal = (cart: SingleProduct[]) => {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity!;
  });

  return totalPrice;
};

const calculateQuantity = (cart: SingleProduct[]) => {
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity!;
  });

  return totalQuantity;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<SingleProduct>) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart?.quantity) {
        itemInCart.quantity++;
      } else {
        state.cart = state.cart.concat({ ...action.payload, quantity: 1 });
      }

      state.totalPrice = calculateTotal(state.cart);
      state.totalQuantity = calculateQuantity(state.cart);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart?.quantity) {
        itemInCart.quantity++;
      }

      state.totalPrice = calculateTotal(state.cart);
      state.totalQuantity = calculateQuantity(state.cart);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart?.quantity && itemInCart.quantity > 1) {
        itemInCart.quantity--;
      } else if (itemInCart?.quantity && itemInCart.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }

      state.totalPrice = calculateTotal(state.cart);
      state.totalQuantity = calculateQuantity(state.cart);
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);

      state.totalPrice = calculateTotal(state.cart);
      state.totalQuantity = calculateQuantity(state.cart);
    },

    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const {itemId, quantity} = action.payload;
      const itemInCart = state.cart.find((item) => item.id === itemId);

      if(itemInCart) {
        itemInCart.quantity = quantity;
      }

      state.totalPrice = calculateTotal(state.cart);
      state.totalQuantity = calculateQuantity(state.cart);

    }
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem, updateQuantity } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice;

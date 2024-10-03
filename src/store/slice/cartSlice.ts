import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ProductType } from "../../types";

export interface CartState {
    cart: ProductType[];
}

interface IncereaseQuantityPayload {
    id: number;
}

interface DecreaseQuantityPayload{
    id: number;
}

interface RemoveQuantityPayload{
    id: number;
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {cart: []} as CartState,
    reducers: {

        addToCart: (state, action) => {
            const itemInCart = state.cart.find(
                (item) => item.id === action.payload.id
            );

            if(itemInCart) {
                if(itemInCart.quantity !== undefined) {
                    itemInCart.quantity++;
                }
            } else {
                state.cart.push({...action.payload, quantity: 1});
            }
        },

        increaseQuantity: (state, action: PayloadAction<IncereaseQuantityPayload>) => {
            const item = state.cart.find((item) => item.id === action.payload.id); 
            if(item && item.quantity !== undefined) {
                item.quantity++;
            }
        },

        decreaseQuantity: (state, action: PayloadAction<DecreaseQuantityPayload>) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if(item && item.quantity !== undefined && item.quantity > 1){
                item.quantity--;
            }
        },

        removeItem: (state, action: PayloadAction<RemoveQuantityPayload>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        }
    },
});

export const {addToCart, increaseQuantity, decreaseQuantity, removeItem} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice;
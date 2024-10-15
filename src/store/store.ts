import {configureStore} from "@reduxjs/toolkit";
import {cartReducer} from "../store/slice/cartSlice"
import { loadFromLocalStorage, saveToLocalStorage } from "../helpers/localStorageHelpers";

const preloadedState = {
    cart: loadFromLocalStorage(),
  };
  
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });
  
  store.subscribe(() => {
    const state = store.getState().cart;
    saveToLocalStorage(state);
  });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =  typeof store.dispatch;
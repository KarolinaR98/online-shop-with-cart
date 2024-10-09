import { CartState } from "./store/slice/cartSlice";

export const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem("cartState");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.warn("Failed to load state from localStorage", e);
      return undefined;
    }
  };
  
  export const saveToLocalStorage = (state: CartState) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("cartState", serializedState);
    } catch (e) {
      console.warn("Failed to save state to localStorage", e);
    }
  };
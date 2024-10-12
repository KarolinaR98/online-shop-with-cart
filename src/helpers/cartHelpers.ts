import SingleProduct from "../types";

export const calculateTotal = (cart: SingleProduct[]) => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity!;
    });
  
    return totalPrice;
  };
  
export const calculateQuantity = (cart: SingleProduct[]) => {
    let totalQuantity = 0;
  
    cart.forEach((item) => {
      totalQuantity += item.quantity!;
    });
  
    return totalQuantity;
  };
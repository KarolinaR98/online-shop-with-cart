import styles from "./CartTable.module.css";
import emptyCart from "/empty-cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} from "../store/slice/cartSlice";
import SingleProduct from "../types";
import { useEffect, useState } from "react";

const CartTable = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalPrice = useSelector(
    (state: RootState) => state.cart.totalPrice
  );
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState<{
    [id: number]: number | string;
  }>({});

  const calculateSubtotal = (product: SingleProduct): number => {
    return product.price * product.quantity!;
  };

  const handleOnFocus = (itemId: number) => {
    setQuantities((prev) => ({ ...prev, [itemId]: "" }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ): void => {
    setQuantities((prev) => ({ ...prev, [itemId]: e.target.value }));
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ): void => {
    const value = e.target.value.trim();
    const parsedValue = Number(value);

    console.log(value);
    if (!value || isNaN(parsedValue)) {
      dispatch(updateQuantity({ itemId, quantity: 1 }));
    } else if (parsedValue < 1) {
      dispatch(updateQuantity({ itemId, quantity: 1 }));
    } else if (parsedValue > 99) {
      dispatch(updateQuantity({ itemId, quantity: 99 }));
    } else {
      dispatch(updateQuantity({ itemId, quantity: parsedValue }));
    }

    setQuantities((prev) => ({ ...prev, [itemId]: parsedValue || 1 }));
  };

  useEffect(() => {
    const updatedQuantities: { [id: number]: number } = {};

    cartItems.forEach((product) => {
      updatedQuantities[product.id] = product.quantity!;
    });

    setQuantities(updatedQuantities);
  }, [cartItems]);


  return (
    <>
      <h2 className="heading">Your Cart</h2>
      {cartItems.length ? (
        <div>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th className={styles.removeCol}></th>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => {
                return (
                  <tr key={product.id}>
                    <td className={styles.removeCol}>
                      <button
                        className={`${styles.roundBtn} ${styles.removeBtn}`}
                        onClick={() => dispatch(removeItem(product.id))}
                      >
                        X
                      </button>
                    </td>
                    <td>
                      <img
                        className={styles.productPhoto}
                        src={product.url}
                        alt="Product"
                      />
                    </td>
                    <td>
                      <span className={styles.cellHeader}>Product:</span>
                      {product.name}
                    </td>
                    <td>
                      <span className={styles.cellHeader}>Price:</span>$
                      {product.price}
                    </td>
                    <td>
                      <span className={styles.cellHeader}>Quantity:</span>
                      <div className={styles.quantityHolder}>
                        <button
                          className={styles.roundBtn}
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                        >
                          <span className={styles.roundBtnContent}>-</span>
                        </button>
                        <input
                          className={styles.quantityNumber}
                          value={quantities[product.id] || ""}
                          onFocus={() => {
                            handleOnFocus(product.id);
                          }}
                          onChange={(e) => handleInputChange(e, product.id)}
                          onBlur={(e) => handleBlur(e, product.id)}
                        />
                        <button
                          className={styles.roundBtn}
                          onClick={() => dispatch(increaseQuantity(product.id))}
                        >
                          <span className={styles.roundBtnContent}>+</span>
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className={styles.cellHeader}>Subtotal:</span>$
                      {calculateSubtotal(product).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}></td>
                <td className={styles.totalPrice}>
                  <span className={styles.cellHeader}>Total:</span>$
                  {totalPrice.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className={styles.proceedBtnHolder}>
            <button className={styles.proceedBtn}>Proceed to checkout</button>
          </div>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <img className={styles.emptyCartIcon} src={emptyCart} alt="Empty Cart" />
          <h3 className={styles.emptyCartHeading}>Your cart is empty</h3>
          <p className={styles.emptyCartText}>Looks like you have not added anything to your cart. Go ahead and explore our products!</p>
        </div>
      )}
    </>
  );
};

export default CartTable;

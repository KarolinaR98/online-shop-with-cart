import styles from "./CartTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  calculateSubtotal,
  updateQuantity,
} from "../store/slice/cartSlice";

const CartTable = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cart);
  const totalPrice = useSelector(
    (state: RootState) => state.cartReducer.totalPrice
  );
  const dispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ): void => {
    const value = e.target.value;
    const quantity = Number(e.target.value);

    if (/^[+-]?\d+(\.\d+)?$/.test(value)) return;

    if (quantity > 0 && quantity < 100) {
      dispatch(updateQuantity({ itemId, quantity }));
    }
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ): void => {
    const value = e.target.value;

    if (value === "" || Number(value) < 1) {
      dispatch(updateQuantity({ itemId, quantity: 1 }));
    }
  };

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
                          type="number"
                          defaultValue={product.quantity}
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
                      {calculateSubtotal(cartItems, product.id).toFixed(2)}
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
        <div className={styles.emptyCart}>Empty</div>
      )}
    </>
  );
};

export default CartTable;

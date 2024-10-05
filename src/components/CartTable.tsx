import styles from "./CartTable.module.css";
import removeIcon from "/remove-icon.png";
import plusIcon from "/plus-icon.png";
import minusIcon from "/minus-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import SingleProduct from "../types";
import { removeItem, increaseQuantity, decreaseQuantity } from "../store/slice/cartSlice";

const CartTable = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const getTotal = (cartItems: SingleProduct[]) => {
    let totalPrice: number = 0;

    cartItems.forEach((item) => {
      totalPrice += item.quantity! * item.price;
    });

    return totalPrice;
  };

  const getSubtotal = (cartItem: SingleProduct) => {
    return cartItem.price * cartItem.quantity!;
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
                        className={styles.btnRemove}
                        onClick={() => dispatch(removeItem(product.id))}
                      >
                        <img
                          className={styles.removeIcon}
                          src={removeIcon}
                          alt="Remove"
                        />
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
                          className={styles.btnPlus}
                          onClick={() => dispatch(increaseQuantity(product.id))}
                        >
                          <img
                            className={styles.plusIcon}
                            src={plusIcon}
                            alt="Plus"
                          />
                        </button>
                        <span className={styles.quantityNumber}>
                          {product.quantity}
                        </span>
                        <button
                          className={styles.btnMinus}
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                        >
                          <img
                            className={styles.minusIcon}
                            src={minusIcon}
                            alt="Minus"
                          />
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className={styles.cellHeader}>Subtotal:</span>
                      ${(getSubtotal(product)).toFixed(2)}
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
                  {(getTotal(cartItems)).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className={styles.proceedBtnHolder}>
            <button className={styles.proceedBtn}>
              Proceed to checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.emptyCart}>Empty</div>
      )}
    </>
  );
};

export default CartTable;

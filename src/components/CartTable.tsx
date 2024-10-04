import CartTableCSS from "./CartTable.module.css";
import removeIcon from "/remove-icon.png";
import plusIcon from "/plus-icon.png";
import minusIcon from "/minus-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ProductType } from "../types";
import { removeItem, increaseQuantity, decreaseQuantity } from "../store/slice/cartSlice";

const CartTable = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const removeFromCart = (product: ProductType) => {
    dispatch(removeItem(product));
  };

  const increaseProductQuantity = (product: ProductType) => {
    dispatch(increaseQuantity(product));
  }

  const decreaseProductQuantity = (product: ProductType) => {
    dispatch(decreaseQuantity(product));
  }

  const getTotal = (cartItems: ProductType[]) => {
    let totalPrice: number = 0;

    cartItems.forEach((item) => {
      totalPrice += item.quantity! * item.price;
    });

    return totalPrice;
  };

  const getSubtotal = (cartItem: ProductType) => {
    return cartItem.price * cartItem.quantity!;
  };

  return (
    <>
      <h2 className="heading">Your Cart</h2>
      {cartItems.length ? (
        <div>
          <table className={CartTableCSS.productTable}>
            <thead>
              <tr>
                <th className={CartTableCSS.removeCol}></th>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className={CartTableCSS.removeCol}>
                      <button
                        className={CartTableCSS.btnRemove}
                        onClick={() => removeFromCart(item)}
                      >
                        <img
                          className={CartTableCSS.removeIcon}
                          src={removeIcon}
                          alt="Remove"
                        />
                      </button>
                    </td>
                    <td>
                      <img
                        className={CartTableCSS.productPhoto}
                        src={item.url}
                        alt="Product"
                      />
                    </td>
                    <td>
                      <span className={CartTableCSS.cellHeader}>Product:</span>
                      {item.name}
                    </td>
                    <td>
                      <span className={CartTableCSS.cellHeader}>Price:</span>$
                      {item.price}
                    </td>
                    <td>
                      <span className={CartTableCSS.cellHeader}>Quantity:</span>
                      <div className={CartTableCSS.quantityHolder}>
                        <button
                          className={CartTableCSS.btnPlus}
                          onClick={() => increaseProductQuantity(item)}
                        >
                          <img
                            className={CartTableCSS.plusIcon}
                            src={plusIcon}
                            alt="Plus"
                          />
                        </button>
                        <span className={CartTableCSS.quantityNumber}>
                          {item.quantity}
                        </span>
                        <button
                          className={CartTableCSS.btnMinus}
                          onClick={() => decreaseProductQuantity(item)}
                        >
                          <img
                            className={CartTableCSS.minusIcon}
                            src={minusIcon}
                            alt="Minus"
                          />
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className={CartTableCSS.cellHeader}>Subtotal:</span>
                      ${(getSubtotal(item)).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}></td>
                <td className={CartTableCSS.totalPrice}>
                  <span className={CartTableCSS.cellHeader}>Total:</span>$
                  {(getTotal(cartItems)).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className={CartTableCSS.proceedBtnHolder}>
            <button className={CartTableCSS.proceedBtn}>
              Proceed to checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={CartTableCSS.emptyCart}>Empty</div>
      )}
    </>
  );
};

export default CartTable;

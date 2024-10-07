import { Link } from "react-router-dom";
import logo from "/logo.png";
import cartIcon from "/bag-icon.png";
import emptyCart from "/empty-cart.png";
import styles from "./Navbar.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cart);
  const totalPrice = useSelector((state: RootState)=> state.cartReducer.totalPrice);
  const totalQuantity = useSelector((state: RootState) => state.cartReducer.totalQuantity); 

  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const dropdownCart = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    let handler = (e: MouseEvent | TouchEvent) => {
      if(dropdownCart.current && !dropdownCart.current.contains(e.target as Node)){
        setCartVisible(false)
      }
    }

    document.addEventListener("mousedown", handler);
  });

  return (
    <>
      <nav className={styles.mainNav}>
        <div className={`container ${styles.navItems}`}>
          <div className={styles.logoHolder}>
            <Link className={styles.link} to="/" onClick={()=>{setCartVisible(false)}}>
              <img className={styles.logo} src={logo} alt="Logo" />
            </Link>
          </div>
          <div className={styles.cartInfo}>
            <span className={styles.price}>${totalPrice.toFixed(2)}</span>
            <span className={styles.numOfItems}>
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </span>
            <button
              onClick={() => {
                setCartVisible(!isCartVisible);
              }}
              className={styles.btn}
            >
              <img className={styles.cartIcon} src={cartIcon} alt="Cart" />
            </button>
          </div>
        </div>
      </nav>
      {isCartVisible && (
        <div className={styles.dropdownCart} ref={dropdownCart}>
          <div className={styles.cartSummary}>
            <p>Your Cart:</p>
            <p>
              Total:{" "}
              <span className={styles.totalPrice}>
                ${totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
          <div className={styles.cartProducts}>
            {cartItems.length ? (
              <div className={styles.productList}>
                {cartItems.map((product) => {
                  return (
                    <div key={product.id} className={styles.product}>
                      <p className={styles.productName}>{product.name}</p>
                      <p className={styles.priceAndQuantity}>
                        {product.quantity} x {product.price}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyCart}>
                <img
                  className={styles.emptyCartIcon}
                  src={emptyCart}
                  alt="Empty Cart"
                />
                <p className={styles.emptyCartMsg}>Your cart is empty</p>
              </div>
            )}
          </div>
          <div className={styles.btnCartHolder}>
                  <Link className={`${styles.cartBtn} ${styles.link}`} to="/cart" onClick={()=>{setCartVisible(false)}}>
                      Go to Cart
                  </Link>
                </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

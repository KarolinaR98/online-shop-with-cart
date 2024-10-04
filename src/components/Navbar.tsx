import { Link } from "react-router-dom";
import logo from "/logo.png";
import cartIcon from "/bag-icon.png";
import emptyCart from "/empty-cart.png";
import NavbarCSS from "./Navbar.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ProductType } from "../types";

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cart);

  const getTotal = (cartItems: ProductType[]) => {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    cartItems.forEach((item) => {
      totalQuantity += item.quantity!;
      totalPrice += item.quantity! * item.price;
    });

    return { totalPrice, totalQuantity };
  };

  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const totalQuantity = getTotal(cartItems).totalQuantity;
  const totalPrice = getTotal(cartItems).totalPrice;

  return (
    <>
      <nav className={NavbarCSS.mainNav}>
        <div className={`container ${NavbarCSS.navItems}`}>
          <div className={NavbarCSS.logoHolder}>
            <Link className={NavbarCSS.link} to="/" onClick={()=>{setCartVisible(false)}}>
              <img className={NavbarCSS.logo} src={logo} alt="Logo" />
            </Link>
          </div>
          <div className={NavbarCSS.cartInfo}>
            <span className={NavbarCSS.price}>${totalPrice.toFixed(2)}</span>
            <span className={NavbarCSS.numOfItems}>
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </span>
            <button
              onClick={() => {
                setCartVisible(!isCartVisible);
              }}
              className={NavbarCSS.btn}
            >
              <img className={NavbarCSS.cartIcon} src={cartIcon} alt="Cart" />
            </button>
          </div>
        </div>
      </nav>
      {isCartVisible && (
        <div className={NavbarCSS.dropdownCart}>
          <div className={NavbarCSS.cartSummary}>
            <p>Your Cart:</p>
            <p>
              Total:{" "}
              <span className={NavbarCSS.totalPrice}>
                ${totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
          <div className={NavbarCSS.cartProducts}>
            {cartItems.length ? (
              <div className={NavbarCSS.productList}>
                {cartItems.map((item) => {
                  return (
                    <div key={item.id} className={NavbarCSS.product}>
                      <p className={NavbarCSS.productName}>{item.name}</p>
                      <p className={NavbarCSS.priceAndQuantity}>
                        {item.quantity} x {item.price}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={NavbarCSS.emptyCart}>
                <img
                  className={NavbarCSS.emptyCartIcon}
                  src={emptyCart}
                  alt="Empty Cart"
                />
                <p className={NavbarCSS.emptyCartMsg}>Your cart is empty</p>
              </div>
            )}
          </div>
          <div className={NavbarCSS.btnCartHolder}>
                  <Link className={`${NavbarCSS.cartBtn} ${NavbarCSS.link}`} to="/cart" onClick={()=>{setCartVisible(false)}}>
                      Go to Cart
                  </Link>
                </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
